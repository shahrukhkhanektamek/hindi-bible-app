/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls = apiUrl();

const UsernamePasswordScreen = ({ route }) => {

  const data = (route.params).data;
  const { extraData } = useContext(GlobalContext);

  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  // ⭐ Add shake animation ref
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // ⭐ Shake animation function
  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const handleRegister = async () => {

    // ⭐ CHECKBOX REQUIRED VALIDATION
    if (!agree) {
      shake(); // animate
      // extraData.alert.setAlertMessage("Please accept Terms & Conditions!");
      // extraData.alert.setShowAlert(true);
      // extraData.alert.setAlertType(0);
      return false;
    }

    if (!username) {
      extraData.alert.setAlertMessage("Enter username!");
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(0);
      return false;
    }
    else if (!password) {
      extraData.alert.setAlertMessage("Enter password!");
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(0);
      return false;
    }

    const filedata = {
      "username": username,
      "password": password,
      "name": data.name,
      "phone": data.phone,
      "email": data.email,
      "country": data.country,
      "show_case": data.show_case,
      "image": data.image,
    };

    const response = await postData(filedata, urls.registerOtpSend, "POST", navigation, extraData);
    if (response.status == 200) {
      const response2 = await postData({ "otp": 1234, "id": response.data.id }, urls.register, "POST", navigation, extraData);
    }
  };


  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" >
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.buttonTop}>
        <GradiantButton
          title="Home"
          height="30"
          width="20%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate("Home")}
        />

        <GradiantButton
          title="Back"
          height="30"
          width="20%"
          fontSize={15}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Create Username & Password / (अकाउंट बनाइये)</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.showButton} onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={25} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ⭐⭐⭐ Checkbox + Terms with Shake Animation ⭐⭐⭐ */}
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: -15,
            flexWrap: "wrap",
            transform: [{ translateX: shakeAnim }]
          }}
        >
          <TouchableOpacity onPress={() => setAgree(!agree)} style={{ padding: 5 }}>
            <Icon
              name={agree ? "checkbox" : "square-outline"}
              size={26}
              color={agree ? COLORS.orange : COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAgree(!agree)} style={{ padding: 5 }}>
            <Text style={{ color: COLORS.white, fontSize: 15 }}>
              I agree to
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("TermsScreen")}
            style={{ padding: 5 }}
          >
            <Text
              style={{
                color: COLORS.goldenYellow,
                fontSize: 15,
                textDecorationLine: "underline",
                fontWeight: "600"
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={[styles.button, { marginBottom: 50 }]}>
        <GradiantButton
          title="Register"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="orange"
          borderRadius={5}
          onPress={handleRegister}
        />
      </View>
    </ScrollView>
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
  buttonTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
    marginTop: 10,
  },
});

export default UsernamePasswordScreen;
