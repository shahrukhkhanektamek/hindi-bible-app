/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';


import { GlobalContext } from '../../Components/GlobalContext';
import { postData, apiUrl } from '../../Components/api.js';
const urls=apiUrl();
import PageLoading from '../../Components/PageLoding.js';


const YourContributionHomeScreen = () => {
  const navigation = useNavigation();
  const { extraData } = useContext(GlobalContext);


  const [isLoading, setisLoading] = useState(true); 
  const fetchData = async () => { 
      // try {
      //   const response = await postData({}, urls.getProfile, "GET", navigation, extraData, 1);
      //   if(response.status==200)
      //   {
      //       if(response.data.payment_mode==1) 
      //       {
      //         navigation.navigate('YourContribution',{"payment_type":"india"})
      //       }
      //       else
      //       {
      //         navigation.navigate('YourContribution',{"payment_type":"international"})
      //       }
      //     // setisLoading(false)
      //   }
      // } catch (error) {
      //   console.error('Error fetching countries:', error);
      // }
    };

    


    useEffect(() => {
      fetchData()
    },[]) 
    // if (isLoading) {
    //   return (
    //       <PageLoading />          
    //   );
    // }



  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.homeButton}>
        <GradiantButton
          title="Home"
          height="30"
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={16}
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      

      <View style={styles.mainSection}>
        <View style={[styles.section, { marginTop: 10 }]}>
          <Text style={styles.text}>Agar aap INDIAN RUPEES (INR) me pay karna chaahte hain to kripaya INDIA select kijiye.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Agar aap $ USD me pay karna chaahte hain to kripaya INTERNATIONAL par click kijiye</Text>
        </View>
      </View>

      <View style={styles.bottomButton}>
        <GradiantButton
          title="INDIA"
          height="40"
          width="45%"
          gradientType="green"
          borderRadius={5}
          fontSize={14}
          onPress={() => navigation.navigate('YourContribution',{"payment_type":"india"})}
        />
        <GradiantButton
          title="International"
          height="40"
          width="45%"
          gradientType="orange"
          borderRadius={5}
          fontSize={14}
          onPress={() => navigation.navigate('YourContribution',{"payment_type":"international"})}
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
    marginBottom: 30,
  },
  homeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainSection: {
    backgroundColor: BACKGROUND_COLORS.darkRed,
    marginTop: 30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 5,
  },
  section: {
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.white,
  },
  bottomButton: {
    marginTop: 30,
    alignItems: 'center',
    rowGap: 20,
  },
});

export default YourContributionHomeScreen;
