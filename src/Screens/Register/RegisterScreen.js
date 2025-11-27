import {
  StyleSheet, Text, View, TextInput, ScrollView,
  TouchableOpacity, Image, KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';
import Coutries from '../../Components/CountryPicker.js';
import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl, convertToBase64, showErrorMessage } from '../../Components/api';

const urls = apiUrl();

const RegisterScreen = ({ route }) => {
  const navigation = useNavigation();
  const { extraData } = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [selectedCountry, setSelectedCountry] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // modal state
  

  const show_case = route.params?.show_case;

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };




  const [error, setError] = useState("");
  const [mobile_pattern, setmobile_pattern] = useState();
  const isValidPhone = (phone) => {
    let pattern = mobile_pattern;
    if (typeof pattern === "string") {
      pattern = pattern.replace(/^\/|\/$/g, "");
      try {
        pattern = new RegExp(pattern);
      } catch (e) {
        console.log("❌ Invalid RegExp format:", e);
        return { valid: false, message: "Invalid regex format" };
      }
    }
    const patternStr = pattern.toString();
    const rangeMatch = patternStr.match(/\{(\d+),(\d+)\}/);
    const min = rangeMatch ? parseInt(rangeMatch[1]) : 0;
    const max = rangeMatch ? parseInt(rangeMatch[2]) : Infinity;
    const cleaned = phone.replace(/[^\d]/g, "");
    if (cleaned.length < min) {
      return { valid: false, message: `Minimum ${min} digits required` };
    }
    if (cleaned.length > max) {
      return { valid: false, message: `Maximum ${max} digits allowed` };
    }
    if (!pattern.test(cleaned)) {
      return { valid: false, message: "Invalid phone number format" };
    }
    return { valid: true, message: "Number valid hai ✔️" };
  };


  const handleRegister = () => {

    if(!isValidEmail(email))
    {
      extraData.alert.setAlertMessage("Enter valid email!");
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(0);
      return false;
    }
    // else if(error)
    // {
    //   extraData.alert.setAlertMessage("Enter valid mobile!");
    //   extraData.alert.setShowAlert(true);
    //   extraData.alert.setAlertType(0);
    //   return false;
    // }
    else if(!name) {
      extraData.alert.setAlertMessage("Enter name!");
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(0);
      return false;
    }
    else if(!selectedCountry) {
      extraData.alert.setAlertMessage("Select country!");
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(0);
      return false;
    }
    else if(!mobile) {
      extraData.alert.setAlertMessage("Enter mobile no.!");
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(0);
      return false;
    }
    else if(!email) {
      extraData.alert.setAlertMessage("Enter email!");
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(0);
      return false;
    }

    const filedata = {
      name,
      phone: mobile,
      email,
      country: selectedCountry,
      show_case,
      image,
    };
    navigation.navigate("UsernamePassword", { data: filedata });
  };

  // Image picker function
  const pickImage = (fromCamera = false) => {
    const options = { mediaType: 'photo', maxWidth: 1000, maxHeight: 1000, quality: 1 };
    
    const callback = async (response) => {
      if (!response.didCancel && !response.errorCode && response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        const image64 = await convertToBase64(uri);
        setImage(image64);
      }
    };

    if (fromCamera) {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity activeOpacity={1}>
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
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Name (आपका नाम) <Text style={{color:COLORS.red}}>*</Text> </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Country */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rahne Ka Desh - Residing Country <Text style={{color:COLORS.red}}>*</Text></Text>
              <View style={styles.mobileInputContainer}>
                <Coutries
                  type={1}
                  style={styles.pickerFullWidth}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  setCountryCode={setCountryCode}
                  setmobile_pattern={setmobile_pattern}
                />
              </View>
            </View>

            {/* Mobile */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile (मोबाइल) <Text style={{color:COLORS.red}}>*</Text></Text>
              <View style={styles.mobileInputContainer}>
                <View style={styles.pickerWrapper}>
                  <Text style={styles.pl5}>+{countryCode}</Text>
                </View>
                <TextInput
                  style={styles.mobileInput}
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/[^\d]/g, "");
                    const patternStr = mobile_pattern.toString();
                    const rangeMatch = patternStr.match(/\{(\d+),(\d+)\}/);
                    const min = rangeMatch ? parseInt(rangeMatch[1]) : 0;
                    const max = rangeMatch ? parseInt(rangeMatch[2]) : Infinity;
                    if (cleaned.length > max) return;
                    setMobile(cleaned);
                    const validation = isValidPhone(cleaned);
                    setError(validation.valid ? "" : validation.message);
                  }}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email (ईमेल) <Text style={{color:COLORS.red}}>*</Text></Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Image Picker */}
            <View style={[styles.inputGroup, { marginBottom: 0 }]}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.imageUploadContent}>
                  <Image
                    source={require('../../Assets/profile-icon.png')}
                    style={styles.profileIcon}
                  />
                  <Text style={styles.buttonText}>Set Profile Photo (Optional)</Text>
                </View>
              </TouchableOpacity>
              {imageUri && (
                <View style={styles.image}>
                  <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                </View>
              )}
            </View>

            {/* Modal */}
            <Modal
              transparent
              animationType="slide"
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  {/* Close Button */}
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.modalButton} onPress={() => pickImage(true)}>
                    <Icon name="camera-outline" size={24} color="#000" style={{ marginRight: 10 }} />
                    <Text style={styles.modalButtonText}>Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.modalButton} onPress={() => pickImage(false)}>
                    <Icon name="image-outline" size={24} color="#000" style={{ marginRight: 10 }} />
                    <Text style={styles.modalButtonText}>Gallery</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>


          </View>

          <View style={[styles.button, { marginBottom: 50 }]}>
            <GradiantButton
              title="NEXT"
              height="35"
              width="30%"
              fontSize={16}
              gradientType="orange"
              borderRadius={5}
              onPress={handleRegister}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BACKGROUND_COLORS.primary },
  topBar: { marginTop: 25, marginBottom: 16 },
  button: { alignItems: 'center' },
  formContainer: {
    backgroundColor: BACKGROUND_COLORS.skyBlue,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  inputGroup: { marginBottom: 20 },
  label: { color: COLORS.white, fontSize: 14, fontWeight: '400', marginBottom: 5, textAlign: 'center' },
  input: { backgroundColor: BACKGROUND_COLORS.white, borderRadius: 5, padding: 10, fontSize: 16, color: COLORS.black, height: 50 },
  mobileInputContainer: { flexDirection: 'row', backgroundColor: BACKGROUND_COLORS.white, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  pickerWrapper: { width: 100, borderRightWidth: 1, borderRightColor: '#ccc' },
  pickerFullWidth: { height: 50, width: '100%' },
  mobileInput: { flex: 1, padding: 10, fontSize: 16, color: COLORS.black },
  buttonText: { color: COLORS.white, fontSize: 14, fontWeight: '400' },
  image: { flexDirection: 'row', justifyContent: 'center' },
  selectedImage: { width: 200, height: 200, marginTop: 30, borderRadius: 10, resizeMode: 'contain' },
  imageUploadContent: { flexDirection: 'row', alignItems: 'center' },
  profileIcon: { width: 50, height: 50, resizeMode: 'cover', borderRadius: 16, marginRight: 10 },
  pl5: { paddingLeft: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderTopRightRadius: 16, borderTopLeftRadius: 16 },
  modalButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  modalButtonText: { fontSize: 16, color: '#000' },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
});

export default RegisterScreen;
