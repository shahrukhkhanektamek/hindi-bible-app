/* eslint-disable no-extra-semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';

import Coutries from '../../Components/CountryPicker.js';


import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl, convertToBase64 } from '../../Components/api';
const urls=apiUrl();


const RegisterScreen = ({route}) => {
  const show_case = route.params?.show_case;
  const { extraData } = useContext(GlobalContext);

  const navigation = useNavigation(); 
  const [passwordVisible, setPasswordVisible] = useState(false);


  const [countryCode, setCountryCode] = useState('91');
  const [countryName, setCountryName] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [image, setimage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState();



  const handleRegister = async () => {
    // if (!name || !email) {
    //   Alert.alert('Error', 'Please enter username and password');
    //   return;
    // }
    const filedata = { 
      "name":name,
      "phone":mobile,
      "email":email,
      "country":selectedCountry,
      "show_case":show_case,
      "image":image,
    };

    navigation.navigate("UsernamePassword",{"data":filedata});


    // const response = await postData(filedata, urls.registerOtpSend,"POST", navigation,extraData);
    // if(response.status==200)
    // {
    //   const response2 = await postData({"otp":1234,"id":response.data.id}, urls.register,"POST", navigation,extraData);
    // }
  
    };
  



  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const image64 = await convertToBase64(imageUri);
        setImageUri(response.assets[0].uri);
        setimage(image64);
      };
    });
  };




  return (
    <ScrollView style={styles.container}>
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Name (आपका नाम)</Text>
          <TextInput style={styles.input}
          value={name}
          onChangeText={setName}
           />
        </View>


        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rahne Ka Desh - Residing Country</Text>
          <View style={styles.mobileInputContainer}>            
            <Coutries style={styles.pickerFullWidth} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setCountryCode={setCountryCode} />          
          </View>
        </View>
        

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile (मोबाइल)</Text>
          <View style={styles.mobileInputContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.pl5}>+{countryCode}</Text>              
            </View>
            <TextInput
              style={styles.mobileInput}
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={(text) => setMobile(text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email (ईमेल)</Text>
          <TextInput style={styles.input} keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
           />
        </View>

        <View style={[styles.inputGroup, { marginBottom: 0 }]}>
          <TouchableOpacity onPress={pickImage}>
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
      </View>

      <View style={[styles.button, { marginBottom: 30 }]}>
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
  }
});

export default RegisterScreen;
