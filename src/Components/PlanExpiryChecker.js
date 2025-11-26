// PlanExpiryChecker.js
import React, { useContext, useEffect, useRef } from "react";
import { Alert, View, AppState } from "react-native";
import { GlobalContext } from './GlobalContext';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV(); 

const PlanExpiryChecker = ({ checkInterval = 10000 }) => {

    const navigation = useNavigation();

  const alertShown = useRef(false); // alert sirf ek baar
  const appState = useRef(AppState.currentState);

  const { extraData } = useContext(GlobalContext);
  const appSetting = extraData?.appSetting || {};
  

  useEffect(() => {
    const interval = setInterval(() => {
       
      checkExpiry();
    }, checkInterval);

    return () => clearInterval(interval); // cleanup
  }, [appSetting, checkInterval]);

  useEffect(() => {
    
      
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        checkExpiry();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [appSetting]);

  const parseDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return 0;
    const dt = dateTimeStr.split(/[- :]/);
    return new Date(
      parseInt(dt[0]),      // year
      parseInt(dt[1]) - 1,  // month
      parseInt(dt[2]),      // day
      parseInt(dt[3]),      // hour
      parseInt(dt[4]),      // minute
      parseInt(dt[5])       // second
    ).getTime();
  };

  const checkExpiry = () => {
  
    if (alertShown.current) return;
    const currentTime = Date.now(); 

    const freeTrialEndTime = parseDateTime(appSetting?.free_trial_end_date_time);
    const packageEndTime = parseDateTime(appSetting?.package?.package?.end_date_time);
    // const packageEndTime = parseDateTime('2025-11-25 18:09:00');
    

    const packageStatus = appSetting?.package?.status; // 1 = active, 0 = inactive
    const freeTrialStatus = appSetting?.free_trial;    // 1 = active, 0 = inactive

    if (freeTrialStatus === 1 && currentTime >= freeTrialEndTime) {
      alertShown.current = true;
    //   Alert.alert("Free Trial Expired", "Aapka free trial expire ho gaya hai!");
        
        extraData.setuserDetail(null);
        extraData.setToken(null);
        storage.delete('token');
        storage.delete('user');
        navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }], 
        });

    } else if (packageStatus === 1 && currentTime >= packageEndTime) {
      alertShown.current = true;
    //   Alert.alert("Plan Expired", "Aapka plan expire ho gaya hai! Dobara le sakte hain.");
        // navigation.navigate('SelectCountryScreen', {type:1});

        extraData.setuserDetail(null);
        extraData.setToken(null);
        storage.delete('token');
        storage.delete('user');
        navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }], 
        });
    }
  };

  return <View />; // khali UI, sirf side-effect ke liye
};

export default PlanExpiryChecker;
