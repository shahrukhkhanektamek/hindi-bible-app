/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Linking, ScrollView, Animated, Dimensions, RefreshControl, TouchableOpacity  } from 'react-native';
import React, { useEffect, useRef, useState, useContext, useCallback  } from 'react';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '../../Components/Button/GradientButton.js';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import VideoPlayer from '../../Components/Video/VideoPlayer.js';
import Button from '../../Components/Button/Button.js'; 
import BeforeRegistrationModal from '../../Components/Modal/MemberLogin/BeforeRegistrationModal.js';
import AfterRegistrationModal from '../../Components/Modal/MemberLogin/AfterRegistrationModal.js';
import FreeTrialRuningModal from '../../Components/Modal/MemberLogin/FreeTrialRuningModal.js';
import FreeTrialExpireModal from '../../Components/Modal/MemberLogin/FreeTrialExpireModal.js';
import PackageExpireModal from '../../Components/Modal/MemberLogin/PackageExpireModal.js';

import Logout from '../../Components/Button/Logout';

import PageLoding from '../../Components/PageLoding.js';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV

import { GlobalContext } from '../../Components/GlobalContext';
import WebView from 'react-native-webview';

const HomeScreen = () => {
  
  const { extraData } = useContext(GlobalContext);
  const appSetting = extraData.appSetting;
  const userDetail = extraData.userDetail;
  const setappSetting = extraData.setappSetting;
  


    
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(1)).current;  

  const [isBeforeRegisterModalVisible, setIsBeforeRegisterModalVisible] = useState(false);
  const [isAfterRegisterModalVisible, setIsAfterRegisterModalVisible] = useState(false);
  const [isFreeTrialRuningModalModalVisible, setIsFreeTrialRuningModalVisible] = useState(false);
  const [isFreeTrialExpireModalVisible, setIsFreeTrialExpireModalVisible] = useState(false);
  const [isPackageExpireModalVisible, setIsPackageExpireModalVisible] = useState(false);

  const [isLatestNews, setisLatestNews] = useState(false);
  const [NewDate, setNewDate] = useState('');
  const [NewsId, setNewsId] = useState('');
  const [Package, setPackage] = useState();


    const [page, setPage] = useState(0);
    const [isLoading, setisLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
      // setPage(0);
      setRefreshing(true);
      setRefreshing(false); 
      fetchSettingData2(page); 
    }, []);
    const fetchSettingData2 = async () => { 
      try { 
        const response = await postData({}, urls.appSetting, "GET", navigation, extraData, 1);
        if(response.status==200)
        {
          setappSetting(JSON.parse(storage.getString('appSetting')));
          setNewDate(response.data.latestNews.add_date_time)
          setNewsId(response.data.latestNews.id)
          setPackage(response.data.package)
          
          
        
          if(String(response.data.latestNews.id)!=storage.getString('latestNews')) 
          {
            setisLatestNews(true)
          }
          setisLoading(false);
          if(response.data.is_login==1)
          {
            if(response.data.package.status==0 || response.data.package.status==2)
            {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'SelectCountryScreen',
                    params: {type:1}, 
                  },
                ],
              });

            }
          }
        }
      } catch (error) { 
        console.error('Error fetching countries:', error);
      }
    };


  const handleFreeTrial = async () => {      
    if(appSetting.free_trial==0){
      navigation.navigate("OneDayFreeTrial")
    }
    else if(appSetting.free_trial==1)
    {
      setIsFreeTrialRuningModalVisible(true)
    }
    else if(appSetting.free_trial==2)
    {
      setIsFreeTrialExpireModalVisible(true)
    }
  };

  const handleRegister = async () => {      
    if(appSetting.device_is_register==0){
      setIsBeforeRegisterModalVisible(true)
    }
    else if(appSetting.device_is_register==1)
    {
      setIsAfterRegisterModalVisible(true)
    }
    else if(appSetting.device_is_register==2)
    {
      setIsPackageExpireModalVisible(true)
    }
  };
  const handleLogin = async () => {      
    
    if(appSetting.device_is_register==0){
      setIsBeforeRegisterModalVisible(true)
    }
    else if(appSetting.device_is_register==1)
    {
      navigation.navigate("Login")
    }
  };
  



    const fetchLike = async (likeType) => { 
      try { 
        const response = await postData({"type":likeType}, urls.appLike, "GET", navigation, extraData);
        if(response.status==200)
        {
          appSetting.total_thumb = response.data.total_thumb;
          appSetting.total_heart = response.data.total_heart;
        }
      } catch (error) { 
        console.error('Error fetching countries:', error);
      }
    }; 
    const handleLike = async (likeType) => {      
      fetchLike(likeType); 
    };


    const handleLatestnew = async () => {     
      try {
        storage.set('latestNews', String(NewsId));
        setisLatestNews(false)
        navigation.navigate('LatestNews');
      } catch (error) {
        console.error("Failed to save New Id:", error);
      }
    };


  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, { 
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  useEffect(() => {
    fetchSettingData2()
  },[])
  if (isLoading) {
    return (
        <PageLoding />          
    );
  }

  return (
    <ScrollView style={styles.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <Text style={[styles.heading, { fontFamily: 'Cambria', lineHeight: 25 }]}><Text style={{ color: COLORS.peru }}>TGC</Text> HINDI BIBLE STUDY</Text>

      <View style={styles.starContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isLatestNews ? (
            <Animated.Text style={{ opacity, fontSize: 16, color: 'red' }}>★</Animated.Text>
          ) : null}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <GradientButton
          title="Subscribers"
          height="30"
          width="26%"
          gradientType="yellow"
          borderRadius={5}
        />
        <View style={styles.subscriber}>          
          <Text style={styles.subscriberText}>{appSetting.total_subscribe}</Text>
        </View>
        <GradientButton
          title="Latest News"
          height="30"
          width="28%"
          gradientType="blue"
          borderRadius={5}
          onPress={handleLatestnew}
        />
        <GradientButton
          title="Contact Us"
          height="30"
          width="25%"
          gradientType="green"
          borderRadius={5}
          onPress={() => navigation.navigate('ContactUs')}
        />
      </View>

      <View style={styles.emojiContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 37 }}>
          <View style={styles.emojiBackground}>
            <TouchableOpacity onPress={() => handleLike(1)}>
              <Text style={styles.emoji}>❤️ {appSetting.total_heart}</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.emojiBackground}> 
            <TouchableOpacity onPress={() => handleLike(2)}>
              <Text style={styles.emoji}>👍 {appSetting.total_thumb}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, { marginTop: 0 }]}>{NewDate}</Text>
        </View>
      </View>

      <View style={styles.priceButton}>
        <Button
          title={appSetting.detail.fees_string}
          height="40"
          width="50%"
          backgroundColor={BACKGROUND_COLORS.darkRed}
          color="#ffff00"
          borderRadius={5}
          fontSize={15}
          fontWeight="500"
          borderColor="#ffff00"
          borderWidth={4}
        />
      </View>

      <View style={styles.videoPlayer}>
        
        <WebView
          style={styles.webviewVideo}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: `https://www.youtube.com/embed/${appSetting.intro_video.video}` }}
        />
      


      
          {/* <VideoPlayer 
            videoSource={{uri: appSetting.intro_video}}
            thumbnail={require('../../Assets/videoThumbnail.jpeg')}
            frameSource={require('../../Assets/videoFrame.jpeg')}
          /> */}


      </View>
          
      
      {
        (!userDetail)? 

      
        <View style={styles.button}>
          <GradientButton
            title="1 Day Free Trial"
            title2="Ek Din Ka Free Trial"
            height="50"
            width="50%"
            gradientType="orange"
            color={COLORS.white}
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
            onPress={handleFreeTrial}
          />
        </View>
        :
        <Text></Text>
      }

      <View style={styles.button}>
        <GradientButton
          title="Your Contribution"
          title2="Aapka Arthik Yogdan"
          height="50"
          width="50%"
          gradientType="orange"
          color={COLORS.white}
          borderRadius={5}
          fontSize={15}
          fontWeight="500"
          onPress={() => navigation.navigate('YourContributionHome')}
        />
      </View>

      

      {
        (userDetail)? 
        <>
          <View style={styles.button}>
            <GradientButton
              title="Menu"
              height="50"
              width="50%"
              gradientType="menu"
              color={COLORS.white}
              borderRadius={5}
              fontSize={15}
              fontWeight="500"
              onPress={() => navigation.navigate('Category')}
              // onPress={() => setIsBeforeRegisterModalVisible(true)}
            />
          </View>
          <Logout />
          </>
        :
        <>
          <View style={styles.button}>
            <GradientButton
              title="New Sign Up"
              height="50"
              width="50%"
              gradientType="orange"
              color={COLORS.white}
              borderRadius={5}
              fontSize={15}
              fontWeight="500"
              onPress={handleRegister}
            />
          </View>
          <View style={styles.button}>
            <GradientButton
              title="Member Log In"
              height="50"
              width="50%"
              gradientType="orange"
              color={COLORS.white}
              borderRadius={5}
              fontSize={15}
              fontWeight="500"
              onPress={handleLogin}
            />
          </View>
          </>
          
      }
      
        



      <View style={[styles.button, { marginBottom: 10 }]}>
        <GradientButton
          title="hindibiblestudy.com"
          height="35"
          width="60%"
          gradientType="blue"
          color={COLORS.white}
          borderRadius={5}
          fontSize={16}
          fontWeight="500"
          onPress={() => Linking.openURL('https://hindibiblestudy.com')}
        />
      </View>

      <BeforeRegistrationModal
        visible={isBeforeRegisterModalVisible}
        onClose={() => setIsBeforeRegisterModalVisible(false)}
      />

      <AfterRegistrationModal
        visible={isAfterRegisterModalVisible}
        onClose={() => setIsAfterRegisterModalVisible(false)}
        package={Package}
      />

      <FreeTrialRuningModal
        visible={isFreeTrialRuningModalModalVisible}
        onClose={() => setIsFreeTrialRuningModalVisible(false)}
      />

      <FreeTrialExpireModal
        visible={isFreeTrialExpireModalVisible}
        onClose={() => setIsFreeTrialExpireModalVisible(false)}
      />

      <PackageExpireModal
        visible={isPackageExpireModalVisible}
        onClose={() => setIsPackageExpireModalVisible(false)}
        appSetting={appSetting}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginBottom: 5,
    marginTop: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.deepMossGreen,
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
    marginHorizontal: 10,
  },
  subscriber: {
    backgroundColor: BACKGROUND_COLORS.white,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    padding: 5,
    marginLeft: -15,
  },
  subscriberText: {
    color: '#333',
    fontSize: 14,
  },
  button: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  emojiBackground: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 12,
  },
  text: {
    fontSize: 14,
  },
  starContainer: {
    flexDirection: 'row',
    marginLeft: 235,
  },
  priceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  webviewVideo: {
    // height: (Dimensions.get('window').width * 9) / 16,
    height:180,
    width: '100%',
    width:'80%',
    margin:'auto'
  },
});

export default HomeScreen;
