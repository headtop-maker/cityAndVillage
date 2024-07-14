package com.cityandvillage

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class CameraViewManager : SimpleViewManager<CameraView>() {
    override fun getName(): String {
        return "CameraView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): CameraView {
        return CameraView(reactContext)
    }
}