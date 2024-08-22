package com.cityandvillage

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LifecycleRegistry

class CustomLifecycleOwner : LifecycleOwner {
    private val lifecycleRegistry: LifecycleRegistry = LifecycleRegistry(this)

    init {
        lifecycleRegistry.currentState = Lifecycle.State.INITIALIZED
    }

    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }

    fun start() {
        lifecycleRegistry.currentState = Lifecycle.State.STARTED
    }

    fun stop() {
        lifecycleRegistry.currentState = Lifecycle.State.DESTROYED
    }
}