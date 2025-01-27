package com.cityandvillage

import android.app.Activity
import android.app.DownloadManager
import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.content.res.Resources
import android.database.Cursor
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.DocumentsContract
import android.provider.OpenableColumns
import android.provider.Settings
import android.util.Base64
import android.util.DisplayMetrics
import android.util.Log
import android.webkit.MimeTypeMap
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.content.FileProvider
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.ByteArrayOutputStream
import java.io.File


public class KotlinModules(reactContext:ReactApplicationContext):ReactContextBaseJavaModule(reactContext){
    private val DURATION_SHORT_KEY = "SHORT"
    private val DURATION_LONG_KEY = "LONG"
    var promise: Promise? = null



    override fun getName(): String {
        return "KotlinModules"
    }

     private val mReceiver: BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            if(intent.action =="android.intent.action.DOWNLOAD_COMPLETE"){
                val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID,-1L)
                if(id != -1L){
                    Toast.makeText(context, " Файл получен ", Toast.LENGTH_LONG).show();
                    println("Download mReceiver $id finish")
                    checkDownload(context, id)
                }
            }
        }
    }


    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    @ReactMethod
    fun registerReceiver() {
        val filter = IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE)
        reactApplicationContext.registerReceiver(mReceiver, filter, null, null)// помогло с 13 андроид
    }

    @ReactMethod
    fun unregisterReceiver() {
        reactApplicationContext.unregisterReceiver(mReceiver)
    }

    override fun getConstants(): kotlin.collections.Map<String, Any> {
        val constants = HashMap<String,Any>()
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT)
        constants.put(DURATION_LONG_KEY,Toast.LENGTH_LONG)

        return constants
    }

    fun convertDpToPixel(dp: Float, context: Context?): Float {
        return if (context != null) {
            val resources = context.resources
            val metrics = resources.displayMetrics
            dp * (metrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
        } else {
            val metrics = Resources.getSystem().displayMetrics
            dp * (metrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
        }
    }


    @ReactMethod
    fun getDpToPX(promise: Promise){
        promise.resolve(convertDpToPixel(10f ,reactApplicationContext))
    }

    @ReactMethod
    fun getDpToPXCallback( callback: Callback) {
        callback.invoke(convertDpToPixel(10f ,reactApplicationContext)) //
    }

    @RequiresApi(Build.VERSION_CODES.M)
    @ReactMethod
    fun getFile (url:String,mimeType:String,title:String) {
        val downloader = AndroidDownloader(reactApplicationContext)
        downloader.downloadFile(url,mimeType,title)
    }



    private fun checkDownload(context: Context, downloadId: Long) {
        val downloadManager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val query = DownloadManager.Query().setFilterById(downloadId)
        val cursor: Cursor = downloadManager.query(query)
        if (cursor.moveToFirst()) {
            val columnIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)
            val status = cursor.getInt(columnIndex)
            if (status == DownloadManager.STATUS_SUCCESSFUL) {
                val uriString = cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI)
                val uri = Uri.parse(cursor.getString(uriString))
                val fileName = uri.lastPathSegment
                Log.d("CURSOR fileName",uri.toString())
                if (fileName != null && fileName.substringAfterLast('.', "")=="apk") {

                    Log.d("CURSOR fileName",fileName)
                    Log.d("CURSOR fileName split",fileName.split("-")[0]+fileName.split("-")[1])
                    sendEvent(reactApplicationContext,"Download",fileName)
                }
            }
        }
        cursor.close()
    }

    private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: Any?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }


    @ReactMethod
    fun getVersionName(promise: Promise) {
        try {
            val packageInfo = reactApplicationContext.packageManager.getPackageInfo(reactApplicationContext.packageName, 0)
            promise.resolve(packageInfo.versionName)
        } catch (e: PackageManager.NameNotFoundException) {
            promise.reject("ERROR", "Version name not found")
        }
    }
    @ReactMethod
    fun show(message:String,duration: Int){
        Toast.makeText(reactApplicationContext,message,duration).show()
    }

    @ReactMethod
    fun downloadAndUpdate(url: String, fileName: String, successCallback: Callback) {
        try {
            val downloadManager = reactApplicationContext.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            val downloadUri = Uri.parse(url)

            val request = DownloadManager.Request(downloadUri).apply {
                setTitle("Downloading update")
                setDescription("Загружается ${fileName}")
                setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName)
                setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            }

            downloadManager.enqueue(request)
            successCallback.invoke("Download started")

        } catch (e: Exception) {
            println(e.message)
        }
    }

    @ReactMethod
    fun getBase64Image(path:String,promise: Promise) {
        try {
            Log.d("CURSOR",path)
            val bm = BitmapFactory.decodeFile(path)
            if(bm == null){
                promise.reject("ERROR", "Ошибка выбора файла")
            }
            val baos = ByteArrayOutputStream()
            bm.compress(Bitmap.CompressFormat.JPEG,10,baos)
                val b = baos.toByteArray()
                val encodeImage = Base64.encodeToString(b,Base64.DEFAULT)
                promise.resolve(encodeImage)

        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }

    }

    @ReactMethod
    fun getDownloadFiles(promise: Promise) {
        try {
            val downloadDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
            val files = downloadDir?.listFiles()
            val pm: PackageManager = reactApplicationContext.packageManager
            val result = WritableNativeArray()
            files?.forEach { file ->

                if(file.absolutePath.contains(".apk")){

                    val currentFile = File(file.absolutePath)
                    if (currentFile.exists()) {
                        val packageInfo: PackageInfo? = pm.getPackageArchiveInfo(file.absolutePath, 0)
                        if (packageInfo != null) {

                            val appName = packageInfo.applicationInfo.loadLabel(pm).toString()
                            val versionName = packageInfo.versionName
                            val uri = Uri.parse(file.absolutePath)
                            val fileName = uri.lastPathSegment

                            Log.d("CURSOR appName",appName)
                            Log.d("CURSOR absolutePath",file.absolutePath.toString())

                            result.pushString("appName:$appName")
                            result.pushString("versionName:$versionName")
                            result.pushString("fileName:$fileName")
                            result.pushString("absolutePath:"+file.absolutePath.toString())
                        }
                    }

                }
            }
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }


    @ReactMethod
    fun installUpdate(fileName: String, successCallback: Callback, errorCallback: Callback) {

        try {
            val downloadDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
            val file = File(downloadDir, fileName)

            Log.d("CURSOR fileName",fileName)
            if (!file.exists()) {
                Toast.makeText(reactApplicationContext, " File not found 1 ", Toast.LENGTH_LONG).show();
                errorCallback.invoke("File not found 1")
                return
            }

            val uri: Uri = FileProvider.getUriForFile(
                reactApplicationContext,
                "${reactApplicationContext.packageName}.provider",
                file
            )

            val installIntent = Intent(Intent.ACTION_VIEW).apply {
                setDataAndType(uri, "application/vnd.android.package-archive")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_GRANT_READ_URI_PERMISSION
            }

            reactApplicationContext.startActivity(installIntent)
            successCallback.invoke("Installation started")

        } catch (e: Exception) {
            Toast.makeText(reactApplicationContext, e.message.toString(), Toast.LENGTH_LONG).show();
            errorCallback.invoke(e.message)
        }
    }

    @ReactMethod
    fun openAppPermissionSettings() {
        val context: Context = reactApplicationContext
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
            data = Uri.fromParts("package", context.packageName, null)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        context.startActivity(intent)
    }

    @ReactMethod
    fun areNotificationsEnabled(promise: Promise) {
        try {
            val notificationManager =
                reactApplicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            val notificationsEnabled = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                notificationManager.areNotificationsEnabled()
            } else {
                // На Android ниже 8.0 считаем, что уведомления включены
                true
            }

            promise.resolve(notificationsEnabled)
        } catch (e: Exception) {
            promise.reject("ERROR", "Не удалось проверить статус уведомлений: ${e.message}")
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun openFile(promise: Promise) {
        this.promise = promise;
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "*/*"
            putExtra(DocumentsContract.EXTRA_INITIAL_URI, Environment.DIRECTORY_DOWNLOADS)
        }
        reactApplicationContext.startActivityForResult(intent, 100, null);
    }

    private val activityEventListener =
        object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity?,
                requestCode: Int,
                resultCode: Int,
                intent: Intent?
            ) {if (requestCode == 100) {
                val fileParams: WritableMap = WritableNativeMap()
                super.onActivityResult(requestCode, resultCode, intent)
                intent?.data?.also { uri: Uri ->
                    val mContextResolver = reactApplicationContext.contentResolver

                    val cursor = uri.let { it ->
                        mContextResolver.query(
                            it,
                            null,
                            null,
                            null,
                            null
                        )
                    }
                    cursor?.moveToFirst()
                    if (cursor != null) {
                        val cIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                        fileParams.putString("fileName", cursor?.getString(2)?.split(".")!![0])
                        fileParams.putString("fileType", mContextResolver.getType(uri))
                        fileParams.putInt("fileByteSize", cursor.getString(5).toInt())
                        fileParams.putString("fileUri", uri.toString())
                        fileParams.putString("filePath",  cursor.getString(cIndex))
                    }

                    promise?.resolve(fileParams)

                }

            } }
        }

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun base64Image(promise: Promise) {
        this.promise = promise;
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "image/jpeg"
            putExtra(DocumentsContract.EXTRA_INITIAL_URI, Environment.DIRECTORY_DOWNLOADS)
        }
        reactApplicationContext.startActivityForResult(intent, 200, null);
    }

    private val activityEventListenerBase64 =
        object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity?,
                requestCode: Int,
                resultCode: Int,
                intent: Intent?
            ) {
                if (requestCode == 200) {
                val fileParams: WritableMap = WritableNativeMap()
                super.onActivityResult(requestCode, resultCode, intent)
                intent?.data?.also { uri:Uri ->



                    val bitmap = BitmapFactory.decodeStream(reactApplicationContext
                        .contentResolver.openInputStream(uri))

                    if(bitmap!= null) {
                        val baos = ByteArrayOutputStream()

                        val maxSize = 500
                        val outWidth: Int
                        val outHeight: Int
                        val inWidth: Int = bitmap.width
                        val inHeight: Int = bitmap.height
                        if (inWidth > inHeight) {
                            outWidth = maxSize
                            outHeight = inHeight * maxSize / inWidth
                        } else {
                            outHeight = maxSize
                            outWidth = inWidth * maxSize / inHeight
                        }


                        val scaledBitmap =  Bitmap.createScaledBitmap(bitmap, outWidth,outHeight,true)
                        scaledBitmap.compress(Bitmap.CompressFormat.JPEG, 80, baos)
                        val b = baos.toByteArray()
                        val encodeImage = Base64.encodeToString(b, Base64.NO_WRAP)
                        fileParams.putString("base64Image", encodeImage.replaceFirst("\"", ""))
                        promise?.resolve(fileParams)
                        bitmap.recycle()
                    }
                }

             }
            }
        }

    init {
        reactContext.addActivityEventListener(activityEventListener)
        reactContext.addActivityEventListener(activityEventListenerBase64)
    }

}


