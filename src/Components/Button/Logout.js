import React, { useContext  } from 'react';
import { View, StyleSheet } from 'react-native';
import GradientButton from '../../Components/Button/GradientButton';
import COLORS from '../../Constants/Colors.js';
import { useNavigation } from '@react-navigation/native';


import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();


const Logout = () => {

    const navigation = useNavigation(); 
    
      const { extraData } = useContext(GlobalContext);
      const appSetting = extraData.appSetting;
      const userDetail = extraData.userDetail;


        const handleLogout = async () => { 
            const response = await postData([], urls.logout,"GET", navigation,extraData);
        };

    
  return (
    <View>
        <View style={styles.button}>
            <GradientButton
              title="Logout"
              height="50"
              width="50%"
              gradientType="blue"
              color={COLORS.white}
              borderRadius={5}
              fontSize={15}
              fontWeight="500"
              onPress={handleLogout}
            />
        </View>
    </View>  
  );
};


const styles = StyleSheet.create({
  
  button: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  
});


export default Logout;
