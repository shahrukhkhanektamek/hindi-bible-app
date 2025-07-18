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

const BeforeFreeTrialModal = ({ visible, onClose }) => {
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
              <Text style={styles.message}>Agar aap is content ko play karna chaahte hain to kripaya neeche FREE TRIAL par click karke Free Registration kijiye.</Text>
              <View style={styles.buttonBottom}>
              <GradiantButton
                  title="Menu"
                  height="35"
                  width="40%"
                  gradientType="blue"
                  borderRadius={5}
                  onPress={() => {
                    onClose();
                    navigation.navigate('Login');
                  }}
                />
                <GradiantButton
                  title="Free Trial"
                  height="35"
                  width="40%"
                  gradientType="green"
                  borderRadius={5}
                  onPress={() => {
                    onClose();
                    navigation.navigate('Register',{show_case:1});
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
    marginVertical: 30,
    textAlign: 'center',
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
  },
});


export default BeforeFreeTrialModal;