// рабочий код как пример
//@ReactMethod
//fun getApkInfo(filePath: String, promise: Promise) {
//    try {
//        val file = File(filePath)
//        Log.d("CURSOR filePath",filePath)
//        if (!file.exists()) {
//            promise.reject("FILE_NOT_FOUND", "File does not exist at path: $filePath")
//            return
//        }
//
//        val pm: PackageManager = reactApplicationContext.packageManager
//        val packageInfo: PackageInfo? = pm.getPackageArchiveInfo(filePath, 0)
//
//        if (packageInfo != null) {
//            val fileParams: WritableMap = WritableNativeMap()
//            val appName = packageInfo.applicationInfo.loadLabel(pm).toString()
//            val versionName = packageInfo.versionName
//            Log.d("CURSOR appName",appName)
//            Log.d("CURSOR versionName",versionName)
//
//            fileParams.putString("appName", appName)
//            fileParams.putString("versionName", versionName)
//            promise.resolve(fileParams)
//
//        } else {
//            promise.reject("INVALID_APK", "Failed to retrieve APK information")
//        }
//    } catch (e: Exception) {
//        Log.e("ApkInfoModule", "Error retrieving APK info", e)
//        promise.reject("ERROR", e)
//    }
//}

// посмотреть URI
//val cursor2 = reactContext.contentResolver.query(uri, null, null, null, null)
//cursor2?.use {
//    val columnNames = it.columnNames
//    columnNames.forEach { columnName ->
//        Log.d("columnNames ", columnName)
//    }
//}
