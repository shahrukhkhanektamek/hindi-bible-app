/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';

import PageLoding from '../../Components/PageLoding.js';
import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();

const EditUsernamePasswordScreen = () => {

    

  const { extraData } = useContext(GlobalContext);

  const navigation = useNavigation(); 
  const [passwordVisible, setPasswordVisible] = useState(false);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 


 

  const handleUpdate = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    const filedata = {
      "username":username,
      "password":password,
    };
    const response = await postData(filedata, urls.updatePassword,"POST", navigation,extraData);
    
  
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
            setUsername(response.data.username)
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
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
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
      {/* (अकाउंट बनाइये) */}
        <Text style={styles.formTitle}>Edit Username & Password / (अकाउंट बनाइये) </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME <Text style={{color:COLORS.red}}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD <Text style={{color:COLORS.red}}>*</Text></Text>
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
      </View>

      <View style={[styles.button, { marginBottom: 20 }]}>
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
});

export default EditUsernamePasswordScreen;
