import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';
import { postData, apiUrl } from './api';
const urls=apiUrl();

const CountryPicker = ({ selectedCountry, setSelectedCountry, setCountryCode }) => {

  const { extraData } = useContext(GlobalContext);
  const navigation = useNavigation(); 

  
 
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCountryName, setSelectedCountryName] = useState();

  

  useEffect(() => {
    fetchPickerData('');
    if(modalVisible)
    {
      setSelectedCountryName('');
      setSelectedCountry('');
    }
    }, [modalVisible]);

  const fetchPickerData = async () => { 
    try {
      
      const response = await postData([], urls.country,"GET", navigation,extraData);
      const data = response.data;
      // const data = [
      //   { "id":"99","name": "India"}
      // ]; 
  

      // console.log(data) 
      data.forEach(item => { 
        if(item.id==selectedCountry)
        {
          setSelectedCountryName(item.name);
          setSelectedCountry(item.id);
          setCountryCode(item.phonecode);
        }
        
      });

      setCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  // ✅ Search filter logic
  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = countries.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filteredData);
  };

  // ✅ Country select karna
  const handleSelect = (country) => {
    setSelectedCountryName(country.name);
    setSelectedCountry(country.id);
    setCountryCode(country.phonecode);
    setModalVisible(false);
  };
  

  return (
    <View> 
      {/* ✅ Input Field to Open Modal */}
      <TouchableOpacity
        onPress={() => {setModalVisible(true)}} 
        style={[styles.inputContainer]}>
        <Text>{selectedCountryName || 'Select Country'}</Text>
        <Icon name="caret-down" size={15} color={'#555'} style={styles.inputIcon} />
      </TouchableOpacity>

      {/* ✅ Modal for Searchable Dropdown */}
      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => {setModalVisible(false)}}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            
            {/* ✅ Search Box */}
            <TextInput
              placeholder="Search Country..."
              value={search}
              onChangeText={handleSearch}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
            />

            {/* ✅ Show Countries List */}
            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <FlatList style={[styles.options]}
                data={filteredCountries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)} 
                    style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Text>{item.flag} {item.name} </Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {/* ✅ Close Button */}
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
inputContainer:{
  flexDirection:'row',
  width:"100%",
  height:50,
  alignItems:'center',
  textAlign:'left',
  justifyContent:'space-between',
  paddingHorizontal:10
},
options:{
  height:200,
}
});

export default CountryPicker;


