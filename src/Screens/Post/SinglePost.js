import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    RefreshControl,
    TouchableOpacity,
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


  import Icon from 'react-native-vector-icons/Ionicons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import tagsStyles from '../../Constants/tagsStyles'


  
  import PageLoding from '../../Components/PageLoding.js';
  import { postData, apiUrl } from '../../Components/api';
  import Pdf from '../../Components/Pdf/Pdf.js';
  import AudioPlayer from '../../Components/Audio/AudioPlayer.js';
  import Article from '../../Components/Article/Article.js';
  import LogoutButton from '../../Components/LogoutButton.js';
import UniversalPlayer from "../../Components/Video/UniversalPlayer/UniversalPlayer.js";
  const urls=apiUrl();



  const SinglePost = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { item, name} = route.params || {};

  const { extraData } = useContext(GlobalContext);
  const appSetting = extraData.appSetting;
  const userDetail = extraData.userDetail;

  const videoHeight = (Dimensions.get("window").width * 9) / 16;
  

  const data = item;
    
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [data, setData] = useState([]);
  const onRefresh = useCallback(() => {
    // setPage(0);
    setRefreshing(true);
    setRefreshing(false);
    // fetchData(page);
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

    const postLike = async (post_like_id, post_type) => { 
      try {
        const response = await postData({post_id:post_like_id,type:post_type}, urls.postLike, "POST", null, extraData,0,1);
        if(response.status==200)
        {
          data.likes = response.data;
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      } 
    }; 

    useEffect(() => {
      // fetchData()
    },[])
    if(isLoading)
    {
      return ( 
        <PageLoding /> 
      ); 
    }





    return (

      <View style={{flex:1,paddingBottom:50}}>
        <ScrollView style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        <TouchableOpacity activeOpacity={1}>
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
            onPress={() => navigation.navigate('Category', route.params)}
          />
          {userDetail?(
            <LogoutButton />
          ):null
          }
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
            title={name}
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

                  <UniversalPlayer
                    // key={videoKey}
                    style={styles.webviewVideo}
                    type={data.video_type}               // "youtube", "vimeo", "gumlet", "gdrive", "video", "audio"
                    source={data.video_url} // video ID or URL
                    thumbnail={data.image} // optional
                    height={175}
                  />

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
                <Image source={{uri:data.image}} style={styles.image} />
              </View>
            ) : (
              <Text style={{ color: COLORS.white }}>None</Text>
            )}
          
  
          {/* Title & Description */}
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.publishedOn}>{data.add_date_time}</Text>
  
          <View style={styles.descriptionContainer}>
            <Button
              title="DESCRIPTION"
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
            
          </View>

            <View style={styles.descriptionContainer}>
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
              source={{ html: data.full_description }}
              baseStyle={styles.description}
              tagsStyles={tagsStyles}
            />
          </View>

        </View>


        </TouchableOpacity>

       </ScrollView>

       
       <View style={styles.reactionContainer}>
          <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(data.id,1)}>
            <Icon name="heart" style={[styles.reactionIcon, { color: "#e0245e" }]} /> 
            <Text style={styles.reactionCount}>{data.likes.heart ? data.likes.heart : 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(data.id,2)}>
            {/* <Icon name="thumbs-up" style={[styles.reactionIcon, { color: "#1877F2" }]} />  */}
            <Text style={[styles.reactionIconText]}>👍</Text>
            <Text style={styles.reactionCount}>{data.likes.thumbs ? data.likes.thumbs : 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(data.id,4)}>
            {/* <Icon name="happy" style={[styles.reactionIcon, { color: "#f7b731" }]} />  */}
            <Text style={[styles.reactionIconText]}>👏</Text>
            <Text style={styles.reactionCount}>{data.likes.smile ? data.likes.smile : 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(data.id,3)}>
            {/* <Icon name="flame" style={[styles.reactionIcon, { color: "#ff4500" }]} />  */}
            <Text style={[styles.reactionIconText]}>🔥</Text>
            <Text style={styles.reactionCount}>{data.likes.fire ? data.likes.fire : 0}</Text>
          </TouchableOpacity>
        </View>
      </View>
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


    reactionContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      justifyContent: "space-between",
      paddingVertical: 8,
      paddingHorizontal: 12,
      gap: 12, // space between each reaction
      position:'absolute',
      bottom:0,
      width:'100%',
      backgroundColor:'white'
    },
    reactionButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: 20,
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    reactionIcon: {
      fontSize: 20,
      color: "#555",
      marginRight: 4,
    },
    reactionIconText:{
      marginRight:4
    },
    reactionCount: {
      fontSize: 14,
      color: "#333",
      fontWeight: "500",
    },
    viewsWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
      marginBottom: 5,
      paddingHorizontal: 12,
      textAlign:'right',
      justifyContent:'space-between',
    },
    viewsWrapperIcon: {
      flexDirection: "row",
    },
    viewsText: {
      fontSize: 14,
      marginLeft: 6,
      color: "#444",
      fontWeight: "500",
      textAlign:'right'
    },
    image: {
      width: "100%",
      height: 500,
      borderRadius: 0,
      resizeMode:'stretch'
    },



  });
  
