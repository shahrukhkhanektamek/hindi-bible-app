import React, { createContext, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import AlertMessage from './AlertMessage'; 
import Loader from './Loader'; 

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
   
  
  const alert = { showAlert, setShowAlert, alertMessage, setAlertMessage, alertType, setAlertType };
  const sidebar = { showSideBar, setSideBar };
  const loader = { showLoader, setShowLoader }; 
  
  
  
  
  
  const fetchAppSettingData = async () => { 
    try {
      const response = await postData({}, urls.appSetting, "GET", navigation, extraData);
      setappSetting(JSON.parse(storage.getString('appSetting')));
      if(storage.getString('user')) setuserDetail(JSON.parse(storage.getString('user'))); 
      if(storage.getString('toekn')) setToken(JSON.parse(storage.getString('token'))); 
      setisLoading(false)
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const extraData = {alert, sidebar, loader, appSetting, userDetail, setuserDetail, token, setToken, fetchAppSettingData};
  
  useEffect(() => {
    fetchAppSettingData();
  }, []);
  
  if(isLoading)
  {
    return ( 
      <View flex={1}> 
        
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