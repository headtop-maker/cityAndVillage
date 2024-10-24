package com.cityandvillage

import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.database.Cursor
import android.net.Uri
import android.os.Environment
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule


class DownloadCompletedReceiver(private val reactContext: ReactApplicationContext) :BroadcastReceiver() {

    override fun onReceive(context: Context?, intent: Intent?) {
        if(intent?.action=="android.intent.action.DOWNLOAD_COMPLETE"){
            val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID,-1L)
            if(id != -1L){
                Toast.makeText(context, " Файл получен ", Toast.LENGTH_LONG).show();
                println("Download id $id finish")
                if (context != null) {
                    checkDownload(context, id)
                }
            }
        }
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
                    sendEvent(reactContext,"Download",fileName)
                }
            }
        }
        cursor.close()
    }


    private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: Any?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

}