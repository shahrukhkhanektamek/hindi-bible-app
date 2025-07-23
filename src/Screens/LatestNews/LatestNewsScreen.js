import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import VideoPlayer from '../../Components/Video/VideoPlayer.js';


import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

import { GlobalContext } from '../../Components/GlobalContext';
import PageLoding from '../../Components/PageLoding.js';
import { postData, apiUrl } from '../../Components/api';

const urls=apiUrl();



const LatestNewsScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

    const { extraData } = useContext(GlobalContext);
  const appSetting = extraData.appSetting;
  const userDetail = extraData.userDetail;


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
        const response = await postData({}, urls.NewsList, "GET", navigation, extraData, 1);
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
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.topSection}>
        <GradiantButton
          title="Log Out"
          height="27"
          width="25%"
          gradientType="red"
          borderRadius={5}
          fontWeight={500}
        />
        <GradiantButton
          title="Home"
          height="27"
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          fontWeight={500}
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      
      <View style={styles.videoContainer}>
        <Text style={styles.heading}>Latest News</Text>
        
        {data.map((item) => (
          <React.Fragment key={item.id}> 
            <View style={styles.videoPlayer}>
              <VideoPlayer
                videoSource={require('../../Assets/myvideo.mp4')} // change to item.video_url if dynamic
                thumbnail={{ uri: item.image }}
                frameSource={require('../../Assets/videoFrame.jpeg')}
              />
            </View> 
            <RenderHTML
              contentWidth={width}
              source={{ html: item.description }}
              baseStyle={styles.description}
            />
            <Text style={styles.description}>{item.description || 'No description available.'}</Text>
          </React.Fragment>
        ))}

          
 

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 20,
  },
  topSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 16,
  },
  videoContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    borderRadius: 5,
  },
  videoPlayer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  heading: {
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: 500,
    fontSize: 18,
  },
  description: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 20,
  },
});

export default LatestNewsScreen;
