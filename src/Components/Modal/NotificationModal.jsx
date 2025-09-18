import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MyHTMLViewer from '../HTMLViewer';
const NotificationModal = ({ modalVisible, setModalVisible, notificationData }) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {notificationData.image ? (
            <Image source={{ uri: notificationData.image }} style={styles.modalImage} />
          ) : null}
          <Text style={styles.modalTitle}>{notificationData.title}</Text>
          
            <MyHTMLViewer
                htmlContent ={notificationData.body}
                style={styles.modalBody}
            />
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:10,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotificationModal;
