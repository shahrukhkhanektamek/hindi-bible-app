import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TopBarPrimary from '../../Components/TopBar/TopBarPrimary';
import GradiantButton from '../../Components/Button/GradientButton';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import Button from '../../Components/Button/Button';
import SearchInput from '../../Components/Search/SearchInput';
import Pdf from '../../Components/Pdf/Pdf';
import Article from '../../Components/Article/Article';

const ArticleScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    Alert.alert('Search Submitted', `You searched for: "${search}"`);
  };

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
          title="Articles"
          height="40"
          width="30%"
          fontSize={15}
          backgroundColor={BACKGROUND_COLORS.green}
          borderRadius={5}
        />
      </View>

      <SearchInput
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
      />

      <Article
        imageSource={require('../../Assets/videoThumbnail.jpeg')}
        description="How to learn coding in easy way, If you are using a custom button component, ensure it accepts and applies the style prop correctly."
        title="If you are using a custom button..."
        links={[
          'https://www.youtube.com',
          'https://www.youtube.com',
          'https://www.youtube.com',
        ]}
      />

      <View style={styles.pdfWrapper}>
        {[1, 2, 3].map((_, index) => (
          <Pdf
            key={index}
            title={`TGC Learning Guide ${index + 1}`}
            fileName="tgc_learning_guide.pdf"
            fileSize="2.3 MB"
            fileUrl="https://example.com/tgc_learning_guide.pdf"
          />
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
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
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
    paddingHorizontal: 16,
  },
});

export default ArticleScreen;
