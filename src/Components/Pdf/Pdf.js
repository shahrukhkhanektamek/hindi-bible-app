import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';

const Pdf = ({ title, fileName, fileSize, fileUrl }) => {
  return (
    <View style={styles.pdfContainer}>
      <FontAwesome name="file-pdf-o" size={35} color="red" />
      <View style={styles.pdfInfo}>
        <Text style={styles.pdfTitle}>{title}</Text>
        {(fileName?
        <Text style={styles.pdfDetails}>{fileName} • {fileSize}</Text>
          :null
          )}
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(fileUrl)}>
        <FontAwesome name="download" size={30} color="#555" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BACKGROUND_COLORS.white,
    padding: 15,
    marginBottom: -10,
    borderRadius: 5,
  },
  pdfInfo: {
    flex: 1,
    marginLeft: 10,
  },
  pdfTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  pdfDetails: {
    fontSize: 14,
    color: '#777',
  },
});

export default Pdf;
