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


const BibleStudyScreen = ({route}) => {
  const navigation = useNavigation();

  const {id, name} = route.params;



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
        const response = await postData({id:id}, urls.subCategory, "GET", null, extraData);
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
          width="35%"
          fontSize={15}
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
                    gradientType="orange"
                    borderRadius={5}
                    fontSize={Number(item?.font_size)}
                    fontWeight="500"
                    onPress={() => navigation.navigate('SubCategory', {id:item.id,name:item.name})}
                  />
                </View>
            ))}
          </View>


        
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
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 22,
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

export default BibleStudyScreen;
