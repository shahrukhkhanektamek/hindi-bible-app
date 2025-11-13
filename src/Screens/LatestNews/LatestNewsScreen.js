import { ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import { GlobalContext } from '../../Components/GlobalContext';
import PageLoding from '../../Components/PageLoding.js';
import { postData, apiUrl } from '../../Components/api';
import LogoutButton from '../../Components/LogoutButton.js';


const urls = apiUrl();

const LatestNewsScreen = () => {
  const navigation = useNavigation();
  const { extraData } = useContext(GlobalContext);
  const { appSetting, userDetail } = extraData;

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [videoKey, setVideoKey] = useState(0);
  const [page, setpage] = useState(0);

  const onRefresh = useCallback(() => {
    setVideoKey(prev => prev + 1);
    setRefreshing(true);
    setRefreshing(false);
    fetchData();
    setpage(0)
  }, []);

  const fetchData = async () => {
    try {
      const response = await postData({page:page}, urls.NewsList, "GET", navigation, extraData, 0);
      if(response.status === 200) {
        
        const data = response.data; 
        setData(prevData => page === 0 || page === 1 ? data : [...prevData, ...data]);

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      fetchData(); // when returning from details screen
    }, [])
  );

  const loadMoreData = async () => {
    setpage(page+1);
  }


  if(isLoading) return <PageLoding />;

  return (
    <ScrollView 
      style={styles.container} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <TouchableOpacity activeOpacity={1}>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      {/* Action Buttons */}
      <View style={styles.topSection}>
        
        <GradiantButton
          title="Home"
          height="30"
          width="25%"
          gradientType="yellow"
          borderRadius={8}
          fontWeight="600"
          onPress={() => navigation.navigate('Home')}
        />
        {
        (userDetail)? 
        <LogoutButton />
        :
          <Text></Text>
        }

        <GradiantButton
          title="Back"
          height="30"
          width="25%"
          gradientType="purple"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.goBack()}
        />

      </View>

      {/* News List */}
      {data.map((item, index) => (
        <View style={styles.newsCard} key={index}>
          {index === 0 && <Text style={styles.heading}>Latest News</Text>}

          {/* Video */}
          <View style={styles.videoWrapper}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("LatestNewsDetail", {item})}
          >
              <Image 
                source={{ uri: item.image }}
                style={styles.imageStyle}
                resizeMode="contain" 
              />
              </TouchableOpacity>
          </View>

          {/* News Title */}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={[styles.title, {margin:0}]}>{item.dateString}</Text>

          {/* Read More */}
          <TouchableOpacity 
            style={styles.readMoreButton}
            onPress={() => navigation.navigate("LatestNewsDetail", {item})}
          >
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      ))}

        <TouchableOpacity 
        onPress={()=>loadMoreData()}
        style={{
            margin:'auto',
            backgroundColor:BACKGROUND_COLORS.darkRed,
            paddingVertical:10,
            paddingHorizontal:15,
            borderRadius:5,
            marginBottom:10,
          }}><Text style={{color:COLORS.white}}>Load More</Text></TouchableOpacity>

      </TouchableOpacity>
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
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  imageStyle: {
  width: '100%',
  height: '100%',
  borderRadius: 12,
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
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
  },
  videoWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  webviewVideo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 10,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'blue',
    borderRadius: 6,
  },
  readMoreText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  
});

export default LatestNewsScreen;
