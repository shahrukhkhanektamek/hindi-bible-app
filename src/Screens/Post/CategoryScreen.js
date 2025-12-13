import { ScrollView, StyleSheet, View, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import Button from '../../Components/Button/Button.js';
import LogoutButton from '../../Components/LogoutButton.js';

import { GlobalContext } from '../../Components/GlobalContext';
import PageLoding from '../../Components/PageLoding.js';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

import { MMKV } from 'react-native-mmkv';
import LanguageModal from '../../Components/Modal/LanguageModal.js';
import DeleteAccountModal from '../../Components/Modal/DeleteAccountModal.js';
const storage = new MMKV();

const MainScreen = ({route}) => {
  const navigation = useNavigation();
  let show_case = route.params?.show_case?route.params?.show_case:0;
  // let language_id = route.params?.id?route.params?.id:0;
  let language_id = storage.getString('language_id');


    const { extraData, languageModalVisible, setlanguageModalVisible, deleteAccountModalVisible, setdeleteAccountModalVisible } = useContext(GlobalContext);
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

    useFocusEffect(
      useCallback(() => {
        fetchData(); // when returning from details screen
        if(!language_id)
        {
          setlanguageModalVisible(true)
        }
      }, [])
    );
 
    const fetchData = async () => { 
        language_id = storage.getString('language_id');
        try {
          const response = await postData({show_case:show_case,language_id:language_id}, urls.category, "GET", navigation, extraData, 1);
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
      if (isLoading) {
        return (
          <PageLoding />          
        );
      }
      
      const handleChangePage = async (item) => { 
        if(item.sub_category_used){
          item.sub_category_used?navigation.navigate('SubCategory', {id:item.id,name:item.name,show_case:show_case,"category_type":1}):null;
        }else{
          item.post_used?navigation.navigate('Post', {id:item.id,name:item.name,show_case:show_case,"category_type":1}):null
        } 
      };
    
      const handleConfirmDeleteAccount = async () => {
        try { 
          const response = await postData({user_id:userDetail.id}, urls.deleteAccount, "POST", navigation, extraData);
          if(response.status==200)
          {
            
          }
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };
    
      const handleDeleteAccountPre = async () => { 
        setdeleteAccountModalVisible(true)
      };
 
  return (
    <>
      <ScrollView style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <TouchableOpacity activeOpacity={1}>

        <View style={styles.topBar}>
          <TopBarPrimary />
        </View>
        <View style={[styles.buttonTop, {marginBottom:8}]}>
          <GradiantButton
            title="Home"
            height="30"
            width="25%"
            gradientType="yellow"
            borderRadius={5}
            fontSize={15}
            onPress={() => navigation.navigate('Home')}
          />
          {userDetail?(
            <LogoutButton />
          ):null
          }
          
          <GradiantButton
            title="Back"
            height="30"
            width="25%"
            gradientType="purple"
            borderRadius={5}
            fontSize={15}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Home',  route.params); // 👈 yahan apne home screen ka route name likho
              }
            }}
          />        
        </View>
          
        <View style={[styles.buttonTop, {marginBottom:0}]}>
          <GradiantButton
            title="Change Language"
            height="30"
            width="40%"
            gradientType="green"
            borderRadius={5}
            fontSize={15}
            onPress={() => setlanguageModalVisible(true)}
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
          {/* <View style={styles.buttonWrapper}> */}

            <View style={[styles.row]}>
              {data.map((item) => (
                <View style={[styles.col6,styles.plr5,styles.mb15]} key={item.id}>
                  <GradiantButton
                      title={item.name}
                      title2={item?.name2}
                      count={item?.post_count}
                      height="45"
                      width="100%"
                      gradientType={item.post_used?'orange':'gray'}
                      borderRadius={5}
                      fontSize={Number(item?.font_size)}
                      fontWeight="500"
                      onPress={() => handleChangePage(item)}
                    />
                  </View>
              ))}
            </View>

            
          {/* </View> */}

        </View>
        </TouchableOpacity>

        

        <LanguageModal fetchDataList={fetchData} />
        <DeleteAccountModal handleDeleteAccount={handleConfirmDeleteAccount} />

      </ScrollView>
      {userDetail?(
          <>
          <View style={{
            position: 'static',
            bottom: 0,
            left:0,
            width: '100%',
            alignItems: 'center',
            paddingBottom: 5,
            backgroundColor:BACKGROUND_COLORS.primary,
            paddingHorizontal:10,
            paddingVertical:5
          }}>
            {/* First Row */}
            <View style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 5
            }}>
              <GradiantButton
                title="Edit Profile"
                height="35"
                width="33%"
                gradientType="green"
                borderRadius={5}
                fontSize={13}
                fontWeight="500"
                onPress={() => navigation.navigate('EditProfile')}
              />
              <GradiantButton
                title="Edit Username"
                height="35"
                width="33%"
                gradientType="green"
                borderRadius={5}
                fontSize={13}
                fontWeight="500"
                onPress={() => navigation.navigate('EditUsernamePassword')}
              />
              <GradiantButton
                title="Order History"
                height="35"
                width="33%"
                gradientType="green"
                borderRadius={5}
                fontSize={13}
                fontWeight="500"
                onPress={() => navigation.navigate('OrderHistory')}
              />
            </View>

            {/* Second Row */}
            <View style={{width: '40%'}}>
              <GradiantButton
                title="Delete Account"
                height="35"
                width="100%"
                gradientType="red"
                borderRadius={5}
                fontSize={13}
                fontWeight="500"
                onPress={() => handleDeleteAccountPre()}
              />
            </View>
          </View>
          </>
        ):null
        }
    </>
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
    justifyContent: 'space-evenly',
    marginBottom: 0,
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
