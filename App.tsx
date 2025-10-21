import PrivacySnapshot from 'react-native-privacy-snapshot';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

import { navigationRef } from './src/Components/NavigationService';
import StackNavigation from './src/Navigation/StactNavigation.js';
import { GlobalProvider } from './src/Components/GlobalContext';
import { Alert, AppState, KeyboardAvoidingView, Keyboard, PermissionsAndroid, Platform, StatusBar, TouchableWithoutFeedback, View, ScrollView } from 'react-native';


import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'; 
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

 
import NotificationModal from './src/Components/Modal/NotificationModal';




 

import { MMKV } from 'react-native-mmkv';

import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './src/Components/GlobalContext';
import { postData, apiUrl } from './src/Components/api';
import BACKGROUND_COLORS from './src/Constants/BackGroundColors.js';
import SocketJs from './src/Components/Socket/SocketJs.js';

const urls=apiUrl();

// ✅ MMKV instance
const storage = new MMKV();

const App = () => { 

  

  const timeoutRef = useRef(null); 
  const [timeoutSeconds, setTimeoutSeconds] = useState(20); // default 5 sec
  const [canGoBack, setCanGoBack] = useState(false);
  const [deviceId, setdeviceId] = useState();

  const [modalVisible, setModalVisible] = useState(false);
   const [notificationData, setNotificationData] = useState({ title: '', body: '' });
   


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

  



  useEffect(() => {
  // const requestNotificationPermission = async () => {
  //   try {
  //     if (Platform.OS === 'android' && Platform.Version >= 33) {
  //       const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  //       if (result === RESULTS.GRANTED) {
  //         console.log('Notification permission granted');
  //       } else if (result === RESULTS.DENIED) {
  //         Alert.alert(
  //           'Notification Permission',
  //           'Notification permissions are required for the app to function properly. Please allow them in your settings.',
  //         );
  //       } else if (result === RESULTS.BLOCKED) {
  //         Alert.alert(
  //           'Notification Permission',
  //           'Permission is permanently denied. Please enable it manually in Settings > App Info > Notifications.',
  //         ); 
  //       }
  //     } else {
  //       console.log('Notification permission not required for this Android version.');
  //     }
  //   } catch (error) {
  //     console.error('Error requesting notification permission:', error);
  //   }
  // };


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });
  
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Notification permission granted:', authStatus);
    } else {
      Alert.alert("Permission Denied", "You won't receive notifications.");
    }
  }


  async function requestNotificationPermission() {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) { // Android 13+
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // Android 12 aur niche ke liye direct allowed
    }
  }
  

  const initializeMessaging = async () => {
    try {
      const token = await messaging().getToken();
      // console.log('FCM Token:', token);
      storage.set('firebaseToken', token);

      // Alert.alert(token);

      await messaging().subscribeToTopic('allnoti2');
      // console.log('Subscribed to topic: allnoti2');

      const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          remoteMessage.notification?.title || 'Notification',
          remoteMessage.notification?.body || 'You have a new message.',
        );
        
        console.log(remoteMessage)
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            setNotificationData({
              title: remoteMessage.notification?.title || 'Notification',
              body: remoteMessage.notification?.body || '',
              image: remoteMessage.notification?.android.imageUrl || null, // new line
            });
            setModalVisible(true);
        });


      }); 
 
      return unsubscribeOnMessage;
    } catch (error) {
      console.error('Error initializing messaging:', error);
    }
  }; 
 
  requestNotificationPermission();
  requestUserPermission();
  const unsubscribeMessaging = initializeMessaging();

  return () => {
    if (unsubscribeMessaging) {
      unsubscribeMessaging.then(unsubscribe => unsubscribe && unsubscribe());
    }
  };
}, []);


const [isKeyboardVisible, setKeyboardVisible] = useState(false);
const [keyboardHeight, setKeyboardHeight] = useState(0);

const intervalRef = useRef(null);

useEffect(() => {
  const showSub = Keyboard.addListener('keyboardDidShow', (event) => {
    setKeyboardVisible(true);
    console.log("🟢 Keyboard is open");
    
    // 🔹 Start interval only when keyboard is visible
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        // ⚡ Re-measure the height using current keyboard frame
        Keyboard.dismiss; // optional, just to trigger layout recalculation
        // Note: React Native does not provide direct API to get updated height,
        // so we use the last known height + setKeyboardHeight again to trigger re-render
        setKeyboardHeight(prev => prev); 
        setKeyboardHeight(event.endCoordinates.height+10);
        console.log(event);
      }, 200);
    }
  });

  const hideSub = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardVisible(false);
    setKeyboardHeight(0);
    console.log("🔴 Keyboard is closed");

    // 🔹 Stop interval when keyboard is hidden
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  });

  return () => {
    showSub.remove();
    hideSub.remove();
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);

 
  
 


  
const getDeviceId = async () => { const deviceIdTemp = await DeviceInfo.getUniqueId(); setdeviceId(deviceIdTemp); }
useEffect(() => {
  getDeviceId()
}, []);




useEffect(() => {
  if (Platform.OS === 'ios' && PrivacySnapshot) {
    // Enable snapshot protection
    PrivacySnapshot.enabled(true);

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'background') {
        PrivacySnapshot.enabled(true);  // hide preview in app switcher
      } else {
        PrivacySnapshot.enabled(false);
      }
    });

    return () => subscription.remove();
  }
}, []);



 
  return (
    <SafeAreaProvider>
      
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{ flex: 1, }} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <NavigationContainer ref={navigationRef}>
              <GlobalProvider>
                {/* ScrollView wraps your navigation to handle keyboard for forms/screens */}
                <ScrollView style={{flex:1,paddingBottom:keyboardHeight,backgroundColor:BACKGROUND_COLORS.primary}}
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled" 
                >
                  <StackNavigation />
                </ScrollView>

              <NotificationModal
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible}
                notificationData={notificationData}
                />
                <SocketJs/>
              </GlobalProvider>
              </NavigationContainer>
            
          </SafeAreaView>
        </TouchableWithoutFeedback>
       
    </SafeAreaProvider>
  );
};

export default App;
