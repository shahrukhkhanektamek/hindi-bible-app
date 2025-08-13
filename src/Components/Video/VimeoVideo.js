import React from "react";
import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";

export default function VimeoVideo({ videoId }) {
  const videoHeight = Dimensions.get("window").width * (9 / 16); // 16:9 ratio

  const htmlContent = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;">
        <div style="padding:56.25% 0 0 0;position:relative;">
          <iframe 
            src="https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479" 
            frameborder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            style="position:absolute;top:0;left:0;width:100%;height:100%;" 
            title="Vimeo Video">
          </iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </body>
    </html>
  `;

  return (
    <WebView
      style={{ height: videoHeight, width: "100%" }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      source={{ html: htmlContent }}
    />
  );
}
