/* eslint-disable no-extra-semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, RefreshControl, Modal } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Coutries from '../../Components/CountryPicker.js';

import PageLoding from '../../Components/PageLoding.js';
import { GlobalContext } from '../../Components/GlobalContext.js';
import { postData, apiUrl, convertToBase64 } from '../../Components/api.js';
const urls=apiUrl();


const EditProfileScreen = () => {

  const { extraData } = useContext(GlobalContext);

  const navigation = useNavigation(); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('91');
  const [countryName, setCountryName] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // modal state
  const [selectedCountry, setSelectedCountry] = useState();



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



  const handleUpdate = async () => {
    // if (!name || !email) {
    //   Alert.alert('Error', 'Please enter username and password');
    //   return;
    // }
    const filedata = { 
      "name":name,
      "phone":mobile,
      "email":email,
      "country":selectedCountry,
      "image":image,
    };
    const response = await postData(filedata, urls.updateProfile,"POST", navigation,extraData);

    // navigation.navigate("UsernamePassword",{"data":filedata});
  
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


  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const onRefresh = useCallback(() => {
    // setPage(0);
    setRefreshing(true);
    setRefreshing(false);
    fetchData(page);
  }, []);
 
  const fetchData = async () => { 
      try {
        const response = await postData({}, urls.getProfile, "GET", navigation, extraData, 1);
        if(response.status==200)
        { 
          setData(response.data);
          setMobile(response.data.phone)
          setName(response.data.name)
          setEmail(response.data.email)
          setSelectedCountry(response.data.country);
          setImageUri(response.data.image)
          setisLoading(false)
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    useEffect(() => {
      fetchData()
    },[]) 
    if (isLoading) {
      return (
          <PageLoding />          
      );
    }

  return (
    <ScrollView style={styles.container}
    keyboardShouldPersistTaps="handled"
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <TouchableOpacity activeOpacity={1}>
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
            title="Menu"
            height="30"
            width="20%"
            gradientType="blue"
            borderRadius={5}
            fontSize={15}
            onPress={() => navigation.navigate('Category')}
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Name (आपका नाम) <Text style={{color:COLORS.red}}>*</Text></Text>
          <TextInput style={styles.input}
          value={name}
          onChangeText={setName}
           />
        </View>


        <View style={styles.inputGroup}>
          <Text style={styles.label}>रहने का देश - Residing Country <Text style={{color:COLORS.red}}>*</Text></Text>
          <View style={styles.mobileInputContainer}>            
            <Coutries style={styles.pickerFullWidth} selectedCountry={selectedCountry} setmobile_pattern={setmobile_pattern} setSelectedCountry={setSelectedCountry} setCountryCode={setCountryCode} />          
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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email (ईमेल) <Text style={{color:COLORS.red}}>*</Text></Text>
          <TextInput style={styles.input} keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
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

      <View style={[styles.button, { marginBottom: 30 }]}>
        <GradiantButton
          title="Update"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="orange"
          borderRadius={5}
          onPress={handleUpdate}
        />
      </View>
      </TouchableOpacity>
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
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: BACKGROUND_COLORS.skyBlue,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
    height: 50,
  },
  mobileInputContainer: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND_COLORS.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerWrapper: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  pickerWrapperFullWidth: {
    flex: 1,
    paddingLeft: 5,
  },
  picker: {
    height: 50,
    width: '101%',
    marginLeft: 0,
  },
  pickerFullWidth: {
    height: 50,
    width: '100%',
  },
  mobileInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
  },
  image: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 30,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  imageUploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 16,
    marginRight: 10,
  },
  pl5:{
    paddingLeft:10,
  },


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
  buttonTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
    // marginBottom: 20,
    marginTop: 10,
  },


  
});

export default EditProfileScreen;
