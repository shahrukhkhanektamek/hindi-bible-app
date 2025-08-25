/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState, useContext  } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import { Text } from '@react-navigation/elements';
import COLORS from '../../Constants/Colors.js';
import WebView from 'react-native-webview';

import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api'; 
const urls=apiUrl();

const PaymentGatewayScreen = ({route}) => {
  const navigation = useNavigation();
  const {payment_type, data, type} = route.params;

  const { extraData } = useContext(GlobalContext);
  const appSetting = extraData.appSetting;
  const userDetail = extraData.userDetail;
  const fetchAppSettingData = extraData.fetchAppSettingData;
  // console.log(appSetting.package.status)
  
 
  
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
        handleTransactionStatus();
      }, 3000);
    }
  };

  const stopInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };


    const handleTransactionStatus = async () => {
      
      const filedata = {
        "id":data.id,
      };
      const response = await postData(filedata, urls.transactionStatus,"GET", navigation,extraData,1,1);
      if(response.status==200)
      {
        if(type==1)
        {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Category' }], 
          });
        }
        else if(type==2)
        {          
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Post',
                params: JSON.parse(response.data.fileData), 
              },
            ],
          });
        }
        else if(type==3)
        {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
          });
        }
      }  
    };
     
    


  useEffect(() => {
    startInterval();
    return () => stopInterval(); // Clear on unmount
  }, []);
  




  return (
    <View style={styles.container}>
      <WebView
        style={styles.webviewVideo} 
        // javaScriptEnabled={true}
        // domStorageEnabled={true}
        source={{ uri: `${data.url}` }}
      />
      <View style={styles.buttonContainer}>
      </View>
    </View>
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
  },
  buttonContainer: {
    rowGap: 40,
  },
  textContainer: {
    marginVertical: 30,
  },
  webviewVideo: {
    // height: (Dimensions.get('window').width * 9) / 16,
    height:500,
    width: '100%',
    margin:'auto'
  }, 
});

export default PaymentGatewayScreen;
