import React, { createContext, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import AlertMessage from './AlertMessage'; 
import Loader from './Loader'; 

import { SplashScreen } from '../Screens/SplashScreen';

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();
 
   
import { postData, apiUrl } from './api';
import { View, ImageBackground, StyleSheet } from 'react-native';
const urls=apiUrl();
    

export const GlobalContext = createContext();  

export const GlobalProvider = ({ children }) => { 

  const navigation = useNavigation(); 
  
  const [appSetting, setappSetting] = useState([]); 
  const [userDetail, setuserDetail] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(true);

 
  
   
 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [showSideBar, setSideBar] = useState(false);
  const [paymentDetail, setpaymentDetail] = useState([]);
   
  
  const alert = { showAlert, setShowAlert, alertMessage, setAlertMessage, alertType, setAlertType };
  const sidebar = { showSideBar, setSideBar };
  const loader = { showLoader, setShowLoader }; 
  
  
  
  
  
  const fetchAppSettingData = async () => { 
    try {
      const response = await postData({}, urls.appSetting, "GET", navigation, extraData);

 
      if(response.status==200)
      {
        setappSetting(JSON.parse(storage.getString('appSetting')));
        if(storage.getString('user')) setuserDetail(JSON.parse(storage.getString('user'))); 
        if(storage.getString('toekn')) setToken(JSON.parse(storage.getString('token'))); 
        // setpaymentList(response.payment_setting);
        
        const paymentList = response.data.payment_setting;
        

        // Step 1: parse data JSON safely
        const parsedList = paymentList.map(item => ({
            ...item,
            data: (() => {
              try {
                return JSON.parse(item.data);
              } catch (e) {
                return item.data;
              }
            })()
          }));
        
          // Step 2: convert into object using `name` as key
          const paymentByName = parsedList.reduce((acc, item) => {
            acc[item.name] = item;
            return acc;
          }, {});

          setpaymentDetail(paymentByName);
      }
      


      setisLoading(false)
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };


  
    




  const extraData = {alert, sidebar, loader, appSetting, userDetail, setuserDetail, token, setToken, fetchAppSettingData, setappSetting, paymentDetail};
  
  useEffect(() => {
    fetchAppSettingData();
  }, []);
  
  if(isLoading)
  {
    return ( 
      <View flex={1}> 
        <SplashScreen />
      </View>
    ); 
  }
  else{
    
  }
    
    

  return ( 
    <GlobalContext.Provider value={{extraData:extraData}}>
      {children}
      <Loader extraData={extraData} />
      <AlertMessage extraData={extraData} />
    </GlobalContext.Provider>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain'
  },
  content: {
    flex: 1,
    // other content styles
  },
});