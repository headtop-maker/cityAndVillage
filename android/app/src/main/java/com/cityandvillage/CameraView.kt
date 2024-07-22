package com.cityandvillage

import android.annotation.SuppressLint
import android.util.AttributeSet
import android.util.Log
import android.widget.FrameLayout
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.ThemedReactContext
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.th3rdwave.safeareacontext.getReactContext
import java.util.concurrent.Executor
import java.util.concurrent.Executors


class CameraView(reactContext: ThemedReactContext, attrs: AttributeSet? = null) : FrameLayout(reactContext, attrs) {

    private val previewView: PreviewView
    private var imageCapture: ImageCapture?=null
    private val lifecycleOwner: CustomLifecycleOwner = CustomLifecycleOwner()
    private var analysisExecutor: Executor = Executors.newSingleThreadExecutor()
    
    init {
        previewView = PreviewView(reactContext)
        this.addView(previewView)
        startCamera()
    }

    private fun sendJsEvent(eventName: String,payload:WritableMap) {
        val ctx = getReactContext(previewView)
        ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName,payload)
    }

    @SuppressLint("UnsafeOptInUsageError")
    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()
            val preview = Preview.Builder().build()
            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            imageCapture =ImageCapture.Builder().build()
            preview.setSurfaceProvider(previewView.surfaceProvider)

            val imageAnalysis = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()
            imageAnalysis.setAnalyzer(analysisExecutor, ImageAnalysis.Analyzer { imageProxy ->
                processImageProxy(imageProxy)
                imageProxy.close()
            })

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview,imageAnalysis)
                lifecycleOwner.start()
            } catch (exc: Exception) {
                Log.e("CameraView", "Use case binding failed", exc)
            }
        }, ContextCompat.getMainExecutor(context))
    }

    @SuppressLint("UnsafeOptInUsageError")
    private fun processImageProxy(imageProxy: ImageProxy) {
        val payload = Arguments.createMap()
        val mediaImage = imageProxy.image
        if (mediaImage != null) {
            val image = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)
            val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
            val result = recognizer.process(image)
                .addOnSuccessListener { visionText ->
                    for (block in visionText.textBlocks) {
                        val blockText = block.text
//                        val blockCornerPoints = block.cornerPoints
                        val blockFrame = block.boundingBox
                        Log.d("TextRecognition", "Recognized text: $blockText , ${blockFrame.toString()} ")
                        payload.putString("block",blockText)
                    }
                    sendJsEvent("sendJsEvent",payload)
                }.addOnCompleteListener {
                    imageProxy.close()
                }
        }
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        lifecycleOwner.stop()
    }
}