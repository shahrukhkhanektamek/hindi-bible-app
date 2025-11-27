import React, { useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import { GlobalContext } from '../../GlobalContext';

const YoutubePlayerComponent = ({ videoUrl, height = 200 }) => {
  const webviewRef = useRef(null);
  const lastTap = useRef(null);

  const { setIsMediaPlaying } = useContext(GlobalContext);

  const injectedJS = `
    window.simulateDoubleClick = function() {
      const evt = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
      document.body.dispatchEvent(evt);
    };

    // Track play state
    window._YT_PLAYING = false;

    // Play/Pause toggle (double tap)
    window.togglePlayPause = function() {
      const iframe = document.querySelector('iframe');
      if (!iframe) return;

      iframe.contentWindow.postMessage(JSON.stringify({
        event: "command",
        func: window._YT_PLAYING ? "pauseVideo" : "playVideo",
        args: ""
      }), "*");

      window._YT_PLAYING = !window._YT_PLAYING;

      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "media",
        playing: window._YT_PLAYING
      }));
    };

    // Detect fullscreen exit → Pause
    document.addEventListener('fullscreenchange', function() {
      const iframe = document.querySelector('iframe');
      if (!document.fullscreenElement && iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "media",
          playing: false
        }));

        window._YT_PLAYING = false;
      }
    });

    /* 
     ************************************************************
     🔥🔥🔥 YOUTUBE REAL PLAY/PAUSE LISTENER ADDED HERE 🔥🔥🔥
     ************************************************************
    */

    window.onYouTubeIframeAPIReady = function () {
      const iframe = document.querySelector('iframe');
      if (!iframe) return;

      window.YTPlayer = new YT.Player(iframe, {
        events: {
          onStateChange: function (event) {
            if (event.data === 1) {
              window._YT_PLAYING = true;
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "media",
                playing: true
              }));
            }

            if (event.data === 2) {
              window._YT_PLAYING = false;
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "media",
                playing: false
              }));
            }
          }
        }
      });
    };

    if (!window.YT) {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    true;
  `;

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      webviewRef.current.injectJavaScript(`window.simulateDoubleClick(); true;`);
      webviewRef.current.injectJavaScript(`window.togglePlayPause(); true;`);
    } else {
      lastTap.current = now;
    }
  };

  const onMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'media') {
        setIsMediaPlaying(data.playing);
        console.log("🎬 WebView Media Playing:", data.playing);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const backAction = () => {
      if (webviewRef.current) {
        webviewRef.current.injectJavaScript(`
          const iframe = document.querySelector('iframe');
          if (iframe && iframe.src.includes('youtube.com')) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
          true;
        `);

        setIsMediaPlaying(false);
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

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
            onMessage={onMessage}
            source={{ uri: videoUrl }}
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

export default YoutubePlayerComponent;
