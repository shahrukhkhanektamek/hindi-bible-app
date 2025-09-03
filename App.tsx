import React, { useEffect, useRef, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/Components/NavigationService';
import StackNavigation from './src/Navigation/StactNavigation.js';
import { GlobalProvider } from './src/Components/GlobalContext';
import { AppState, TouchableWithoutFeedback, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';

import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './src/Components/GlobalContext';
import { postData, apiUrl } from './src/Components/api';
const urls=apiUrl();

// ✅ MMKV instance
const storage = new MMKV();

const App = () => {
  const timeoutRef = useRef(null);
  const [timeoutSeconds, setTimeoutSeconds] = useState(20); // default 5 sec

  
  // const navigation = useNavigation(); 
      
        // const { extraData } = useContext(GlobalContext);
        // const appSetting = extraData.appSetting; 
        // const userDetail = extraData.userDetail;
  


  // Inactivity function
  const onInactivity = () => {
    console.log(`⚠️ ${timeoutSeconds} seconds inactivity detected!`);
    // 👉 Yahan apna function likho (logout, navigate, API call etc.)
    // Example: navigationRef.current?.navigate("Login");
  };

  // Timer reset karna + lastActiveTime save karna
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Abhi ka time save karo
    storage.set("lastActiveTime", Date.now().toString());

    // Timer start
    timeoutRef.current = setTimeout(onInactivity, timeoutSeconds * 1000);
  };

  // API call se timeout lena
  const fetchTimeoutFromAPI = async () => {
    try { 
      
      // const response = await postData([], urls.logout,"GET", navigation,extraData);
      // if(response.status==200)
      // {
      //   setTimeoutSeconds(response.data?.timeout);
      // }
             

    } catch (error) {
      console.error("Failed to fetch timeout:", error);
    }
  };

  // App resume hone par lastActiveTime check karna
  const checkLastActiveTime = () => {
    const lastTime = storage.getString("lastActiveTime");
    if (lastTime) {
      const diff = (Date.now() - parseInt(lastTime, 10)) / 1000; // seconds me
      console.log("⏱ Last inactive seconds:", diff);

      if (diff >= timeoutSeconds) {
        onInactivity();
      }
    }
    resetTimer(); // phir se timer chalu karo
  };

  useEffect(() => {
    // fetchTimeoutFromAPI(); // API se timeout value lelo

    resetTimer(); // initial timer

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkLastActiveTime();
      } else {
        resetTimer(); // background jane se pehle last time save ho jaye
      }
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      subscription.remove();
    };
  }, [timeoutSeconds]);

  return (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <View style={{ flex: 1 }}>
        <NavigationContainer ref={navigationRef}>
          <GlobalProvider>
            <StackNavigation />
          </GlobalProvider>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;
