import {
  Alert
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import { MMKV } from 'react-native-mmkv';
import metadata from "libphonenumber-js/metadata.full.json";
import { parsePhoneNumberFromString, getExampleNumber, getCountryCallingCode  } from "libphonenumber-js";

import { reset } from './NavigationService';

const storage = new MMKV(); 
   
     
// export const socketUrl = 'http://192.168.1.61:3003';
export const socketUrl = 'http://192.168.1.17:3003';
export const apiUrl = () => {   
  // const apiUrl = 'http://192.168.1.61/projects/codediffusion/hindibible/api/'; 
  // const apiUrl = 'https://developershahrukh.in/demo/codediffusion/hindibible/api/'; 
  // const apiUrl = 'https://digitalnamo.com/azmal/2025/april/hindibible/api/'; 
  const apiUrl = 'http://192.168.1.17/projects/hindibible/api/'; 

      
  const commurl = apiUrl;    
  const mainUrl = apiUrl+'user/';   
   
   
  return {
    "login":`${mainUrl}login`,
    "registerOtpSend":`${mainUrl}register-otp-send`, 
    "register":`${mainUrl}register`,
    "updateProfile":`${mainUrl}update-profile`,
    "updateProfilePhoto":`${mainUrl}update-profile-photo`, 
    "updatePassword":`${mainUrl}update-password`,
    "getProfile":`${mainUrl}get-profile`,
    "logout":`${mainUrl}logout`,  
    "sendOtp":`${mainUrl}send-otp`,
    "submitOtp":`${mainUrl}submit-otp`,
    "sendPassword":`${mainUrl}send-password`,
    "createPassword":`${mainUrl}create-password`,
    "proceedLogin":`${mainUrl}proceed-login`,
    
    "country":`${commurl}country`,
    "package":`${commurl}package`,
    "state":`${commurl}state`,
    "appVisit":`${commurl}app-visit`,
    "appLike":`${commurl}app-like`,

    "category":`${mainUrl}category`,
    "subCategory":`${mainUrl}sub-category`,
    "subSubCategory":`${mainUrl}sub-sub-category`, 
    "subSubSubCategory":`${mainUrl}sub-sub-sub-category`, 
    "postList":`${mainUrl}post/list`, 
    "postView":`${mainUrl}post/view`, 
    "postLike":`${mainUrl}post/like`, 
    "postDetail":`${mainUrl}post/detail`,
    "getDownloadUrl":`${mainUrl}post/get-download-url`,

    "NewsList":`${mainUrl}news/list`,
    "packageHistory":`${mainUrl}package-history`,

    "appSetting":`${commurl}app-setting`,
    "contactInquiry":`${commurl}contact-inquiry`,


    "homeDetail":`${mainUrl}home-detail`,
    "createTransaction":`${mainUrl}create-transaction`,
    "transactionStatus":`${mainUrl}check-transaction-status`,
    "getLastTransaction":`${mainUrl}get-last-transaction`,
    

  };
};


 
export const postData = async (filedata, url, method, navigation, extraData, loaderShowHide=null, messageAlert=null) => {

  

  // console.log('navigation')
  // return false;
  const deviceId = await DeviceInfo.getUniqueId();
  const deviceInfo = JSON.stringify({
    deviceId: DeviceInfo.getDeviceId(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(), 
    buildNumber: DeviceInfo.getBuildNumber(),
    bundleId: DeviceInfo.getBundleId(),
    appVersion: DeviceInfo.getVersion(),   
    readableVersion: DeviceInfo.getReadableVersion(),
    deviceName: await DeviceInfo.getDeviceName(),
    uniqueId: deviceId,
    manufacturer: await DeviceInfo.getManufacturer(),
    ipAddress: await DeviceInfo.getIpAddress(),
    batteryLevel: await DeviceInfo.getBatteryLevel(), 
    isEmulator: await DeviceInfo.isEmulator(),  
    isTablet: DeviceInfo.isTablet(),
 
  });
  let data = '';
  if(method=='POST')  data = JSON.stringify(Object.assign(filedata, { device_id: deviceId,device_detail:deviceInfo}));
  if(method=='GET') data = '';


  if (method === 'GET' && filedata) {
    const params = new URLSearchParams({ ...filedata, device_id: deviceId,device_detail:deviceInfo }).toString();
    url += `?${params}`; // Append query parameters
  }

  if(!loaderShowHide) extraData.loader.setShowLoader(true);
  
  
  try { 
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization":storage.getString('token')?"Bearer "+storage.getString('token'):'',
      },
      body: data, // Convert data to JSON string
    });    
    return await responseCheck(response, navigation, extraData, messageAlert);   
  } catch (error) {
    extraData.loader.setShowLoader(false);
    console.error("Failed to make POST request:", error);
    return error;
  }  
};

