import PrivacySnapshot from 'react-native-privacy-snapshot';
import RNExitApp from 'react-native-exit-app';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

import { navigationRef } from './src/Components/NavigationService';
import StackNavigation from './src/Navigation/StactNavigation.js'; 
import { GlobalProvider } from './src/Components/GlobalContext';
import { Alert, AppState, KeyboardAvoidingView, Keyboard, PermissionsAndroid, Platform, StatusBar, TouchableWithoutFeedback, View, ScrollView, Dimensions } from 'react-native';

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
import PlanExpiryChecker from './src/Components/PlanExpiryChecker.js';
import TimeOutChecker from './src/Components/TimeOutChecker.js';

const urls = apiUrl();

// ✅ MMKV instance
const storage = new MMKV();

const App = () => { 
  const [canGoBack, setCanGoBack] = useState(false);
  const [deviceId, setdeviceId] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({ 
    title: '', 
    body: '', 
    image: null 
  });

  // ✅ Screen rotation states
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [isPortrait, setIsPortrait] = useState(true);
  
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  const messagingUnsubscribeRef = useRef(null);
  const appStateSubscriptionRef = useRef(null);
  const dimensionsSubscriptionRef = useRef(null);
  
  // ✅ Fix: Screen rotation handling with cleanup
  useEffect(() => {
    const updateDimensions = ({ window }) => {
      setScreenHeight(window.height);
      setScreenWidth(window.width);
      setIsPortrait(window.height >= window.width);
    };

    // Initial dimensions
    updateDimensions({ window: Dimensions.get('window') });

    // Subscribe to dimension changes
    dimensionsSubscriptionRef.current = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      if (dimensionsSubscriptionRef.current) {
        dimensionsSubscriptionRef.current.remove();
      }
    };
  }, []);

  // ✅ Fix: Dynamic keyboard offset calculation - Samsung S21 FE के लिए optimize
  const getKeyboardVerticalOffset = () => {
    if (Platform.OS === 'ios') {
      if (isPortrait) {
        // S21 FE की screen height के according adjust करें
        if (screenHeight > 800) {
          return 90; // Tall screens
        } else {
          return 70; // Normal screens
        }
      } else {
        // Landscape में keyboard height कम होती है
        return 30;
      }
    }
    // Android के लिए 0 return करें क्योंकि behavior="height" use कर रहे हैं
    return 0;
  };

  // ✅ Fix: Keyboard handling with proper cleanup
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardVisible(true);
        // Samsung devices के लिए थोड़ा extra padding
        const extraPadding = Platform.OS === 'android' ? 15 : 0;
        setKeyboardHeight(event.endCoordinates.height + extraPadding);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // ✅ Fix: FCM Notification handling with proper error handling
  useEffect(() => {
    let isMounted = true;
    let messageListener = null;

    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          if (Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            console.log('Notification permission result:', granted);
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          }
          return true;
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    };

    const requestUserPermission = async () => {
      try {
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
          return true;
        } else {
          console.log('Notification permission not granted');
          return false;
        }
      } catch (error) {
        console.error('Error in requestUserPermission:', error);
        return false;
      }
    };

    const initializeMessaging = async () => {
      try {
        // Check if Firebase is available
        if (!firebase.apps || firebase.apps.length === 0) {
          console.log('Firebase not initialized yet');
          return null;
        }

        // Get FCM token
        const token = await messaging().getToken();
        console.log('FCM Token obtained');
        storage.set('firebaseToken', token);

        // Subscribe to topic with error handling
        try {
          await messaging().subscribeToTopic('allnoti2');
          console.log('Subscribed to topic: allnoti2');
        } catch (topicError) {
          console.error('Error subscribing to topic:', topicError);
        }

        // Set up message listener
        messageListener = messaging().onMessage(async (remoteMessage) => {
          if (!isMounted) return;
          
          console.log('Foreground message received');
          
          // ✅ Fix: यहाँ duplicate listener नहीं बनाएं
          setNotificationData({
            title: remoteMessage.notification?.title || 'Notification',
            body: remoteMessage.notification?.body || '',
            image: remoteMessage.notification?.android?.imageUrl || null,
          });
          
          // Small delay to ensure state is updated
          setTimeout(() => {
            if (isMounted) {
              setModalVisible(true);
            }
          }, 100);
        });

        // Handle background/quit state messages
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('Background message received:', remoteMessage);
        });

        return messageListener;
      } catch (error) {
        console.error('Error initializing messaging:', error);
        return null;
      }
    };

    const setupNotifications = async () => {
      try {
        await requestNotificationPermission();
        await requestUserPermission();
        const listener = await initializeMessaging();
        if (listener) {
          messagingUnsubscribeRef.current = listener;
        }
      } catch (error) {
        console.error('Error in notification setup:', error);
      }
    };

    // Start notification setup
    setupNotifications();

    return () => {
      isMounted = false;
      
      // Clean up messaging listener
      if (messagingUnsubscribeRef.current) {
        messagingUnsubscribeRef.current();
        messagingUnsubscribeRef.current = null;
      }
      
      if (messageListener) {
        messageListener();
      }
    };
  }, []);

  // ✅ Fix: Device ID with error handling
  const getDeviceId = async () => {
    try {
      const deviceIdTemp = await DeviceInfo.getUniqueId();
      setdeviceId(deviceIdTemp);
      console.log('Device ID obtained');
    } catch (error) {
      console.error('Error getting device ID:', error);
      setdeviceId('unknown');
    }
  };

  useEffect(() => {
    getDeviceId();
  }, []);

  // ✅ Fix: PrivacySnapshot with proper cleanup
  useEffect(() => {
    if (Platform.OS === 'ios' && PrivacySnapshot) {
      try {
        PrivacySnapshot.enabled(true);

        const subscription = AppState.addEventListener('change', (state) => {
          if (state === 'background') {
            PrivacySnapshot.enabled(true);
          } else if (state === 'active') {
            PrivacySnapshot.enabled(false);
          }
        });

        appStateSubscriptionRef.current = subscription;

        return () => {
          if (appStateSubscriptionRef.current) {
            appStateSubscriptionRef.current.remove();
            appStateSubscriptionRef.current = null;
          }
        };
      } catch (error) {
        console.error('Error setting up PrivacySnapshot:', error);
      }
    }
  }, []);

  // ✅ Fix: App state handling for screen lock (optional - comment if causing issues)
  // useEffect(() => {
  //   const appState = React.useRef(AppState.currentState);
    
  //   const subscription = AppState.addEventListener("change", nextAppState => {
  //     console.log('AppState changed:', nextAppState);
      
  //     // Only exit if needed
  //     if (
  //       appState.current.match(/active/) &&
  //       nextAppState === "background"
  //     ) {
  //       // Optional: Add delay or check before exiting
  //       // RNExitApp.exitApp();
  //     }

  //     appState.current = nextAppState;
  //   });

  //   return () => subscription.remove();
  // }, []);

  // ✅ Fix: Handle modal close properly
  const handleModalClose = () => {
    setModalVisible(false);
    // Reset notification data after a delay
    setTimeout(() => {
      setNotificationData({ title: '', body: '', image: null });
    }, 300);
  };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <StatusBar 
            barStyle="dark-content" 
            backgroundColor={BACKGROUND_COLORS.primary}
          />

          <NavigationContainer ref={navigationRef}>
            <GlobalProvider>
              {/* ✅ Fix: ScrollView को conditional padding दें */}
              <ScrollView 
                style={{
                  flex: 1,
                  backgroundColor: BACKGROUND_COLORS.primary,
                  // Only add padding when keyboard is visible on Android
                  paddingBottom: Platform.OS === 'android' && isKeyboardVisible ? keyboardHeight : 0
                }}
                contentContainerStyle={{ 
                  flexGrow: 1,
                  // iOS के लिए contentContainerStyle में padding दें
                  paddingBottom: Platform.OS === 'ios' && isKeyboardVisible ? keyboardHeight : 0
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {/* ✅ Fix: KeyboardAvoidingView को key prop दें ताकि orientation change पर re-render हो */}
                <KeyboardAvoidingView
                  key={`kav-${isPortrait ? 'portrait' : 'landscape'}`}
                  style={{ flex: 1 }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  keyboardVerticalOffset={getKeyboardVerticalOffset()}
                  enabled={true}
                > 
                  <StackNavigation />
                </KeyboardAvoidingView>
              </ScrollView>

              {/* ✅ Fix: NotificationModal को proper props दें */}
              <NotificationModal
                modalVisible={modalVisible} 
                setModalVisible={handleModalClose} // Use custom handler
                notificationData={notificationData}
              />
              
              {/* ✅ Other components - ensure they don't cause re-render issues */}
              <SocketJs/>
              <PlanExpiryChecker />
              <TimeOutChecker />
            </GlobalProvider>
          </NavigationContainer>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
};
 
export default App;