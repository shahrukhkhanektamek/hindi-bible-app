/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-extra-semi */
import React, { useState, useContext } from 'react';
import { Text, TextInput, StyleSheet, Alert, ScrollView, View, TouchableOpacity } from 'react-native';
import GradiantButton from '../../Components/Button/GradientButton';
import { useNavigation } from '@react-navigation/native';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import COLORS from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';



import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const { extraData } = useContext(GlobalContext);
  const appSetting = extraData.appSetting;
  const userDetail = extraData.userDetail;

  



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




  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.mobile || !form.subject || !form.message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    };

    const filedata = {
        "name":form.name,
        "email":form.email,
        "mobile":form.mobile,
        "subject":form.subject,
        "message":form.message,
      };
      const response = await postData(filedata, urls.contactInquiry,"POST", navigation,extraData);
      if(response.status==200)
      {
        setForm({
          name: '',
          email: '',
          mobile: '',
          subject: '',
          message: '',
        });
      }

    Alert.alert('Success', 'Form submitted successfully');
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      <TouchableOpacity activeOpacity={1}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.button}>
        <GradiantButton 
          title="Home"
          height="35"
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={16}
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Back"
          height="35"
          width="25%"
          gradientType="purple"
          borderRadius={5}
          fontSize={16}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Contact Us</Text>

        <Text style={styles.subHeading}>Post Only Website Related Queries in The Box.</Text>
        <Text style={styles.subHeading}>बॉक्स में केवल वेबसाइट से संबंधित प्रश्न ही पोस्ट करें।</Text>

        <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={text => handleChange('name', text)}
        />

        <Text style={styles.label}>Email Address <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
        />

        <Text style={styles.label}>Mobile <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={form.mobile}
          onChangeText={text => handleChange('mobile', text)}
        />

        <Text style={styles.label}>Subject <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={form.subject}
          onChangeText={text => handleChange('subject', text)}
        />

        <Text style={styles.label}>Message ( With Phone Number ) <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={form.message}
          onChangeText={text => handleChange('message', text)}
        />

        <GradiantButton
          title="Send Message"
          height="35"
          width="40%"
          gradientType="lightBlue"
          borderRadius={5}
          fontSize={14}
          onPress={() => handleSubmit()}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.officeContainer}> 
          <Text style={styles.heading}>Our Office</Text>
          <View style={styles.infoRow}>
            <Icon name="phone" size={24} color="#64B5DB" style={styles.icon} />
            <Text style={styles.infoText}><Text style={{ fontSize: 14, fontWeight: 600 }}>Phone:</Text> <Text onPress={() => openWhatsapp(appSetting.payment_detail.mobile, 'Hello!')}>+{appSetting.payment_detail.mobile}</Text> (WhatsApp/SMS only)</Text>
          </View>
          <View style={styles.warningRow}>
            <Text style={styles.warningText}>Please Do No Make Call.</Text>
            <Text style={styles.warningText}>कृपया कॉल न करें.</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="email" size={24} color="#64B5DB" style={styles.icon} />
            <Text style={styles.infoText}><Text style={{ fontSize: 14, fontWeight: 600 }}>Email:</Text> <Text onPress={() => openEmail(appSetting.payment_detail.email, 'Contact Us','Hello!')}>{appSetting.payment_detail.email}</Text></Text>
          </View>
        </View>

        <View style={styles.workingContainer}>
          <Text style={styles.heading}>Working Hours</Text>
          <View style={[styles.infoRow, { marginBottom: 10 }]}>
            <Icon name="access-time" size={20} color={COLORS.white} style={styles.icon} />
            <Text style={styles.infoText}>Monday - Friday - 10am to 5pm</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="access-time" size={20} color={COLORS.white} style={styles.icon} />
            <Text style={styles.infoText}>Saturday - Sunday - Closed</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLORS.primary,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginRight: 20,
  },
  
  formContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    borderRadius: 5,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
  },
  bottomContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    borderRadius: 5,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    alignSelf: 'center',
    color: COLORS.white,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 2,
    color: COLORS.white,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: BACKGROUND_COLORS.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    marginTop: 10,
    color: COLORS.white,
  },
  required: {
    color: 'red',
  },
  officeContainer: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    color: COLORS.white,
    fontSize: 14,
  },
  warningRow: {
    marginVertical: 20,
    marginLeft: 35,
  },
  warningText: {
    color: COLORS.white,
  },
  workingContainer: {
    marginTop: 40,
  },
});

export default FeedbackScreen;
