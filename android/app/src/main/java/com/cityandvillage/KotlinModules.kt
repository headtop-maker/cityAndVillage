package com.cityandvillage

import android.app.Activity
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.res.Resources
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.DocumentsContract
import android.util.DisplayMetrics
import android.content.pm.PackageManager
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.content.FileProvider
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import androidx.core.app.ActivityCompat
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
                    Toast.makeText(context, " Файл получен mReceiver ", Toast.LENGTH_LONG).show();
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
                if (fileName != null) {
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
                setDestinationInExternalFilesDir(reactApplicationContext, Environment.DIRECTORY_DOWNLOADS, fileName)
                setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            }

            downloadManager.enqueue(request)
            successCallback.invoke("Download started")

        } catch (e: Exception) {
            println(e.message)
        }
    }



    @ReactMethod
    fun installUpdate(fileName: String, successCallback: Callback, errorCallback: Callback) {

        try {
            val file = File(reactApplicationContext.getExternalFilesDir(null)?.path + "/Download", fileName)

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



    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun openFile(promise: Promise) {
        this.promise = promise;
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "*/*"
            putExtra(DocumentsContract.EXTRA_INITIAL_URI, Environment.DIRECTORY_DOWNLOADS)
        }
        reactApplicationContext.startActivityForResult(intent, 1, null);
    }

    private val activityEventListener =
        object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity?,
                requestCode: Int,
                resultCode: Int,
                intent: Intent?
            ) {
                val fileParams: WritableMap = WritableNativeMap()
                super.onActivityResult(requestCode, resultCode, intent)
                intent?.data?.also { uri ->
                    Log.d("URINative", uri.toString())
                    val cursor = uri.let { it ->
                        reactApplicationContext.contentResolver.query(
                            it,
                            null,
                            null,
                            null,
                            null
                        )
                    }
                    cursor?.moveToFirst()
                    println(cursor?.getString(2))
                    fileParams.putString("fileName", cursor?.getString(2)?.split(".")!![0])
                    fileParams.putString("fileType", cursor.getString(2)?.split(".")!![1])
                    fileParams.putInt("fileByteSize", cursor.getString(5).toInt())
                    fileParams.putString("fileUri", uri.toString())
                    promise?.resolve(fileParams)

                }

            }
        }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

}