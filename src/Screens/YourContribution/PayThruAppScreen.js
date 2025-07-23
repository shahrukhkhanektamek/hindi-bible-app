/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import { Picker } from '@react-native-picker/picker';

import Coutries from '../../Components/CountryPicker.js';


import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

const PayThruAppScreen = ({route}) => {
  const navigation = useNavigation();
  const {payment_type} = route.params;
  const { extraData } = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryCode, setCountryCode] = useState('91');
  const [amount, setamount] = useState();

  const filedata = {
    "name":name,
    "phone":mobile,
    "email":email,
    "country":selectedCountry,
    "amount":amount,
    "type":3,
    "payment_type":payment_type=='india'?1:2,
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Back"
          height="30"
          width="25%"
          fontSize={16}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.formContainer}>
          <Text style={[styles.formTitle, { fontSize: 20, marginBottom: 10, }]}>Payment Gateway</Text>
          <Text style={[styles.formTitle, { fontSize: 14, marginBottom: 10, padding: 10, color: COLORS.white, backgroundColor: BACKGROUND_COLORS.vibrantOrange }]}>UPI/Credit card/Debit Card/Wallet</Text>
          <Text style={styles.formTitle}>If you give  your details, we could acknowledge your payment.</Text>
          <Text style={[styles.formTitle, { marginBottom: 20 }]}>यदि आप अपना विवरण देंगे तो हम आपके भुगतान की पुष्टि कर सकते हैं।</Text>

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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ammount <Text style={styles.redStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Rs."
              placeholderTextColor="black"
              value={amount}
              onChangeText={setamount}
            />
          </View>

          <View style={styles.button}>
            <GradiantButton
              title="PAY"
              height="35"
              width="25%"
              fontSize={14}
              fontWeight={500}
              gradientType="lightBlue"
              borderRadius={5}
              onPress={() => navigation.navigate('PayNow',{"filedata":filedata})}
            />
          </View>
        </View>
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
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
  },
  mainContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.white,
    marginBottom: 5,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
  },
  redStar: {
    color: COLORS.red,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: BACKGROUND_COLORS.white,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  mobileInputContainer: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND_COLORS.white,
    borderRadius: 5,
    alignItems: 'center',
  },
  pickerWrapper: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  picker: {
    height: 50,
    width: '101%',
    marginLeft: 5,
  },
  mobileInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  pl5:{
    paddingLeft:10,
  }
});

export default PayThruAppScreen;
