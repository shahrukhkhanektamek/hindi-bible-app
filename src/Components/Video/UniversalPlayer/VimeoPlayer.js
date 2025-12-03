import React, { useRef, useContext } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { GlobalContext } from '../../GlobalContext';

const VimeoPlayer = ({ videoUrl, height = 200 }) => {
  const webviewRef = useRef(null);
  const lastTap = useRef(null);

  const { setIsMediaPlaying } = useContext(GlobalContext);  // ⬅️ ADDED
  
  // JS injected into WebView
  // NOTE: we keep this variable (per your request) but for production we will NOT rely on injecting into cross-origin iframes.
  // For local/controlled HTML you may still use it; here it's kept for backward compatibility.
  const injectedJS = `
    (function() {
      
      function sendToReactNative(status) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'media', playing: status }));
      }

      function attachEvents() {
        const videos = document.getElementsByTagName('video');

        for (let v of videos) {
          v.addEventListener('play', () => sendToReactNative(true));
          v.addEventListener('playing', () => sendToReactNative(true));
          v.addEventListener('pause', () => sendToReactNative(false));
          v.addEventListener('ended', () => sendToReactNative(false));
        }
      }

      attachEvents();

      // Watch for dynamic iframe/video loads
      const observer = new MutationObserver(() => attachEvents());
      observer.observe(document.body, { childList: true, subtree: true });

      // Your existing double-click and fullscreen code
      window.simulateDoubleClick = function() {
        const evt = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
        document.body.dispatchEvent(evt);
      };

      document.addEventListener('fullscreenchange', function() {
        const video = document.querySelector('video');
        if (video && !document.fullscreenElement) {
          video.pause();
        }
      });

    })();

    true;
  `;

  // Detect double tap — PRODUCTION SAFE: use postMessage to the page instead of injectJavaScript
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      // For controlled pages (your hosted player.html) we send a message commanding dblclick/fullscreen.
      // This is reliable in release builds.
      if (webviewRef.current) {
        try {
          webviewRef.current.postMessage(JSON.stringify({ cmd: 'dblclick' }));
        } catch (e) {
          // fallback to injectJavaScript only for debug (may fail in release for cross-origin)
          try {
            webviewRef.current.injectJavaScript && webviewRef.current.injectJavaScript(`window.simulateDoubleClick && window.simulateDoubleClick(); true;`);
          } catch (err) {}
        }
      }
    } else {
      lastTap.current = now;
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={{ flex: 1 }}>
          <WebView
            ref={webviewRef}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
            setSupportMultipleWindows={false}
            androidLayerType="hardware"
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={['*']}
            mixedContentMode="always"
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}

            // KEEP injectedJS var present (not removed) — but for production load we pass an empty string so we don't rely on injecting into cross-origin frames.
            // If you load a local/controlled HTML file (same domain), you can move this back to injectedJS.
            injectedJavaScript={""}

            source={{ uri: videoUrl }}

            // ⬅️ Receive play/pause message from WebView
            onMessage={(event) => {
              try {
                const data = JSON.parse(event.nativeEvent.data);
                // support both older {type:'media',playing:bool} and future shapes
                if (data && data.type === 'media') {
                  setIsMediaPlaying(data.playing);
                  console.log("🎬 WebView Media Playing:", data.playing);
                } else if (data && data.cmd === 'log') {
                  // optional debug channel
                  console.log('WebView-log:', data.msg);
                }
              } catch (e) {
                // sometimes message isn't JSON — ignore
              }
            }}

            // helpful debugging hooks
            onError={(e) => {
              console.warn('WebView error:', e.nativeEvent);
            }}
            onHttpError={(e) => {
              console.warn('WebView http error:', e.nativeEvent);
            }}
            onLoadEnd={() => {
              // optional: notify the page we are ready to send commands
              try {
                webviewRef.current && webviewRef.current.postMessage(JSON.stringify({ cmd: 'rn_ready' }));
              } catch (e) {}
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});

export default VimeoPlayer;
