import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';

const SearchInput = ({ value, onChangeText, onSearch, placeholder = 'Search...' }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Icon name="search" size={24} color={BACKGROUND_COLORS.green} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10,
    marginHorizontal: 25,
    height: 45,
    borderColor: '#999',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  searchButton: {
    borderLeftColor: '#999',
    borderLeftWidth: 1,
    borderRadius: 8,
    padding: 9,
    backgroundColor: '#eee',
  },
});

export default SearchInput;
