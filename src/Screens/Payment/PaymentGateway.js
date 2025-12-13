/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
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

  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const [successModal, setSuccessModal] = useState(false);

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

  const handleNavigationAfterSuccess = (response) => {
    setTimeout(() => {
      setSuccessModal(false);

      if(type==1)
      {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Category' }],
        });
      }
      else if(type==2)
      {          
        // navigation.reset({
        //   index: 0,
        //   routes: [{
        //     name: 'Post',
        //     params: JSON.parse(response.data.fileData), 
        //   }],
        // });
        // navigation.push('Post', JSON.parse(response.data.fileData));
        navigation.pop(2);
      }
      else if(type==3)
      {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'ContributionPaymentSuccess',
            params: response.data, 
          }],
        });
      }

    }, 4000); // modal 2 sec tak dikhega
  };

  const handleTransactionStatus = async () => {
    const filedata = {
      "id":data.id,
    };

    const response = await postData(filedata, urls.transactionStatus,"GET", navigation,extraData,1,1);

    if(response.status==200)
    {
      stopInterval();          // interval clear
      setSuccessModal(true);   // success modal show
      
      // Navigation delay se chalega
      handleNavigationAfterSuccess(response);
    }
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, []);


  return (
    <View style={styles.container}>
      <WebView
        style={styles.webviewVideo}
        source={{ uri: `${data.url}` }}
        nestedScrollEnabled={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* SUCCESS MODAL */}
      <Modal
        visible={successModal}
        transparent={true}
        animationType="fade"
      >
        <View style={{
          flex:1,
          backgroundColor:'rgba(0,0,0,0.6)',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <View style={{
            width:250,
            padding:25,
            backgroundColor:'#fff',
            borderRadius:15,
            alignItems:'center'
          }}>
            <Text style={{fontSize:20, fontWeight:'bold', color:"green", marginBottom:10}}>
              Payment Success 🎉
            </Text>
            <Text style={{textAlign:'center', color:"#333"}}>
              Please wait, redirecting...
            </Text>

            <ActivityIndicator size="large" color="green" style={{marginTop:15}} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  webviewVideo: {
    height:500,
    width: '100%',
    margin:'auto'
  }, 
});

export default PaymentGatewayScreen;
