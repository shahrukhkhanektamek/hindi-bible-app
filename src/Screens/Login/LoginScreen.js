/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

import DeviceChange from '../../Components/Modal/MemberLogin/DviceChangeAlertModal';
import DviceChangeHour from '../../Components/Modal/MemberLogin/DviceChangeHourAlertModal';
import WrongLoginDetailModal from '../../Components/Modal/MemberLogin/WrongLoginDetailModal';
import AfterSendPasswordModal from '../../Components/Modal/MemberLogin/AfterSendPasswordModal';

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
import DeviceInfo from 'react-native-device-info';
import { logoutDevice } from '../../Components/Socket/socketService.js';
const urls = apiUrl();

const LoginScreen = ({route}) => {
  const payment = route?.params?.payment ?? 0;
  
  const { extraData } = useContext(GlobalContext);
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDeviceChangeModalVisible, setIsDeviceChangeModalVisible] = useState(false);
  const [isDeviceChangeHourModalVisible, setIsDeviceChangeHourModalVisible] = useState(false);

  const [isWrongLoginDetailModalVisible, setIsWrongLoginDetailModalVisible] = useState(false);
  const [isAfterSendPasswordModalVisible, setIsAfterSendPasswordModalVisible] = useState(false);
  const [modaldata, setModalData] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [responseData, setresponseData] = useState('');
  const [deviceId, setdeviceId] = useState();

  const getDeviceId = async () => {
    const deviceIdTemp = await DeviceInfo.getUniqueId();
    setdeviceId(deviceIdTemp);
  };

  useEffect(() => {
    getDeviceId();

    // ✅ Retrieve saved credentials from MMKV
    const savedUsername = storage.getString('savedUsername');
    const savedPassword = storage.getString('savedPassword');
    const savedRemember = storage.getString('rememberMe');

    if (savedRemember === 'true' && savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    // ✅ Save credentials if rememberMe checked
    if (rememberMe) {
      storage.set('savedUsername', username);
      storage.set('savedPassword', password);
      storage.set('rememberMe', 'true');
    } else {
      storage.delete('savedUsername');
      storage.delete('savedPassword');
      storage.set('rememberMe', 'false');
    }

    const filedata = {
      username: username,
      password: password,
      payment: payment,
      firebase_token: storage.getString('firebaseToken'),
    };

    const response = await postData(filedata, urls.login, 'POST', navigation, extraData, 0,1);
    setresponseData(response.data);

    if (response.action != 'login') {
      if (response.status == 403) {
        setIsDeviceChangeModalVisible(true);
      } else {
        setIsDeviceChangeHourModalVisible(true);
      }
    }
    else{
      setIsWrongLoginDetailModalVisible(true);
    }
  };

  const handleProceed = async () => {
    const filedata = {
      username: username,
      password: password,
    };
    const response = await postData(filedata, urls.proceedLogin, 'POST', navigation, extraData);
    setresponseData(response.data);
    if (response.status == 200) {
      setIsDeviceChangeModalVisible(false);
      logoutDevice(response.data.oldDeviceId);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  const sendPassword = async () => {
    
    const response = await postData({}, urls.sendPassword, 'POST', navigation, extraData);
    setresponseData(response.data);
    if (response.status == 200) {
      setModalData(response.data);
      setIsAfterSendPasswordModalVisible(true);      
    }
  };

  return (
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
    <ScrollView keyboardShouldPersistTaps="handled" style={[styles.container]}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Home"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Login Account </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME <Text style={{color:COLORS.red}}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD <Text style={{color:COLORS.red}}>*</Text></Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={25} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ✅ Remember Me Checkbox */}
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, marginBottom:20 }}>
          <Icon
            name={rememberMe ? 'checkbox-outline' : 'square-outline'}
            size={22}
            color={COLORS.white}
          />
          <Text style={{ color: COLORS.white, marginLeft: 8, fontSize: 14, }}>Save Username & Password</Text>
        </TouchableOpacity>

        <View style={[styles.button, { marginBottom: 20 }]}>
          <GradiantButton
            title="LOGIN"
            height="35"
            width="30%"
            fontSize={16}
            gradientType="orange"
            borderRadius={5}
            onPress={handleLogin}
          />
        </View>

        <GradiantButton
          title="Forgot Username Password"
          height="35"
          width="100%"
          fontSize={16}
          gradientType="green"
          borderRadius={5}
          onPress={sendPassword}
        />


      </View>

      

      

      <DeviceChange
        visible={isDeviceChangeModalVisible}
        onClose={() => setIsDeviceChangeModalVisible(false)}
        proceed={handleProceed}
      />

      <DviceChangeHour
        visible={isDeviceChangeHourModalVisible}
        onClose={() => setIsDeviceChangeHourModalVisible(false)}
        data={responseData}
      />

      <WrongLoginDetailModal
        visible={isWrongLoginDetailModalVisible}
        onClose={() => setIsWrongLoginDetailModalVisible(false)}
        data={responseData}
      />

      <AfterSendPasswordModal
        visible={isAfterSendPasswordModalVisible}
        onClose={() => setIsAfterSendPasswordModalVisible(false)}
        data={modaldata}
      />




    </ScrollView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: BACKGROUND_COLORS.skyBlue,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: 30,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    backgroundColor: BACKGROUND_COLORS.white,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  showButton: {
    position: 'absolute',
    right: 10,
    top: 9,
  },
});

export default LoginScreen;
