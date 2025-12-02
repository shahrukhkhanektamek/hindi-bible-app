// TimeOutChecker.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, AppState } from "react-native";
import { GlobalContext } from './GlobalContext';

import { useNavigation } from '@react-navigation/native';

import { MMKV } from 'react-native-mmkv'; 
const storage = new MMKV();

const TimeOutChecker = () => {
  const navigation = useNavigation();
  const alertShown = useRef(false);
  const appState = useRef(AppState.currentState);
  const { extraData, isMediaPlaying } = useContext(GlobalContext);   // ⬅️ ADDED
  const appSetting = extraData?.appSetting || {};
  const timeoutRef = useRef(null);
  const userDetail = extraData.userDetail;


  const timeoutSeconds = appSetting.payment_detail?.logout_time*60 || 300000*60;
  

  // 🔹 Function to call on inactivity
  const onInactivity = () => {
    console.log(`⚠️ ${timeoutSeconds} seconds inactivity detected!`);
    if(userDetail)
    {
      extraData.setuserDetail(null);
      extraData.setToken(null);
      storage.delete('token');
      storage.delete('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }], 
      });
    }
    // 👉 Yahan apna function likho (logout, navigate, API call etc.)
  };

  // 🔹 Reset timer
  const resetTimer = () => {
    // ⬅️ Skip if media is playing
    if (isMediaPlaying) {
      console.log("🎬 Media playing → Timer paused");
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    storage.set("lastActiveTime", Date.now().toString());

    timeoutRef.current = setTimeout(onInactivity, timeoutSeconds * 1000);
  };

  // 🔹 Check last active time when app resumes
  const checkLastActiveTime = () => {
    // ⬅️ Skip if media is playing
    if (isMediaPlaying) {
      console.log("🎧 App resumed BUT media playing → skipped timeout check");
      return;
    }

    const lastTime = storage.getString("lastActiveTime");
    if (lastTime) {
      const diff = (Date.now() - parseInt(lastTime, 10)) / 1000;
      console.log("⏱ Last inactive seconds:", diff);

      if (diff >= timeoutSeconds) {
        onInactivity();
      }
    }
    resetTimer();
  };

  useEffect(() => {
    resetTimer(); // initial timer

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkLastActiveTime();
      } else {
        resetTimer();
      }
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      subscription.remove();
    };
  }, [timeoutSeconds, isMediaPlaying]); // ⬅️ media playing state observed

  return <View />;
};

export default TimeOutChecker;
