import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MyHTMLViewer from '../HTMLViewer';
const ForceUpdateModal = ({ forceUpdate }) => {
  return (
    <Modal
        transparent={true}
        animationType="slide"
        visible={!!forceUpdate}
        onRequestClose={() => {}} // disable back button close
    >
        <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Update Required</Text> 
            <Text style={styles.modalMsg}>
            A new version of the app is available. Please update to continue. 
            </Text>
            <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => Linking.openURL(forceUpdate?.update_url)}
            >
            <Text style={styles.updateBtnText}>Update Now</Text>
            </TouchableOpacity>
        </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center', alignItems: 'center'
    },
    modalBox: {
        width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10,
        alignItems: 'center'
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalMsg: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
    updateBtn: { backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 },
    updateBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default ForceUpdateModal;
