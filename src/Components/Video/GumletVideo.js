import React from "react";
import { Dimensions } from "react-native";
import { WebView } from "react-native-webview";

export default function GumletVideo({ videoId }) {
  const videoHeight = Dimensions.get("window").width * (9 / 16); // 16:9 ratio

  
  const htmlContent = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;">
        <iframe
          loading="lazy"
          title="Gumlet video player"
          width="100%"
          height="100%"
          src="https://play.gumlet.io/embed/${videoId}?preload=false&autoplay=false&loop=false&disable_player_controls=false"
          style="border:none; position:absolute; top:0; left:0; height:100%; width:100%;"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen">
        </iframe>
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
