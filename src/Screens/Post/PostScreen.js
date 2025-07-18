import { ScrollView, StyleSheet, View, RefreshControl, Image, Text } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Video from '../../Components/Video/Video.js';
import Button from '../../Components/Button/Button.js';
import SearchInput from '../../Components/Search/SearchInput.js';
import BeforeFreeTrialModal from '../../Components/Modal/MemberLogin/BeforeFreeTrialModal.js';

import { GlobalContext } from '../../Components/GlobalContext';
import PageLoding from '../../Components/PageLoding.js';
import { postData, apiUrl } from '../../Components/api';
import Pdf from '../../Components/Pdf/Pdf.js';
import AudioPlayer from '../../Components/Audio/AudioPlayer.js';
import Article from '../../Components/Article/Article.js';
const urls=apiUrl();


const GenesisScreen = ({route}) => {
  const navigation = useNavigation();
  const {id, name, category_type,show_case} = route.params;
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState(null);

  const handleSearch = () => {
    Alert.alert('Search Submitted', `You searched for: "${search}"`);
  };

  const [BeforeFreeTrialModalVisible, setBeforeFreeTrialModalVisible] = useState(false);
  const handleOpenVide = () => {
    if(show_case)
    {
      setBeforeFreeTrialModalVisible(true)
    }
  };

 
  
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
        const response = await postData({id:id,category_type:category_type,show_case:show_case}, urls.postList, "GET", null, extraData, 1);
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




    const albumImages = [
    {
      title: 'CONFERENCE',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
    {
      title: 'MEETING',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
    {
      title: 'PLAYING',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
  ];




  return (
    <ScrollView style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>
      <View style={styles.buttonTop}>
        <GradiantButton
          title="Home"
          height="30"
          width="20%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Menu"
          height="30"
          width="20%"
          gradientType="blue"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Main')}
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
      <View style={styles.button}>
        <Button
          title={name}
          height="35"
          width="40%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
      />
      <View style={styles.videoContainer}>
        
        

        {data.map((item) => (
          <React.Fragment key={item.id}>
            {(item.post_type==1) ? ( 
               <Video
                  thumbnail={require('../../Assets/videoThumbnail.jpeg')}
                  frameSource={require('../../Assets/videoFrame.jpeg')}
                  // onPress={() =>
                  //   navigation.navigate('SingleVideo', {
                  //     videoSource: require('../../Assets/myvideo.mp4'),
                  //     thumbnail: require('../../Assets/videoThumbnail.jpeg'),
                  //     frameSource: require('../../Assets/videoFrame.jpeg'),
                  //     buttonTitle: 'Genesis Classes',
                  //     title: 'Video 1 - How to learn coding in simple and easy way...',
                  //     publishedOn: '15 February 2025',
                  //     description: 'Exploring the Wonders of Space: A Journey Beyond Earth, Mastering React Native: Build Your First Mobile App, The Secret Life of Ocean Creatures: Underwater Wonders,',
                  //   })
                  // }

                  onPress={handleOpenVide}

                />
            ) : (item.post_type==2) ? ( 
              
              <View style={styles.pdfWrapper}>        
                  <AudioPlayer
                      id={item.id}
                      chapterTitle="Counselling3"
                      source={require('../../Assets/myaudio.mp3')}
                      setPlayingId={setPlayingId}
                      playingId={playingId}
                    />
              </View>
            
            ) : (item.post_type==3) ? ( 
              <View style={styles.imageWrapper}>
                <View style={styles.imageContainer}>
                  <Image source={require('../../Assets/videoThumbnail.jpeg')} style={styles.image} />
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={styles.imageTitleWrapper}>
                      <Text style={styles.imageTitle}>Album Title</Text>
                    </View>
                    <GradiantButton
                      title="Album"
                      height="31"
                      width="25%"
                      gradientType="orange"
                      borderRadius={5}
                      fontSize={15}
                      onPress={() =>
                        navigation.navigate('AlbumImage', {
                          images: {},
                          initialIndex: 0,
                        })
                      }
                    />
                  </View>
                </View>
              </View>

            ) : (item.post_type==4) ? ( 
              <View style={styles.pdfWrapper}>        
                  <Pdf
                    title={`TGC Learning Guide 1`}
                    fileName="tgc_learning_guide.pdf"
                    fileSize="2.3 MB"
                    fileUrl="https://example.com/tgc_learning_guide.pdf"
                  />                
              </View>

            ) : (item.post_type==5) ? ( 
              <Article
                imageSource={require('../../Assets/videoThumbnail.jpeg')}
                description="How to learn coding in easy way, If you are using a custom button component, ensure it accepts and applies the style prop correctly."
                title="If you are using a custom button..."
                links={[
                  'https://www.youtube.com',
                  'https://www.youtube.com',
                  'https://www.youtube.com',
                ]}
              />

            ) : (
              <Text>None</Text>
            )}
          </React.Fragment>
        ))}


        
       


        
      </View>
         


        
      <BeforeFreeTrialModal
        visible={BeforeFreeTrialModalVisible}
        onClose={() => setBeforeFreeTrialModalVisible(false)}
      />
        



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
    padding: 10,
    paddingBottom:200
  },
  topBar: {
    marginTop: 25,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  videoContainer: {
    alignItems: 'center',
    rowGap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10,
    marginHorizontal: 25,
    height: 45,
    borderColor: '#999',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  searchButton: {
    borderLeftColor: '#999',
    borderLeftWidth: 1,
    borderRadius: 8,
    padding: 9,
    backgroundColor: '#eee',
  },
   mediaContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
   pdfWrapper: {
    paddingHorizontal: 10,
    width:"100%"
  },
  imageWrapper: {
    paddingHorizontal: 16,
    width:"100%"
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  imageContainer: {
    marginBottom: 0,
    marginTop: 5,
  },
  imageTitleWrapper: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },

});

export default GenesisScreen;
