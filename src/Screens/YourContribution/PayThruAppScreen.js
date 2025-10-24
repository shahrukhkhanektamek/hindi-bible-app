/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import { Picker } from '@react-native-picker/picker';

import Coutries from '../../Components/CountryPicker.js';


import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
import PageLoading from '../../Components/PageLoding.js';
const urls=apiUrl();

const PayThruAppScreen = ({route}) => {
  const navigation = useNavigation();
  const {payment_type} = route.params; 
  const { extraData } = useContext(GlobalContext);

  const paymentList = extraData.paymentDetail;
  const PayPal = paymentList.PayPal;

  

  

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

  const [isLoading, setisLoading] = useState(true); 
  const [data, setdata] = useState([]); 
  const fetchOldData = async () => {  
    try {
      const response = await postData({}, urls.getLastTransaction, "GET", navigation, extraData, 1);
      if(response.status==200)
      {
        const data = response.data;
        setName(data.name);
        setMobile(data.phone);
        setEmail(data.email);

        if (data?.contribution) {
            const contributionData = JSON.parse(data.contribution);
            setSelectedCountry(contributionData.country)
          } else {
            console.log('setcontribution not found or empty');
          }
 
        setisLoading(false);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

const getPayPalAccessToken = async () => {
  const clientId = PayPal.key;
  const secret = PayPal.salt;

  // Sandbox → https://api-m.sandbox.paypal.com
  // Live → https://api-m.paypal.com
  const tokenUrl = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

  // Encode credentials (clientId:secret) → base64
  const credentials = btoa(`${clientId}:${secret}`);

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Access Token:", data.access_token);
      return data.access_token;
    } else {
      console.error("❌ Failed to get token:", data);
      return null;
    }
  } catch (error) {
    console.error("⚠️ Error fetching PayPal token:", error);
    return null; 
  }
};
const getExchangeRate = async () => {
  const token = await getPayPalAccessToken();
  if (!token) return;

  const body = {
    quote_items: [
      {
        base_currency: "USD",   // must be uppercase ISO currency
        target_currency: "INR",  // must be uppercase ISO currency
        base_amount: "10.00"     // string
      }
    ]
  };

  try {
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v2/pricing/quote-exchange-rates",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();
    console.log("Exchange Rate Response:", data);
  } catch (err) {
    console.error("Error fetching exchange rate:", err);
  }
};




  useEffect(() => {
    fetchOldData()
    // getExchangeRate()
  },[]) 
  if (isLoading) {
    return (
        <PageLoading />          
    );
  }


  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
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
              placeholder={payment_type=='india'?"Rs.":"USD"}
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