const responseCheck = async (response, navigation, extraData, messageAlert) => {
  try {

    let result = [];
    if(response.status==200 || response.status==400 || response.status==401) 
    {
      result = await response.json();      
    }  
    else{ 
      result = response; 
    }
    console.log("Response:", result); 
    extraData.loader.setShowLoader(false);
    





    if (result.status === 200) {
      switch (result.action) {
        case "add":
          showSuccessMessage(result.message, extraData, 1, messageAlert);
          return result;
  
        case "login":
          showSuccessMessage(result.message, extraData, 1, messageAlert);
          storeLoginToken(result);
          extraData.setuserDetail(JSON.stringify(result?.data));
          extraData.setToken(result?.token);
          if(result.data.free_trial==1)
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' },{ name: 'Category' }], 
            });
            return result;
          }
          if(result.package.status==0 || result.package.status==2)
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' },{ name: 'SelectCountryScreen' }], 
            });
            return result;
          }
          else
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' },{ name: 'Category' }], 
            });
            return result;
          }

          

          case "tokenUpdate":
          showSuccessMessage(result.message, extraData, 1, messageAlert);
          storeLoginToken(result);
          extraData.setuserDetail(JSON.stringify(result?.data));
          extraData.setToken(result?.token);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Category' }], 
          }); 
          return result;

          case "appSetting":
          appSettingStore(result);
          if(result.data.is_login==0)
          {
            extraData.setuserDetail(null);
            extraData.setToken(null);
            storage.delete('token');
            storage.delete('user');
          }

          return result;

          
          case "register":
          showSuccessMessage(result.message, extraData, 1, messageAlert);
          storeLoginToken(result);
          extraData.setuserDetail(JSON.stringify(result?.data));
          extraData.setToken(result?.token);
          

          if(result.data.free_trial==1)
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' },{ name: 'Category' }], 
            });
            return result;
          }
          if(result.package.status==0 || result.package.status==2)
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' },{ name: 'SelectCountryScreen' }], 
            });
            return result;
          }
          else
          {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' },{ name: 'Category' }], 
            });
            return result;
          }

          
          case "logout":
          showSuccessMessage(result.message, extraData, 1, messageAlert);
          extraData.setuserDetail(null);
          extraData.setToken(null);
          storage.delete('token');
          storage.delete('user');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
          });
          return result;



          return result;

   
        case "return": 
          return result; 
  
        case "detail":  
          return result;  
 
        case "list":
          return result;
  
        default:
          showSuccessMessage(result.message, extraData, 1, messageAlert);
          return result;
      }
    } 
    else { 
      if (result.responseJSON) result = result.responseJSON;
  
      if (result.status === 400) {
        if (result.action === "login") {
          showSuccessMessage(result.message, extraData, 0, messageAlert);
          // storeLoginToken('');
        } else if (result.action === "edit" || result.action === "add") {
          showSuccessMessage(result.message, extraData, 0, messageAlert);
        } else if (result.action === "check_login") {
          return result;
        }else if (result.action === "noalert") {
          return result;
        } else {
          showSuccessMessage(result.message, extraData, 0, messageAlert);
        }
      } 
      else if (result.status === 401) {
          // showSuccessMessage(result.message, extraData, 1, messageAlert);
          extraData.setuserDetail(null);
          extraData.setToken(null);
          storage.delete('token');
          storage.delete('user');
          reset(
          [
            { name: 'Home' }
          ],
          0 // means Category active rahe
        );
        return result;
      } 
      else if (result.status === 419) {
        return result;
        refreshScreen();
      } 
      else if (result.status === 403) {
        return result;
      } 
      else {
        showSuccessMessage(response.message, extraData, 0);
        return result;
      } 
    }

    return result; // Return parsed JSON data
  } catch (error) {
    extraData.loader.setShowLoader(false);
    console.error("Invalid JSON response:", error);
    return error; // Return null if JSON parsing fails
  }
};

