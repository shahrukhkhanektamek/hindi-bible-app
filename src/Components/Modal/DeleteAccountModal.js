import React, { useContext, useEffect, useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Linking,
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { GlobalContext } from '../GlobalContext';
import { postData, apiUrl } from '../../Components/api';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

const DeleteAccountModal = ({ handleDeleteAccount }) => {
  const navigation = useNavigation();
  const {  deleteAccountModalVisible, setdeleteAccountModalVisible } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={deleteAccountModalVisible}
      onRequestClose={() => setdeleteAccountModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalSubtitle}>This action cannot be undone</Text>
          </View>

          {/* Warning Icon */}
          <View style={styles.warningIconContainer}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningText}>!</Text>
            </View>
          </View>

          {/* Warning Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.warningMessage}>
              Deleting your account will permanently remove:
            </Text>
            <View style={styles.bulletPoints}>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Your profile information</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>All your order history</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Saved preferences and settings</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Any unused credits or rewards</Text>
              </View>
            </View>
          </View>

          

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]}
              onPress={() => setdeleteAccountModalVisible(false)}
            >
              <Text style={styles.deleteButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.cancelButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    backgroundColor: '#FF3B30',
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  warningIconContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  warningIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFE5E3',
  },
  warningText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  messageContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  warningMessage: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  bulletPoints: {
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
    padding: 16,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
    marginTop: 8,
    marginRight: 10,
  },
  bulletText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    lineHeight: 20,
  },
  languageContainer: {
    maxHeight: 200,
    marginHorizontal: 24,
    marginBottom: 20,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  languageItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  languageText: {
    fontSize: 15,
    color: '#333333',
  },
  loader: {
    marginVertical: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default DeleteAccountModal;