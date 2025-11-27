import React, { useRef, useContext } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { GlobalContext } from '../../GlobalContext';

const VimeoPlayer = ({ videoUrl, height = 200 }) => {
  const webviewRef = useRef(null);
  const lastTap = useRef(null);

  const { setIsMediaPlaying } = useContext(GlobalContext);  // ⬅️ ADDED
  
  // JS injected into WebView
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

  // Detect double tap
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      if (webviewRef.current) {
        webviewRef.current.injectJavaScript(`window.simulateDoubleClick(); true;`);
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
            injectedJavaScript={injectedJS}
            source={{ uri: videoUrl }}

            // ⬅️ Receive play/pause message from WebView
            onMessage={(event) => {
              try {
                const data = JSON.parse(event.nativeEvent.data);
                if (data.type === 'media') {
                  setIsMediaPlaying(data.playing);
                  console.log("🎬 WebView Media Playing:", data.playing);
                }
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
