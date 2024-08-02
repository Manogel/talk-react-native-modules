package com.rnnativemodules

import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class CustomWebviewManager(
    private val callerContext: ReactApplicationContext
) : SimpleViewManager<WebView>() {
    companion object {
        const val REACT_CLASS = "RCTCustomWebview"

        private object COMMANDS {
            const val LOAD_URL = 1
            const val SET_ZOOM = 2
        }
    }
    override fun getName() = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): WebView {
        val instance = WebView(reactContext)
        instance.webViewClient = object: WebViewClient(){
            // avoid react native starts a new intent
            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                view.loadUrl(url)
                return true
            }
        }
//        instance.loadUrl("https://google.com.br")
        return instance
    }

    // defaultBoolean, defaultFloat, defaultInt
    @ReactProp(name = "url")
    fun setUrl(view: WebView, url: String?) {
        if (url != null) {
            view.loadUrl(url)
        }
    }

    override fun getCommandsMap(): Map<String, Int> {
        return mapOf(
            "loadUrl" to COMMANDS.LOAD_URL,
            "setZoom" to COMMANDS.SET_ZOOM
        )
    }

    override fun receiveCommand(
        view: WebView,
        commandId: String,
        args: ReadableArray?
    ) {
        when (commandId.toInt()) {
            COMMANDS.LOAD_URL -> {
                val url = requireNotNull(args).getString(0)
                Log.d(REACT_CLASS, "Opening $url")
                view.loadUrl(url)
            }

            COMMANDS.SET_ZOOM -> {
                val zoomFactor = requireNotNull(args).getInt(0);
                view.zoomBy(
                    zoomFactor.toFloat()
                )
            }
        }

        super.receiveCommand(view, commandId, args)
    }
}