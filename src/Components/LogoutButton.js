import React, { useState, useEffect, useCallback, useContext } from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import GradiantButton from '../Components/Button/GradientButton';
import { useNavigation } from '@react-navigation/native';

import { GlobalContext } from '../Components/GlobalContext';
import { postData, apiUrl } from '../Components/api';
const urls=apiUrl();
 
const LogoutButton = () => {
    const navigation = useNavigation();
    const { extraData } = useContext(GlobalContext);
    const appSetting = extraData.appSetting; 
    const userDetail = extraData.userDetail;  

    const handleLogout = async () => { 
        try {
          const response = await postData({}, urls.logout, "GET", navigation, extraData);
          if(response.status==200)
          {
          }
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };

  return (
    <GradiantButton
          title="Log Out"
          height="30"
          width="25%"
          gradientType="red"
          borderRadius={5}
          fontSize={15}
          onPress={handleLogout}
        />
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
  },
  text: {
    textAlign: 'center',
  },
});

export default LogoutButton;
