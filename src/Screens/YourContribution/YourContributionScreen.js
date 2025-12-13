import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../Constants/Colors.js';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import InternationalContributionModal from '../../Components/Modal/MemberLogin/InternationalContributionModal.js';

const YourContributionScreen = ({route}) => {
  const navigation = useNavigation();
  const {payment_type} = route.params;
  const [isModalVisible, setisModalVisible] = useState(false);


  const handleClick = (btnC) =>{

    if(btnC==1)
    {
      navigation.navigate('PayDirect',{"payment_type":payment_type})
    }
    else
    {
      if(payment_type=='international')
      {
        setisModalVisible(true)
      }
      else
      {
        navigation.navigate('PayThruApp',{"payment_type":payment_type})
      }
    }

  }



  return (
    <ScrollView style={styles.container}>
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
          fontSize={15}
          onPress={() => navigation.navigate('Home')}
        />
        
        <GradiantButton
          title="Back"
          height="35"
          width="25%"
          fontSize={16}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.payDirectContainer}>
        <Text style={[styles.text, { color: COLORS.burntSienna }]}>डायरेक्ट हमारे बैंक में पैसे भेजने के लिए PAY DIRECT दबाइए</Text>
        <Text style={[styles.text, { color: COLORS.burntSienna }]}>TO SEND MONEY TO OUR BANK DIRECTLY CLICK PAY DIRECT</Text>
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Pay Direct"
          height="40"
          width="40%"
          fontSize={16}
          gradientType="green"
          borderRadius={5}
          onPress={() => handleClick(1)}
        />
      </View>

      <View style={[styles.payDirectContainer, { backgroundColor: BACKGROUND_COLORS.darkGold }]}>
        <Text style={styles.text}>APP के ज़रिये पैसे भेजने के लिए PAY THRU APP दबाइए</Text>
        <Text style={styles.text}>TO SEND MONEY TO THRUOUGH APP CLICK PAY THRU APP</Text>
      </View>

      <View style={styles.button}>
        <GradiantButton
          title="Pay Thru App"
          height="40"
          width="40%"
          fontSize={16}
          gradientType="yellow"
          borderRadius={5}
          onPress={() => handleClick(2)}
        />
      </View>

    <InternationalContributionModal
        visible={isModalVisible}
        onClose={() => setisModalVisible(false)}        
      />

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 20,
    marginBottom: 0,
  },
 
  payDirectContainer: {
    backgroundColor: BACKGROUND_COLORS.softYellow,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    marginTop: 30,
    rowGap: 20,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default YourContributionScreen;
