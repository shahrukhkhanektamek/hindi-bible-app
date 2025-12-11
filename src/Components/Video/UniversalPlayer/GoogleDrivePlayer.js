import React, { useRef, useContext } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { GlobalContext } from '../../GlobalContext';

const GoogleDrivePlayer = ({ videoId, height = 200, fileId, thumbnail }) => {
  const webviewRef = useRef(null);
  const lastTap = useRef(null);

  const { setIsMediaPlaying } = useContext(GlobalContext);
  
  // Build the server URL for Google Drive player
  const buildServerUrl = () => {
    const baseUrl = videoId;
    return `${baseUrl}`;
  };

  // Optional: Keep injectedJS if needed for debugging
  const injectedJS = `
    (function() {
      
      function sendToReactNative(status) {
        window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'media', playing: status })
        );
      }

      // Your HTML already has this logic, but we keep it for backup
      function attachEvents() {
        const iframe = document.getElementById('googleDrivePlayer');
        if (iframe) {
          // Google Drive iframe doesn't expose events like video element
          // So we rely on your HTML's existing event handling
          console.log('Google Drive iframe found');
        }
      }

      attachEvents();

      // Watch for dynamic content
      const observer = new MutationObserver(() => attachEvents());
      observer.observe(document.body, { childList: true, subtree: true });

      // Double-click simulation for fallback
      window.simulateDoubleClick = function() {
        const evt = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
        document.body.dispatchEvent(evt);
      };

      // Fullscreen change listener
      document.addEventListener('fullscreenchange', function() {
        const iframe = document.getElementById('googleDrivePlayer');
        if (iframe && !document.fullscreenElement) {
          // Your HTML already handles this, but we add backup
          sendToReactNative(false);
        }
      });

    })();

    true;
  `;

  // Detect double tap - EXACTLY SAME AS VimeoPlayer
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      if (webviewRef.current) {
        try {
          // Send message to HTML (your HTML already listens for this)
          webviewRef.current.postMessage(JSON.stringify({ cmd: 'dblclick' }));
        } catch (e) {
          // fallback
          try {
            webviewRef.current.injectJavaScript && 
            webviewRef.current.injectJavaScript(`window.simulateDoubleClick && window.simulateDoubleClick(); true;`);
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

            // Keep injectedJS but use empty string for production
            // Your HTML already has all the logic
            injectedJavaScript={""}

            // Load your server HTML with Google Drive parameters
            source={{ uri: buildServerUrl() }}

            // ⬅️ Receive play/pause message from WebView - EXACTLY SAME
            onMessage={(event) => {
              try {
                const data = JSON.parse(event.nativeEvent.data);
                // support both older {type:'media',playing:bool} and future shapes
                if (data && data.type === 'media') {
                  setIsMediaPlaying(data.playing);
                  console.log("🎬 Google Drive Media Playing:", data.playing);
                } else if (data && data.cmd === 'log') {
                  // optional debug channel
                  console.log('WebView-log:', data.msg);
                }
              } catch (e) {
                // sometimes message isn't JSON — ignore
              }
            }}

            // helpful debugging hooks - EXACTLY SAME
            onError={(e) => {
              console.warn('Google Drive WebView error:', e.nativeEvent);
            }}
            onHttpError={(e) => {
              console.warn('Google Drive WebView http error:', e.nativeEvent);
            }}
            onLoadEnd={() => {
              // optional: notify the page we are ready to send commands
              try {
                webviewRef.current && webviewRef.current.postMessage(
                  JSON.stringify({ cmd: 'rn_ready' })
                );
              } catch (e) {}
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// Styles - EXACTLY SAME
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

export default GoogleDrivePlayer;