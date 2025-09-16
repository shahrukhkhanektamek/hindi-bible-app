import React from "react";
import { Linking, StyleSheet, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import tagsStyles from "../Constants/tagsStyles";

export default function MyHTMLViewer({ htmlContent }) {
  const { width } = useWindowDimensions();

  // Jab bhi koi <a> tag click hoga
  const handleLinkPress = async (evt, href) => {
    try {
      const supported = await Linking.canOpenURL(href);
      if (supported) {
        await Linking.openURL(href);
      } else {
        console.log("Cannot open URL:", href);
      }
    } catch (err) {
      console.error("Error opening URL:", err);
    }
  };

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: htmlContent }}
      baseStyle={styles.description} 
      tagsStyles={tagsStyles}
      renderersProps={{ 
        a: {
          onPress: handleLinkPress, // <-- yahan dena hoga
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
    description: {
        fontSize: 15,
        marginTop: 10,
        color: '#555',
      },
  });