import { ScrollView, StyleSheet, View, RefreshControl, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Video from '../../Components/Video/Video.js';

import GradientButton from '../../Components/Button/GradientButton.js';
import COLORS from '../../Constants/Colors.js';

import Button from '../../Components/Button/Button.js';
import SearchInput from '../../Components/Search/SearchInput.js';
import BeforeFreeTrialModal from '../../Components/Modal/MemberLogin/BeforeFreeTrialModal.js';
import Icon from 'react-native-vector-icons/Ionicons';

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
    setPage(0);
    setisLoading(true)
    fetchData(page);
  };

  const [BeforeFreeTrialModalVisible, setBeforeFreeTrialModalVisible] = useState(false);
  const handleOpenView = () => {
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
    setPage(0);
    setRefreshing(true);
    setRefreshing(false);
    fetchData();
  }, []);

    const fetchData = async () => { 
      try {
        console.log({page:page,id:id,category_type:category_type,show_case:show_case,search:search})
        const response = await postData({page:page,id:id,category_type:category_type,show_case:show_case,search:search}, urls.postList, "GET", null, extraData, 1);
        if(response.status==200)
        {
          // setData(response.data);
          const data = response.data;
          setData(prevPosts => page === 0 ? data : [...prevPosts, ...data]);
          setisLoading(false)
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const postViewData = async (item_post_id) => { 
      try {
        const response = await postData({post_id:item_post_id,id:id,category_type:category_type}, urls.postView, "POST", null, extraData, 1);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const postLike = async (post_like_id, post_type, position) => { 
      try {
        const response = await postData({post_id:post_like_id,type:post_type}, urls.postLike, "POST", null, extraData,0,1);
        if(response.status==200)
        {
          data[position].likes = response.data;
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      } 
    }; 

    useEffect(() => {
      fetchData()
    },[page])
    const handleLoadMore = () => {
      setPage(page + 1);      
    };

    useEffect(() => {
      // postViewData()
    },[])
    
    const handleViewPost = async (item) => { 
      
      postViewData(item)
      if(item.post_type==1)
      {
        !item.is_paid?navigation.navigate('SinglePost', {item:item}):handlePay(item.id)
      }
      else if(item.post_type==2)
      {
        // !item.is_paid?navigation.navigate('SinglePost', {item:item}):handlePay(item.id)
      }
      else if(item.post_type==3)
      {
        // !item.is_paid?navigation.navigate('SinglePost', {item:item}):handlePay(item.id)
      }
      else if(item.post_type==4)
      {
        // !item.is_paid?navigation.navigate('SinglePost', {item:item}):handlePay(item.id)
      }
      else if(item.post_type==5)
      {
        // !item.is_paid?navigation.navigate('SinglePost', {item:item}):handlePay(item.id)
      }
      else if(item.post_type==6)
      {
        !item.is_paid?navigation.navigate('AlbumImage', {
          images: item?.album?item.album:[],
          initialIndex: 0,
        }):handlePay(item.id)
      }
    };


    if(isLoading)
    {
      return ( 
        <PageLoding /> 
      ); 
    }


    const handlePay = async (id) => { 
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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
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
        
        

        {data.map((item, index) => (
          <View style={[styles.itemContainer]} key={item.id}>
            <React.Fragment >
              {(item.post_type==1) ? ( 
                <View style={[styles.videoFrame]}>
                  <TouchableOpacity 
                  style={styles.imageWrapper}
                  onPress={() =>handleViewPost(item)}
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
                    <TouchableOpacity onPress={() =>handleViewPost(item)}>
                      <Image source={{uri:item.image}} style={styles.image} />
                    </TouchableOpacity>
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
                        
                        onPress={() =>handleViewPost(item)}
                      />
                    </View>
                  </View> 
                </View>

              ) : (item.post_type==4) ? ( 
                <View style={styles.pdfWrapper}>  
                  <TouchableOpacity 
                  onPress={() =>handleViewPost(item)}>
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
                onPress={() =>handleViewPost(item)}>
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
              <TouchableOpacity onPress={() =>handleViewPost(item)} style={[styles.paidStatus]}>
                <GradientButton
                  title="Pay"
                  height="50"
                  width="50%"
                  gradientType="orange"
                  color={COLORS.white}
                  borderRadius={5}
                  fontSize={15}
                  fontWeight="500"
                />
              </TouchableOpacity>
            ):null
            }


            


            <View style={styles.reactionContainer}>
              <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(item.id,1,index)}>
                <Icon name="heart" style={[styles.reactionIcon, { color: "#e0245e" }]} /> 
                <Text style={styles.reactionCount}>{item.likes.heart ? item.likes.heart : 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(item.id,2,index)}>
                {/* <Icon name="thumbs-up" style={[styles.reactionIcon, { color: "#1877F2" }]} />  */}
                <Text style={[styles.reactionIconText]}>👍</Text>
                <Text style={styles.reactionCount}>{item.likes.thumbs ? item.likes.thumbs : 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(item.id,4,index)}>
                {/* <Icon name="happy" style={[styles.reactionIcon, { color: "#f7b731" }]} />  */}
                <Text style={[styles.reactionIconText]}>👏</Text>
                <Text style={styles.reactionCount}>{item.likes.smile ? item.likes.smile : 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(item.id,3,index)}>
                {/* <Icon name="flame" style={[styles.reactionIcon, { color: "#ff4500" }]} />  */}
                <Text style={[styles.reactionIconText]}>🔥</Text>
                <Text style={styles.reactionCount}>{item.likes.fire ? item.likes.fire : 0}</Text>
              </TouchableOpacity>


              {/* <TouchableOpacity style={styles.reactionButton} onPress={() => postLike(item.id,5,index)}>
                <Text style={[styles.reactionIconText]}>🥰</Text>
                <Text style={styles.reactionCount}>{item.likes.sparkles ? item.likes.sparkles : 0}</Text>
              </TouchableOpacity> */}

              <TouchableOpacity style={styles.reactionButton} >
                {/* <Icon name="sparkles" style={[styles.reactionIcon, { color: "#9b59b6" }]} />  */}
                <Text style={[styles.reactionIconText]}>👁</Text>
                <Text style={styles.reactionCount}>{item.views ? item.views : 0}</Text>
              </TouchableOpacity>

            </View>



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
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 120,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 12,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 12,
  },
  button: {
    alignItems: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 0,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
    marginHorizontal: 12,
    height: 45,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    marginLeft: 8,
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#eee',
  },

  videoContainer: {
    marginTop: 20,
    rowGap: 18,
    marginBottom: 40,
    width: "100%",
  },
  itemContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
  },
  videoFrame: {
    width: "100%",
  },
  video: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 0,
  },
  imageWrapper: {
    width: "100%",
    borderRadius: 0,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 0,
  },
  imageContainer: {
    width: "100%",
  },

  pdfWrapper: {
    width: "100%",
    borderRadius: 0,
    overflow: "hidden",
  },
  mediaContainer: {
    alignItems: "center",
    marginVertical: 10,
  },

  imageTitleWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },

  paidStatus: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "red",
    color: "white",
    fontSize: 15,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: "hidden",
    
  },
  paidStatusText: {
    color: "white",
    fontWeight:'900'
  },



  reactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 12, // space between each reaction
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


  



});


export default GenesisScreen;
