import { ScrollView, StyleSheet, View, RefreshControl, Image, Text, TouchableOpacity } from 'react-native';
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
import LogoutButton from '../../Components/LogoutButton.js';
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


    const handlePay = async (id) => { 
      console.log("fasfa");
      navigation.navigate("SelectCountryScreen",{"type":2,"item_id":id})
    };



  const handleAudioEnd = (currentId) => {
  // saare audio items filter karo
  const audioItems = data.filter((i) => i.post_type == 2);

  // current ka index nikal lo
  const currentIndex = audioItems.findIndex((i) => i.id === currentId);

  // agla element exist karta hai to uska id setPlayingId me daalo
  if (currentIndex !== -1 && currentIndex + 1 < audioItems.length) {
    const nextItem = audioItems[currentIndex + 1];
    setPlayingId(nextItem.id);
  } else {
    // agar last audio hai to stop kar do
    setPlayingId(null);
  }
};


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
        {!show_case?(
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
          <View style={[styles.itemContainer]} key={item.id}>
            <React.Fragment >
              {(item.post_type==1) ? ( 
                <View style={[styles.videoFrame]}>
                  <TouchableOpacity 
                  style={styles.imageWrapper}
                  onPress={() =>!item.is_paid?navigation.navigate('SinglePost', {item:item}):handlePay(item.id)}
                  >
                      <Image source={{uri:item.image}} style={styles.image} />
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      </View>
                  </TouchableOpacity>
                </View>
              ) : (item.post_type==2) ? ( 
                
                <View style={styles.pdfWrapper}>        
                    <AudioPlayer
                        id={item.id}
                        chapterTitle={item?.chapter}
                        source={{uri:item.audio}}
                        setPlayingId={setPlayingId}
                        playingId={playingId}
                        title={item.name}
                        artist={item?.artist}
                        onEnd={() => handleAudioEnd(item.id)}
                      />
                </View>
              
              ) : (item.post_type==3) ? ( 
                <View style={styles.imageWrapper}>
                  <View style={styles.imageContainer}>
                    <Image source={{uri:item.image}} style={styles.image} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    </View>
                  </View>
                </View>
              
              ) : (item.post_type==6) ? ( 
                <View style={styles.imageWrapper}>
                  <View style={styles.imageContainer}>
                    <Image source={{uri:item.image}} style={styles.image} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <View style={styles.imageTitleWrapper}>
                        <Text style={styles.imageTitle}>{item.name}</Text>
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
                            images: item?.album?item.album:[],
                            initialIndex: 0,
                          })
                        }
                      />
                    </View>
                  </View> 
                </View>

              ) : (item.post_type==4) ? ( 
                <View style={styles.pdfWrapper}>  
                  <TouchableOpacity 
                onPress={() =>
                        navigation.navigate('SinglePost', {
                          item:item,
                        })
                      }>
                      <Pdf
                        title={item.name}
                        // fileName="tgc_learning_guide.pdf"
                        // fileSize="2.3 MB"
                        fileUrl={item.pdf}
                      />
                    </TouchableOpacity>                      
                </View>

              ) : (item.post_type==5) ? ( 
                <TouchableOpacity 
                onPress={() =>
                        navigation.navigate('SinglePost', {
                          item:item,
                        })
                      }>
                  <Article
                    imageSource={{uri:item.image}}
                    data={item}
                  />
                  </TouchableOpacity>

              ) : (
                <Text>None</Text>
              )} 
            </React.Fragment>
            
            {(item.is_paid==1)?(
              <Text style={[styles.paidStatus]}>Paid</Text>
            ):null
            }

          </View>
          
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
  itemContainer:{
    width:'100%',
    // display:'flex',    
    // resizeMode:'cover',
    // aspectRatio: 30 / 9,
  },
  video:{
    width:'100%',
    resizeMode:'cover',
  },
  videoFrame: {
    width: '100%',
    // backgroundColor: '#000',
  },
  paidStatus:{
    position:'absolute',
    right:0,
    top:0,
    backgroundColor:'red',
    color:'white',
    paddingVertical:5,
    paddingHorizontal:10,
    fontWeight:'bold'
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
    resizeMode: 'cover',
  },
  imageContainer: {
    marginBottom: 0,
    marginTop: 5,
    width:'100%'
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
