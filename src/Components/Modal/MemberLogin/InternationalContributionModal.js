import React from 'react';
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

const InternationalContributionModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

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
              <View style={styles.buttonTop}>
                <GradiantButton
                  title="Home"
                  height="35"
                  width="30%"
                  gradientType="yellow"
                  borderRadius={5}
                  onPress={() => {
                    onClose();
                    navigation.navigate('Home');
                  }}
                />
              </View>
              <Text style={styles.message}>
                Agar aap agle page par PAY DIRECT se - REMITLY, FLYWIRE, WESTERN UNION etc. ke madhyam se hamare bank me direct paisa transfer karenge to usme aapka COMMISSION kam lagega. 
                </Text>
                
              <Text style={styles.message}>
                Agar aap PAY THRU APP se PAYMENT karenge to usme aapka COMMISSION zyaada kat jaata hai.
                </Text>
              <Text style={styles.message}>
                    Is Vishay par aapka koi sawal ho to aap hame WhatsApp kijiye - 7838989070 par.

              </Text>
              <View style={styles.buttonBottom}>
              <GradiantButton
                  title="Pay Direct"
                  height="35"
                  width="45%"
                  gradientType="green"
                  borderRadius={5}
                  onPress={() => {
                    onClose();
                    navigation.navigate('PayDirect',{"payment_type":'international'});
                  }}
                />
              <GradiantButton
                  title="Pay Thru App"
                  height="35"
                  width="45%"
                  gradientType="yellow"
                  borderRadius={5}
                  onPress={() => {
                    onClose();
                    navigation.navigate('PayThruApp',{"payment_type":'international'});
                  }}
                />
                
              </View>
              <TouchableOpacity style={styles.crossIcon} onPress={onClose}>
                <Icon name="close" size={24} color="#fff" />
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
    width: '80%',
  },
  message: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'left',
    color: COLORS.white,
  },
  crossIcon: {
    position: 'absolute',
    right: 0,
    padding: 5,
    zIndex: 10,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:15
  },
});


export default InternationalContributionModal;
