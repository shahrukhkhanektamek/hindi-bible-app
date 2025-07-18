import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import GradiantButton from '../../Components/Button/GradientButton';
import Button from '../../Components/Button/Button';

const PdfDownloadScreen = () => {
  const navigation = useNavigation();

  const pdfFiles = [
    {
      title: 'TGC Learning Guide',
      fileName: 'tgc_learning_guide.pdf',
      fileSize: '2.3 MB',
      fileUrl: 'https://example.com/tgc_learning_guide.pdf',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
    {
      title: 'React Native Handbook',
      fileName: 'react_native_handbook.pdf',
      fileSize: '3.1 MB',
      fileUrl: 'https://example.com/react_native_handbook.pdf',
      image: require('../../Assets/videoThumbnail.jpeg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TopBarPrimary />
      </View>

      <View style={styles.buttonTop}>
        <GradiantButton
          title="Home"
          height="30"
          width="20%"
          gradientType="yellow"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Home')}
        />
        <GradiantButton
          title="Menu"
          height="30"
          width="20%"
          gradientType="blue"
          borderRadius={5}
          fontSize={15}
          onPress={() => navigation.navigate('Main')}
        />
        <GradiantButton
          title="Log Out"
          height="30"
          width="20%"
          gradientType="red"
          borderRadius={5}
          fontSize={15}
        />
        <GradiantButton
          title="Back"
          height="30"
          width="20%"
          fontSize={15}
          gradientType="purple"
          borderRadius={5}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="PDF / JPEG Download"
          height="40"
          width="50%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>

      <View style={styles.pdfWrapper}>
        {pdfFiles.map((pdf, index) => (
          <View key={index} style={styles.pdfContainer}>
            <Image source={pdf.image} style={styles.pdfImage} />
            <Text style={styles.pdfTitle}>{pdf.title}</Text>
            <TouchableOpacity style={styles.downloadButton} onPress={() => Linking.openURL(pdf.fileUrl)}>
              <FontAwesome name="download" size={20} color="#fff" />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
    marginTop: 5,
    marginBottom: 8,
  },
  buttonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  pdfWrapper: {
    padding: 16,
  },
  pdfContainer: {
    backgroundColor: BACKGROUND_COLORS.deepBrown,
    padding: 16,
    paddingTop: 0,
    borderRadius: 8,
    marginBottom: 16,
  },
  pdfImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  pdfTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 8,
  },
  downloadButton: {
    width: '41%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#068aca',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  downloadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default PdfDownloadScreen;
