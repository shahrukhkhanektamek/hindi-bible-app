import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    RefreshControl,
  } from "react-native";
  import React, { useState, useEffect, useCallback, useContext } from 'react';
  import { useNavigation, useRoute } from "@react-navigation/native";
  import BACKGROUND_COLORS from "../../Constants/BackGroundColors";
  import COLORS from "../../Constants/Colors";
  import Button from "../../Components/Button/Button.js";
  import TopBarPrimary from "../../Components/TopBar/TopBarPrimary";
  import GradiantButton from "../../Components/Button/GradientButton";
  import Video from "../../Components/Video/Video.js";
  import VideoPlayer from "../../Components/Video/VideoPlayer.js";
  import GumletVideo from "../../Components/Video/GumletVideo.js";
  import VimeoVideo from "../../Components/Video/VimeoVideo.js";
  import RenderHTML from "react-native-render-html";
  import { useWindowDimensions } from "react-native";
  import { GlobalContext } from "../../Components/GlobalContext";
  import WebView from "react-native-webview";
  



  
  import PageLoding from '../../Components/PageLoding.js';
  import { postData, apiUrl } from '../../Components/api';
  import Pdf from '../../Components/Pdf/Pdf.js';
  import AudioPlayer from '../../Components/Audio/AudioPlayer.js';
  import Article from '../../Components/Article/Article.js';
  import LogoutButton from '../../Components/LogoutButton.js';
  const urls=apiUrl();



  const SinglePost = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const { item} = route.params || {};
  
    const { extraData } = useContext(GlobalContext);
    const appSetting = extraData.appSetting;
  
    const videoHeight = (Dimensions.get("window").width * 9) / 16;
    


    
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const onRefresh = useCallback(() => {
    // setPage(0);
    setRefreshing(true);
    setRefreshing(false);
    fetchData(page);
  }, []);

  const fetchData = async () => { 
      try { 
        const response = await postData({id:item.id}, urls.postDetail, "GET", null, extraData, 1);
        if(response.status==200)
        {
          setData(response.data);           
          setisLoading(false)
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    useEffect(() => {
      fetchData()
    },[])
    if(isLoading)
    {
      return ( 
        <PageLoding /> 
      ); 
    }





    return (
        <ScrollView style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TopBarPrimary />
        </View>
  
        {/* Navigation Buttons */}
        <View style={styles.buttonTop}>
          <GradiantButton
            title="Home"
            height="30"
            width="20%"
            gradientType="yellow"
            borderRadius={5}
            fontSize={15}
            onPress={() => navigation.navigate("Home")}
          />
          <GradiantButton
            title="Menu"
            height="30"
            width="20%"
            gradientType="blue"
            borderRadius={5}
            fontSize={15}
            onPress={() => navigation.navigate("Main")}
          />
          <GradiantButton
            title="Log Out"
            height="30"
            width="20%"
            gradientType="red"
            borderRadius={5}
            fontSize={15}
          />
          <GradiantButton
            title="Back"
            height="30"
            width="20%"
            fontSize={15}
            gradientType="purple"
            borderRadius={5}
            onPress={() => navigation.goBack()}
          />
        </View>
  
        {/* Main Action Button */}
        <View style={styles.button}>
          <Button
            title={data.name}
            height="40"
            width="43%"
            fontSize={15}
            backgroundColor={BACKGROUND_COLORS.green}
            borderRadius={5}
          />
        </View>
  
        {/* Content Section */}
        <View style={styles.videoWrapper}>
        
          
            {/* Video Type */}
            {data.post_type == 1 ? ( 
                <View>
                    
                    {data.video_type == 1 ? (                        
                        <VideoPlayer
                        videoSource={data.video}
                        thumbnail={data.image}
                        frameSource={require('../../Assets/videoFrame.jpeg')}
                        />
                    ) : data.video_type == 2 ? (
                        <WebView
                        style={{ height: videoHeight, width: "100%" }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsFullscreenVideo={true}
                        source={{
                            uri: `${data.video_url}`,
                        }}
                        originWhitelist={['*']}
                        mediaPlaybackRequiresUserAction={false}
                        />
                    ) : data.video_type == 3 ? (
                        <WebView
                        style={{ height: videoHeight, width: "100%" }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsFullscreenVideo={true}
                        source={{
                            uri: `https://www.youtube.com/embed/${data.video}`,
                        }}
                        originWhitelist={['*']}
                        mediaPlaybackRequiresUserAction={false}
                        />
                    ) : data.video_type == 4 ? (
                        <GumletVideo videoId={data.video} />                        
                    ) : (
                        <Text style={{ color: COLORS.white }}>None</Text>
                    )}

                </View>
            ) : data.post_type == 2 ? (
              <View style={styles.audioWrapper}>
                <AudioPlayer
                  id={data.id}
                  chapterTitle="Counselling3"
                  source={require("../../Assets/myaudio.mp3")}
                />
                <Text style={{ color: COLORS.white }}>Audio Player Here</Text>
              </View>
            ) : data.post_type == 3 ? (
              <View style={styles.imageWrapper}>
                <Image
                  source={require("../../Assets/videoThumbnail.jpeg")}
                  style={styles.image}
                />
                <GradiantButton
                  title="Album"
                  height="31"
                  width="25%"
                  gradientType="orange"
                  borderRadius={5}
                  fontSize={15}
                  onPress={() =>
                    navigation.navigate("AlbumImage", {
                      images: {},
                      initialIndex: 0,
                    })
                  }
                />
              </View>
            ) : data.post_type == 4 ? (
              <View style={styles.pdfWrapper}>
                <Pdf
                  title="TGC Learning Guide 1"
                  fileName="tgc_learning_guide.pdf"
                  fileSize="2.3 MB"
                  fileUrl="https://example.com/tgc_learning_guide.pdf"
                />
                <Text style={{ color: COLORS.white }}>PDF Viewer Here</Text>
              </View>
            ) : data.post_type == 5 ? (
              <View>
                {/* <Article /> */}
                <Text style={{ color: COLORS.white }}>Article Section</Text>
              </View>
            ) : (
              <Text style={{ color: COLORS.white }}>None</Text>
            )}
          
  
          {/* Title & Description */}
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.publishedOn}>{data.add_date_time}</Text>
  
          <View style={styles.descriptionContainer}>
            <Button
              title="Description"
              height="30"
              width="55%"
              borderRadius={3}
              color={COLORS.white}
              backgroundColor="#068aca"
            />
            <RenderHTML
              contentWidth={width}
              source={{ html: data.description }}
              baseStyle={styles.description}
              tagsStyles={tagsStyles}
            />
            <RenderHTML
              contentWidth={width}
              source={{ html: data.full_description }}
              baseStyle={styles.description}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default SinglePost;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BACKGROUND_COLORS.primary,
    },
    topBar: {
      marginTop: 25,
      marginBottom: 5,
    },
    button: {
      alignItems: "center",
      marginTop: 5,
    },
    buttonTop: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      columnGap: 15,
      marginBottom: 20,
      marginTop: 10,
    },
    videoWrapper: {
      backgroundColor: BACKGROUND_COLORS.deepBrown,
      padding: 20,
      marginHorizontal: 16,
      marginTop: 20,
    },
    videoContainer: {
      alignItems: "center",
      width: "100%",
    },
    title: {
      color: COLORS.white,
      fontSize: 16,
      marginTop: 10,
    },
    publishedOn: {
      color: "#ddd",
      fontSize: 13,
      marginTop: 5,
    },
    descriptionContainer: {
      backgroundColor: BACKGROUND_COLORS.white,
      padding: 16,
      paddingTop: 10,
      marginTop: 10,
      borderRadius: 3,
    },
    description: {
      fontSize: 15,
      marginTop: 10,
      color: "#555",
    },
    imageWrapper: {
      alignItems: "center",
      marginTop: 10,
    },
    image: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
      marginBottom: 10,
    },
    pdfWrapper: {
      backgroundColor: COLORS.black,
      padding: 10,
      alignItems: "center",
    },
    audioWrapper: {
      padding: 20,
      alignItems: "center",
    },
  });
  
  const tagsStyles = {
    a: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
    h2: {
      fontSize:20,
      marginTop:10,

    },
  };