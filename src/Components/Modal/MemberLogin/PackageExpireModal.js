/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BACKGROUND_COLORS from '../../../Constants/BackGroundColors';
import GradiantButton from '../../Button/GradientButton';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../Constants/Colors';

const PackageExpireModal = ({ visible, onClose, appSetting }) => {
  const navigation = useNavigation();
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.message}>Total Fees & Viewing Period</Text>
              <View style={styles.middleSection}>
                <View style={styles.firstSection}>
                  <Text style={{ color: COLORS.darkRed, fontSize: 20, fontWeight: '500', marginBottom: 5 }}>{appSetting.detail.fees_string}</Text>
                  <Text style={{ fontSize: 16 }}>1 YEAER FEES</Text>
                  <Text style={{ fontSize: 16 }}>( 1 वर्ष की फीस )</Text>
                </View>
                <View style={styles.secondSection}>
                  <Text style={{ color: COLORS.goldenYellow, fontSize: 16, marginBottom: 3 }}>YOUR PACKAGE PERIOD</Text>
                  <Text style={{ color: COLORS.white, fontSize: 16 }}>{appSetting.package.package.start_date} - {appSetting.package.package.end_date}</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={[styles.checkbox, agreeTerms && styles.checkedBox]}
                    onPress={() => setAgreeTerms(prev => !prev)}
                  >
                    {agreeTerms && <Text style={styles.checkmark}>✔</Text>}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>TERMS & CONDITIONS</Text>
                </View>
              </View>
              <View style={styles.buttonBottom}>
                {/* <GradiantButton
                  title="1 Day Free Trial"
                  height="35"
                  width="50%"
                  gradientType="blue"
                  borderRadius={5}
                  onPress={() => {
                    if (!agreeTerms) {
                      return alert('Please agree to the Terms & Conditions');
                    }
                    onClose();
                    navigation.navigate('Register');
                  }}
                /> */}
                <GradiantButton
                  title="Pay"
                  height="35"
                  width="100%"
                  gradientType="green"
                  borderRadius={5}
                  onPress={() => {
                    if (!agreeTerms) {
                      return alert('Please agree to the Terms & Conditions');
                    }
                    onClose();
                    navigation.navigate('SelectCountryScreen',{type:1});
                  }}
                />
              </View>
              <TouchableOpacity style={styles.crossIcon} onPress={onClose}>
                <Icon name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: BACKGROUND_COLORS.maroon,
    borderRadius: 5,
    padding: 20,
    width: '90%',
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: COLORS.white,
  },
  crossIcon: {
    position: 'absolute',
    right: 0,
    padding: 5,
    zIndex: 10,
  },
  buttonBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleSection: {
    backgroundColor: BACKGROUND_COLORS.white,
    padding: 20,
    borderRadius: 30,
    rowGap: 20,
    marginBottom: 20,
  },
  firstSection: {
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    backgroundColor: BACKGROUND_COLORS.paleYellow,
    alignItems: 'center',
  },
  secondSection: {
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 20,
    backgroundColor: BACKGROUND_COLORS.maroon,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  checkedBox: {
    backgroundColor: COLORS.white,
  },
  checkmark: {
    color: COLORS.darkRed,
    fontSize: 14,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    color: COLORS.darkRed,
    fontSize: 14,
    fontWeight: '500',
  },
});


export default PackageExpireModal;
