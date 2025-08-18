import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary.js';
import GradiantButton from '../../Components/Button/GradientButton.js';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors.js';
import LogoutButton from '../../Components/LogoutButton.js';
const SelectCountryScreen = ({route}) => {
  const navigation = useNavigation();

  
  let type = route.params.type;
  if(!type) type = 1;
  
  let item_id = route.params.item_id;
  if(!item_id) item_id = 1;

  
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.buttonTop}>
        <GradiantButton
          title="Home"
          height="30"
          width="25%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Home')}
        />
        <LogoutButton />
      </View>
      
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <GradiantButton
            title="INDIA"
            height="40"
            width="45%"
            fontSize={16}
            gradientType="green"
            borderRadius={5}
            onPress={() => navigation.navigate('Pay',{country:'india',type:type,item_id:item_id})}
          />
        </View>
        <View style={styles.button}>
          <GradiantButton
            title="INTERNATIONAL"
            height="40"
            width="45%"
            fontSize={16}
            gradientType="orange"
            borderRadius={5}
            onPress={() => navigation.navigate('Pay',{country:'international',type:type,item_id:item_id})}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.primary,
    padding: 10,
  },
  topBar: {
    marginTop: 25,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    marginTop: 60,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 20,
    marginBottom: 20,
  },
});

export default SelectCountryScreen;