export const showSuccessMessage = (message, extraData, type, messageAlert) => {
  if(!messageAlert)
  {
    extraData.alert.setAlertMessage(message);
    extraData.alert.setShowAlert(true);
    extraData.alert.setAlertType(type);
  }
};

const showErrorMessage = (message) => {
  Alert.alert("Error", message);
};

const appSettingStore = (result) => {
  try {
    storage.set('appSetting',JSON.stringify(result?.data));
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};
 
const storeLoginToken = (result) => {
  try {
    storage.set('token',result?.token);
    storage.set('user',JSON.stringify(result?.data));
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};


export const convertToBase64 = async (uri) => {
  try {
    const base64String = await RNFS.readFile(uri, 'base64');
    const base64Image = `data:image/jpeg;base64,${base64String}`; // Use correct MIME type if needed
    // console.log('Base64 Image:', base64Image);
    return base64Image;
    // You can now upload this Base64 string
    // uploadImage(base64Image);
  } catch (error) {
    console.log('Error converting to Base64:', error);
  }
};
 

export const convertWithFees = async (from = 'usd', to = 'inr', amount = 10, feePercent = 2) => {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    );

    if (!response.ok) throw new Error("Failed to fetch currency");

    const data = await response.json();

    const rate = data[from]?.[to];

    if (!rate) throw new Error("Conversion rate not found");

    const converted = amount * rate;

    const fee = (converted * feePercent) / 100;

    const net = converted - fee; 

    return {
      rate: parseFloat(rate),
      amount: parseFloat(amount),
      converted: parseFloat(converted.toFixed(2)),
      fee: parseFloat(fee.toFixed(2)),
      net: parseFloat(net.toFixed(2)),
    };

  } catch (error) {
    console.log("convertWithFees Error:", error);
    throw error;
  }
};


export const convertAmount = async (from = 'usd', to = 'inr', amount = 10) => {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    );

    if (!response.ok) throw new Error("Failed to fetch currency");

    const data = await response.json();

    const rate = data[from]?.[to];

    if (!rate) throw new Error("Conversion rate not found");
    const converted = amount * rate;
    return {
      rate: parseFloat(rate),
      amount: parseFloat(amount),
      converted: parseFloat(converted.toFixed(2)),
    };

  } catch (error) {
    console.log("convertWithFees Error:", error);
    throw error;
  }
};





export const getExpectedLength = (countryISO) => {
  try {
    const callingCode = getCountryCallingCode(countryISO, metadata);
    console.log(getCountryCallingCode)
    const formats = metadata.countries[countryISO][2]; // National number formats

    const possibleLengths = new Set();

    formats.forEach(([,, , , , possible]) => {
      if (Array.isArray(possible)) {
        possible.forEach(len => possibleLengths.add(len));
      }
    });

    return [...possibleLengths];
  } catch (e) {
    return null;
  }
};

export const validateNumber = (phone, countryISO) => {
  const digitOnly = phone.replace(/\D/g, "");
  const possibleLengths = getExpectedLength(countryISO);

  if (!possibleLengths) return false;

  return possibleLengths.includes(digitOnly.length);
};
