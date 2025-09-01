import { Alert, Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import COLORS from '../../Constants/Colors.js';

import { GlobalContext } from '../../Components/GlobalContext';

const PayDirectScreen = () => {
  const navigation = useNavigation();

  const { extraData } = useContext(GlobalContext);
  const appSetting = extraData.appSetting;
  const userDetail = extraData.userDetail;
  const setappSetting = extraData.setappSetting;



  const openWhatsapp = async (phone, message) => {
    let url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('WhatsApp not installed!');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));  
   };

   const openEmail = async (email, subject, body) => {
    let url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(err => console.error('An error occurred', err));
   };

  const openUPIPayment = (upiId, name) => {
    const url = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR`;
    Linking.openURL(url).catch(err => console.error("Error: ", err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="BACK"
          height="35"
          width="30%"
          fontSize={16}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.payDirectContainer}>
        <Text style={[styles.text]}>KRIPAYA PAYMENT KE BAAD HAME SCREENSHOT BHEJ DIJIYE WHATSAPP PAR <Text onPress={() => openWhatsapp(appSetting.payment_detail.mobile, 'Hello!')}>+{appSetting.payment_detail.mobile}</Text></Text>
      </View>

      <View style={styles.scannerContainer}>
        <Image style={styles.scanner} source={{uri:appSetting.payment_detail.qr_code}} />
      </View>

      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>Our Bank Account Details</Text>

        <Text style={styles.infoTitle}>When you send your mooney, please send us your name & mobile number (if you wish) - so we could confirm your payment & acknowledge.</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Bank Name:</Text>
          <Text style={styles.value}>{appSetting.payment_detail.bank_name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Holder:</Text>
          <Text style={styles.value}>{appSetting.payment_detail.account_holder}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Number:</Text>
          <Text style={styles.value}>{appSetting.payment_detail.account_number}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>IFSC Code:</Text>
          <Text style={styles.value}>{appSetting.payment_detail.ifsc}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Branch:</Text>
          <Text style={styles.value}>{appSetting.payment_detail.branch}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>BIC Code:</Text>
          <Text style={styles.value}>{appSetting.payment_detail.bic_code}</Text>
        </View>

        
        <View style={styles.detailRow}>
          <Text style={styles.label}>UPI:</Text>
          <Text style={styles.value}><Text onPress={() => openUPIPayment(appSetting.payment_detail.upi, 'Contribution!')}>{appSetting.payment_detail.upi}</Text></Text>
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
    marginVertical: 10,
  },
  payDirectContainer: {
    backgroundColor: BACKGROUND_COLORS.darkRed,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    marginTop: 10,
    marginHorizontal: 10,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  scannerContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  scanner: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  accountContainer: {
    backgroundColor: BACKGROUND_COLORS.warmTan,
    padding: 30,
    margin: 10,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  value: {
    fontSize: 16,
    color: COLORS.black,
  },
  infoTitle: {
    backgroundColor: BACKGROUND_COLORS.vibrantOrange,
    color: COLORS.white,
    textAlign: 'center',
    padding: 16,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default PayDirectScreen;
