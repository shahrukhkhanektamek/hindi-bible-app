/* eslint-disable no-extra-semi */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const LinkItem = ({ title, source }) => {
  const handleOpenLink = () => {
    if (source?.uri) {
      Linking.openURL(source.uri).catch((err) => console.error("Couldn't open URL", err));
    };
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="link" size={50} color="#0088cc" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.mediaTitle}>{title}</Text>
        <TouchableOpacity onPress={handleOpenLink}>
          <Text style={styles.linkText}>{source.uri}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LinkItem;
