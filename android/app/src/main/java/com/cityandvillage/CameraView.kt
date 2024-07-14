package com.cityandvillage

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.LayoutInflater
import android.widget.FrameLayout
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat


class CameraView(context: Context, attrs: AttributeSet? = null) : FrameLayout(context, attrs) {

    private val previewView: PreviewView
    private var imageCapture: ImageCapture?=null
    private val lifecycleOwner: CustomLifecycleOwner = CustomLifecycleOwner()

    init {
//        LayoutInflater.from(context).inflate(R.layout.camera_view, this, true)
//        previewView = findViewById(R.id.previewView)
        previewView = PreviewView(context)
        this.addView(previewView)
        startCamera()

    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()
            val preview = Preview.Builder().build()
            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
            imageCapture =ImageCapture.Builder().build()
            preview.setSurfaceProvider(previewView.surfaceProvider)

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview,imageCapture)
                lifecycleOwner.start()
            } catch (exc: Exception) {
                Log.e("CameraView", "Use case binding failed", exc)
            }
        }, ContextCompat.getMainExecutor(context))
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        lifecycleOwner.stop()
    }
}