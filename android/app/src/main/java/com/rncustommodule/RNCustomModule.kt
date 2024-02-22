package com.rncustommodule

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import androidx.annotation.MainThread
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class RNCustomModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return NAME
    }

    private fun getPreferences(): SharedPreferences {
        return reactApplicationContext.getSharedPreferences(this.reactApplicationContext.packageName + ".settings", Context.MODE_PRIVATE)
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun setData(key: String, value: String) {
        getPreferences().edit().putString(key, value).commit()

        val list = com.facebook.react.bridge.Arguments.createArray()
        list.pushString(key)
        list.pushString(value)
        emitToJS("onSetData", list)
    }

    @ReactMethod
    fun getDataAsync(key: String, promise: Promise) {
        if(key == "error") {
            promise.reject("ERROR_KEY", "Error key received")
            return
        }

        val result = getPreferences().getString(key, null)

        promise.resolve(result)
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getDataByCallback(key: String, callback: Callback) {
        val result = getPreferences().getString(key, null)
        callback.invoke(result)
    }

    @MainThread
    private fun emitToJS(key: String, value: Any) {
        val reactContext: ReactContext? = this.reactApplicationContext
        if (reactContext == null || !reactContext.hasActiveReactInstance()) {
            return
        }
        try {
            reactContext.getJSModule(
                DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
            ).emit(key, value)
        } catch (e: Exception) {
            Log.wtf(
                "EMITTER",
                "Error sending Event: $key", e
            )
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    companion object {
        const val NAME = "RNCustomModule"
    }
}
