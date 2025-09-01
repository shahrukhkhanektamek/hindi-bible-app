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

const DviceChangeAlertModal = ({ visible, onClose, proceed  }) => {
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
              <View style={styles.middleSection}>
                
                <View style={styles.secondSection}>
                  <Text style={styles.message}>Aapka Account Kisi or device pr login hai agr aap is device pe login krna chahte ho to apko neeche diye gye Proceed button pe click krna padega or 3 ghnte tak wait krna padega uske baad aap is device pe login kroge to login ho jaega </Text>
                </View>
                
                
              </View>
              <View style={styles.buttonBottom}>
                <GradiantButton
                  title="Proceed"
                  height="35"
                  width="100%"
                  gradientType="blue"
                  borderRadius={5}
                  onPress={() => {                    
                    
                    proceed()
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


export default DviceChangeAlertModal;
