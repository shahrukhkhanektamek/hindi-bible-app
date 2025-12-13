/* eslint-disable comma-dangle */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

const PayNowScreen = ({route}) => {
  const navigation = useNavigation();
  const filedata = (route.params).filedata;
  const { calculationData } = route.params;
  const { extraData } = useContext(GlobalContext);
    
  const [amount, setamount] = useState(filedata.amount);

  const priceFormat = (value) => {
    if(filedata.payment_type==1)
      return `₹${parseFloat(value)}`;
    else
      return '$'+`${parseFloat(value)}`;
  };


    const CalculationCard = () => {
      if (!calculationData || calculationData.payment_type === 'india') {
        return null;
      }
      
      return (
        <View style={{
          backgroundColor: '#fff',
          padding: 15,
          borderRadius: 10,
          margin: 15,
          // elevation: 3,
        }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>
            📊 Calculation Summary
          </Text>
          
          <Text>💵 Entered Amount: ${calculationData.usd}</Text>
          <Text>💱 Converted to INR: ₹{calculationData.converted}</Text>
          <Text>🔁 Razorpay Fee ({calculationData.convertion_fess}%): - ₹{calculationData.conversionFeeAmount}</Text>
          <Text>🧾 GST on Razorpay (18%): - ₹{calculationData.razorpayGST}</Text>
          
          <View style={{ borderTopWidth: 1, marginTop: 10, paddingTop: 10, borderColor: "#ddd" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
              Final Amount We Receive: ₹{calculationData.finalAmount}
            </Text>
          </View>
        </View>
      );
    };
   
  const handleSubmit = async () => {
    
    const response = await postData(filedata, urls.createTransaction,"GET", navigation,extraData);
    if(response.status==200)
    {
      navigation.navigate("PaymentGateway",{payment_type:filedata.payment_type,data:response.data,type:3});
    }
  
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>
 
      <View style={styles.button}>
        <GradiantButton
          title="BACK"
          height="30"
          width="25%"
          fontSize={16}
          gradientType="yellow"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.mainContainer}>
        <CalculationCard />
        {calculationData.payment_type === 'india'?
        <View style={styles.moneyContainer}>
          <Text style={styles.text}>CONFIRM PAY</Text>
          <Text style={styles.text}>{priceFormat(amount)}</Text>
        </View>
        :null}

        <View style={styles.buttonContainer}>
          <GradiantButton
            title="Confirm Pay"
            height="60"
            width="40%"
            fontSize={14}
            fontWeight={500}
            gradientType="vibrantGreen"
            borderRadius={5}
            // onPress={() => navigation.navigate('ConfirmPay')}
            onPress={handleSubmit}
          />
          <GradiantButton
            title="Cancel"
            height="60"
            width="40%"
            fontSize={14}
            fontWeight={500}
            gradientType="vibrantRed"
            borderRadius={5}
            onPress={() => navigation.goBack()}
          />
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
    marginTop: 25,
  },
  button: {
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: BACKGROUND_COLORS.warmTan,
    marginTop: 20,
  },
  moneyContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    marginTop: 40,
    marginHorizontal: 50,
    justifyContent: 'center',
    height: 250,
  },
  text: {
    color: COLORS.white,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
    marginBottom: 30,
    marginTop: 20,
    marginHorizontal: 50,
  }
});

export default PayNowScreen;
