package com.cityandvillage

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.content.Intent
import android.provider.DocumentsContract
import android.os.Environment
import java.util.HashMap
import android.net.Uri
import android.app.Activity
import android.app.DownloadManager
import android.content.Context
import android.content.res.Resources
import android.os.Build
import android.util.DisplayMetrics
import android.util.Log
import android.content.IntentFilter
import androidx.annotation.RequiresApi
import androidx.core.content.FileProvider
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import java.io.File



class KotlinModules(reactContext:ReactApplicationContext):ReactContextBaseJavaModule(reactContext){
    var activity: Activity? = null
    private val DURATION_SHORT_KEY = "SHORT"
    private val DURATION_LONG_KEY = "LONG"
    var promise: Promise? = null

    override fun getName(): String {
        return "KotlinModules"
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
                setDescription("Downloading the update for the app.")
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
            val file = File(reactApplicationContext.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName)
            if (!file.exists()) {
                errorCallback.invoke("File not found")
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