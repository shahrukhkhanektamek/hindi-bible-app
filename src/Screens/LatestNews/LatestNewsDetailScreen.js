import { ScrollView, StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import React, { useContext, useState } from 'react';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import { GlobalContext } from '../../Components/GlobalContext';
import RenderHTML from 'react-native-render-html';
import tagsStyles from '../../Constants/tagsStyles.js';
import Button from '../../Components/Button/Button.js';
import WebView from 'react-native-webview';
import VideoPlayer from '../../Components/Video/VideoPlayer.js';
import GumletVideo from '../../Components/Video/GumletVideo.js';

const LatestNewsDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;  // single news item
  const { width } = useWindowDimensions();
  const [videoKey, setVideoKey] = useState(0);

  const renderVideo = () => {
    switch (item.video_type) {
      case 1: // Local or direct video
        return (
          <VideoPlayer
            key={videoKey}
            videoSource={item.video}
            thumbnail={item.image}
          />
        );
      case 2: // WebView video type
      case 3:
        return (
          <WebView
            key={videoKey}
            style={styles.webviewVideo}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            source={{ uri: item.video_url }}
          />
        );
      case 4: // Gumlet video
        return <GumletVideo key={videoKey} videoId={item.video} />;
      default:
        return <Image source={{ uri: item.image }} style={styles.imageStyle} />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.topSection}>
        
        <GradiantButton
          title="Home"
          height="36"
          width="25%"
          gradientType="yellow"
          borderRadius={8}
          fontWeight="600"
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Back"
          height="36"
          width="25%"
          gradientType="purple"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.newsCard}>
        <View style={styles.videoWrapper}>
          {renderVideo()}
        </View>

        <Text style={styles.title}>{item.name}</Text>

        <Button
          title="VIDEO DESCRIPTION"
          height="30"
          width="55%"
          borderRadius={3}
          color={COLORS.white}
          backgroundColor="#068aca"
        />
        <RenderHTML
          contentWidth={width}
          source={{ html: item.description }}
          baseStyle={styles.description}
          tagsStyles={tagsStyles}
        />

        <Button
          title="MINISTRY INFORMATION"
          height="30"
          width="70%"
          borderRadius={3}
          color={COLORS.white}
          backgroundColor="#fb5017"
        />
        <RenderHTML
          contentWidth={width}
          source={{ html: item.full_description }}
          baseStyle={styles.description}
          tagsStyles={tagsStyles}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 20,
    marginBottom: 20,
  },
  videoWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  webviewVideo: {
    width: '100%',
    height: '100%',
  },
  newsCard: {
    backgroundColor: BACKGROUND_COLORS.white,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 10,
  },
  description: {
    color: COLORS.black,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
});

export default LatestNewsDetailScreen;
