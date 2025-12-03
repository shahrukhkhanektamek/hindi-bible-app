/* eslint-disable react-native/no-inline-styles */
import { ScrollView, StyleSheet, View, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';

import { GlobalContext } from '../../Components/GlobalContext';
import PageLoding from '../../Components/PageLoding.js';
import { postData, apiUrl } from '../../Components/api';
import LogoutButton from '../../Components/LogoutButton.js';
const urls=apiUrl();


const OldTestamentScreen = ({route}) => {
  const navigation = useNavigation();
  const {id, name, show_case} = route.params;



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
        const response = await postData({id:id,show_case:show_case}, urls.subSubSubCategory, "GET", null, extraData, 1);
        if(response.status==200)
        {
          setData(response.data);           
          setisLoading(false)
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    // useEffect(() => {
    //   fetchData()
    // },[])
    useFocusEffect(
      useCallback(() => {
        fetchData(); // when returning from details screen
      }, [])
    );
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
      <TouchableOpacity activeOpacity={1}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>
      <View style={styles.buttonTop}>
        <GradiantButton
          title="Menu"
          height="30"
          width="25%"
          gradientType="blue"
          borderRadius={5}
          onPress={() => navigation.navigate('Category', route.params)}
        />
        <GradiantButton
          title="Home"
          height="30"
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.navigate('Home')}
        />
        {userDetail?(
          <LogoutButton />
        ):null
        }
        <GradiantButton
          title="Back"
          height="30"
          width="20%"
          fontSize={16}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button
          title={name}
          height="30"
          width="35%"
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>

      <View style={styles.buttonContainer}>
        

        <View style={[styles.row]}>
          {data.map((item) => (
            <View style={[styles.col6,styles.plr5,styles.mb15]} key={item.id}>
              <GradiantButton
                  title={item.name}
                  title2={item?.name2}
                  height="45"
                  width="100%"
                  gradientType={item.post_used?'orange':'gray'}
                  borderRadius={5}
                  fontSize={Number(item?.font_size)}
                  fontWeight="500"
                  count={item?.post_count}
                  onPress={() => item.post_used?navigation.navigate('Post', {id:item.id,name:item.name,show_case:show_case,"category_type":4}):null}
                />
              </View>
          ))}
        </View>

      </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
    padding: 16,
    paddingVertical: 0,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 5,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
     row: {
      // flex:1,
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  col6:{
      width:'50%'
  },
  plr5:{
      paddingHorizontal:5,
  },
  mb15:{
      marginBottom:15,
  },
});

export default OldTestamentScreen;
