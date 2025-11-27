import { View, ScrollView, StyleSheet, Text, SafeAreaView, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import BACKGROUND_COLORS from '../../Constants/BackGroundColors';
import Button from '../../Components/Button/Button';
import GradiantButton from '../../Components/Button/GradientButton';
import { useNavigation } from '@react-navigation/native';

import { GlobalContext } from '../../Components/GlobalContext';
import PageLoding from '../../Components/PageLoding.js';
import { postData, apiUrl } from '../../Components/api';
const urls=apiUrl();


const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  const { extraData } = useContext(GlobalContext);
  const appSetting = extraData.appSetting;
  const userDetail = extraData.userDetail;


  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const onRefresh = useCallback(() => {
    // setPage(0);
    setRefreshing(true);
    setRefreshing(false); 
    fetchData(page);
  }, []);

  const fetchData = async () => { 
      try {
        const response = await postData({}, urls.packageHistory, "GET", navigation, extraData, 1);
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
    if (isLoading) {
      return ( 
          <PageLoding />          
      ); 
    }


    const priceFormat = (value, payment_type) => {
      if(payment_type==1)
        return `₹${parseFloat(value).toFixed(2)}`;
      else
        return '$'+`${parseFloat(value).toFixed(2)}`;
    };

  return (
    <SafeAreaView style={styles.safeContainer} >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <TouchableOpacity activeOpacity={1} >
          <View style={styles.heading}>
            <View style={styles.headingItem}>
              <Button
                title="ITEM"
                height="35"
                width="100%"
                fontSize={14}
                backgroundColor={BACKGROUND_COLORS.darkRed}
                borderRadius={0}
                borderColor="#000"
                borderWidth={1}
              />
            </View>
            <View style={styles.headingItem}>
              <Button
                title="PURCHASE"
                height="35"
                width="100%"
                fontSize={14}
                backgroundColor={BACKGROUND_COLORS.darkRed}
                borderRadius={0}
                borderColor="#000"
                borderWidth={1}
              />
            </View>
            <View style={styles.headingItem}>
              <Button
                title="EXPIRY"
                height="35"
                width="100%"
                fontSize={14}
                backgroundColor={BACKGROUND_COLORS.darkRed}
                borderRadius={0}
                borderColor="#000"
                borderWidth={1}
              />
            </View>
            <View style={styles.headingItem}>
              <Button
                title="AMOUNT"
                height="35"
                width="100%"
                fontSize={14}
                backgroundColor={BACKGROUND_COLORS.darkRed}
                borderRadius={0}
                borderColor="#000"
                borderWidth={1}
              />
            </View>
          </View>

          {data.map((item) => (
              <View style={styles.row} key={item.id}>
                <View style={styles.cell}>
                  <Text style={styles.cellText}>{item.p_type_text}</Text>
                </View> 
                <View style={styles.cell}>
                  <Text style={styles.cellText}>{item.start_date_time}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellText}>{item.end_date_time}</Text>
                </View>   
                <View style={styles.cell}> 
                  <Text style={styles.cellText}>{item.final_amount}</Text>
                </View>
              </View>
            ))}
            </TouchableOpacity>
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <GradiantButton
            title="Close"
            height="45"
            width="90%"
            gradientType="green"
            borderRadius={5}
            fontSize={16}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    borderWidth: 5,
    borderColor: BACKGROUND_COLORS.darkRed,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headingItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  contentItem: {
    flex: 1,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },

});

export default OrderHistoryScreen;
