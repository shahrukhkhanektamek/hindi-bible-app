import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';

import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

const MainScreen = () => {
  const navigation = useNavigation();


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
          const response = await postData({}, urls.category, "GET", null, extraData);
          setData(response.data);           
          setisLoading(false)
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
          <View flex={1}> 
            
          </View>
        ); 
      }


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
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Log Out"
          height="30"
          width="25%"
          gradientType="red"
          borderRadius={5}
          fontSize={15}
        />
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
      <View style={styles.button}>
        <Button
          title="Menu"
          height="35"
          width="25%"
          fontSize={15}
          backgroundColor="#3669c3"
          borderRadius={5}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>

          <View style={[styles.row]}>
            {data.map((item) => (
              <View style={[styles.col6,styles.plr5,styles.mb15]} key={item.id}>
                <GradiantButton
                    title={item.name}
                    title2={item?.name2}
                    height="45"
                    width="100%"
                    gradientType="orange"
                    borderRadius={5}
                    fontSize={Number(item?.font_size)}
                    fontWeight="500"
                    onPress={() => navigation.navigate('Category', {id:item.id,name:item.name})}
                  />
                </View>
            ))}
          </View>

          
        </View>




            <View style={styles.buttonWrapper}>
                <GradiantButton
                  title="Edit Profile"
                  height="35"
                  width="45%"
                  gradientType="green"
                  borderRadius={5}
                  fontSize={15}
                  fontWeight="500"
                  onPress={() => navigation.navigate('EditProfile')}
                />
                <GradiantButton
                  title="Order History"
                  height="35"
                  width="45%"
                  gradientType="green"
                  borderRadius={5}
                  fontSize={15}
                  fontWeight="500"
                  onPress={() => navigation.navigate('OrderHistory')}
                />
              </View>





{/*           
          <GradiantButton
            title=""
            height="45"
            width="45%"
            gradientType="gray"
            borderRadius={5}
            fontSize={15}
            fontWeight="500"
          /> */}
        
        
        
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
    columnGap: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
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

export default MainScreen;
