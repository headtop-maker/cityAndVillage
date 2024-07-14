package com.cityandvillage

import androidx.camera.core.impl.CameraInternal
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LifecycleRegistry

class CustomLifecycle : LifecycleOwner {
    private val lifecycleRegistry: LifecycleRegistry

    init {
        lifecycleRegistry = LifecycleRegistry(this);
        lifecycleRegistry.markState(Lifecycle.State.CREATED)
    }


    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }
}