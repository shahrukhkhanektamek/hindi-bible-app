import React, { useContext, useEffect, useState } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { GlobalContext } from '../GlobalContext';

import { postData, apiUrl } from '../../Components/api';
import { useNavigation } from '@react-navigation/native';
import GradiantButton from '../Button/GradientButton';
const urls=apiUrl();

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

const LanguageModal = ({fetchDataList}) => {


    const navigation = useNavigation();

    const { extraData, languageModalVisible, setlanguageModalVisible } = useContext(GlobalContext);
    const [page, setPage] = useState(0);
    const [isLoading, setisLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => { 
        try {
        const response = await postData({}, urls.language, "GET", navigation, extraData, 1);
        if(response.status==200) 
        {
            setData(response.data);           
            setisLoading(false)
        }
        } catch (error) {
        console.error('Error fetching countries:', error);
        }
    };

    useEffect(() => {
    fetchData()
    },[])

    const handleChangeLanguage = (item) => {
        storage.set("language_id", String(item.id));
        storage.set("language_name", String(item.name));
        setlanguageModalVisible(false);
        fetchDataList();        
    };

    return (
    <Modal
        transparent={true}
        animationType="fade"
        visible={languageModalVisible}
        onRequestClose={() => {setlanguageModalVisible(false)}} // disable back button close
    >
        <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Language</Text> 


                {/* <View style={[styles.row]}> */}
                    {data.map((item) => (
                    <View style={[{width:'100%',marginBottom:10}]} key={item.id}>
                        <GradiantButton
                            key={item.id}
                            title={item.name}
                            title2={item?.name2}
                            count={0}
                            height="45"
                            width="100%"
                            gradientType={'orange'}
                            borderRadius={5}
                            fontSize={Number(item?.font_size)}
                            fontWeight="500"
                            onPress={() => handleChangeLanguage(item)}
                        />
                        </View>
                    ))}
                {/* </View> */}

            



            <TouchableOpacity 
                onPress={() => setlanguageModalVisible(false)} 
                style={styles.updateBtn}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
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

export default LanguageModal;
