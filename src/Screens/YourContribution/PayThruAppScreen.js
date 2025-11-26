/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import { Picker } from '@react-native-picker/picker';

import Coutries from '../../Components/CountryPicker.js';


import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl,showSuccessMessage, convertWithFees, convertAmount } from '../../Components/api';
import PageLoading from '../../Components/PageLoding.js';
const urls=apiUrl();

const PayThruAppScreen = ({route}) => {
  const navigation = useNavigation();
  const {payment_type} = route.params; 
  const { extraData } = useContext(GlobalContext);

  const fetchAppSettingData = extraData.fetchAppSettingData;
  const paymentList = extraData.paymentDetail;
  const convertion_fess = paymentList.Razorpay.platform_fee;
  const gst = paymentList.Razorpay.gst;
  

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryCode, setCountryCode] = useState('91');
  const [amount, setamount] = useState();
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fees, setfees] = useState(paymentList.Razorpay.fees);
  


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



  const handleAmountChange = async (value) => {
    setamount(value);

    if (!value || isNaN(value)) {
      setConvertedAmount(null);
      return;
    }

    try { 
      // 1️⃣ Currency conversion INR में
      const convertedData = await convertAmount("usd", "inr", value);
      const converted = parseFloat(convertedData.converted);

      // 2️⃣ Conversion fee amount
      const conversionFeeAmount = parseFloat(((converted * convertion_fess) / 100).toFixed(2));

      // 3️⃣ Razorpay charges
      const razorpayFee = parseFloat(((converted * convertion_fess) / 100).toFixed(2));
      const razorpayGST = parseFloat(((razorpayFee * gst) / 100).toFixed(2));
      const totalRazorCharges = razorpayFee + razorpayGST;

      // 4️⃣ Final amount user gets
      const finalAmount = parseFloat((converted - conversionFeeAmount - totalRazorCharges).toFixed(2));

      // Set state
      setConvertedAmount({
        rate: convertedData.rate,
        usd: value,
        converted,
        conversionFeeAmount,
        razorpayFee,
        razorpayGST,
        totalRazorCharges,
        finalAmount,
      });


    } catch (err) {
      console.log("Conversion Error:", err);
    }
  };


  useEffect(() => {
    fetchOldData();
    fetchAppSettingData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    fetchOldData();
    setRefreshing(true);
    setRefreshing(false);
    handleAmountChange(amount);
    fetchAppSettingData();
  }, []);


  if (isLoading) { 
    return (
        <PageLoading />          
    );
  }


  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >

      <TouchableOpacity activeOpacity={1}>


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
              <Coutries style={styles.pickerFullWidth} selectedCountry={selectedCountry} setmobile_pattern={setmobile_pattern} setSelectedCountry={setSelectedCountry} setCountryCode={setCountryCode} />          
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
            <Text style={styles.label}>Email (ईमेल)</Text>
            <TextInput style={styles.input} keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            />
          </View>


          {convertedAmount && payment_type!='india' && (
            <View style={{
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              marginTop: 5
            }}>
              <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>Calculation Summary</Text>

              <Text>💵 Entered Amount:  ${convertedAmount.usd}</Text>
              <Text>💱 Converted to INR: ₹{convertedAmount.converted}</Text>
              <Text>🔁 Razorpay Fee ({convertion_fess}%): - ₹{convertedAmount.conversionFeeAmount}</Text>
              {/* <Text>💳 Razorpay Fee ({fees}%): - ₹{convertedAmount.razorpayFee}</Text> */}
              <Text>🧾 GST on Razorpay (18%): - ₹{convertedAmount.razorpayGST}</Text>

              <View style={{
                borderTopWidth: 1,
                marginTop: 10,
                paddingTop: 10,
                borderColor: "#ddd"
              }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
                  Final Amount We Receive: ₹{convertedAmount.finalAmount}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ammount <Text style={styles.redStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={payment_type=='india'?"Rs.":"USD"}
              placeholderTextColor="black"
              value={amount}
              // onChangeText={setamount}
              onChangeText={handleAmountChange}
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
              onPress={() => { 
                if(!amount){
                  showSuccessMessage('Enter  Amount!', extraData, 0);
                  return false;
                }
                navigation.navigate('PayNow',{"filedata":filedata});
              }}
            />
          </View>
        </View>
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
