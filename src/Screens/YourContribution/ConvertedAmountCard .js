// ConvertedAmountCard.js
import React from 'react';
import { View, Text } from 'react-native';

const ConvertedAmountCard = ({ convertedAmount, convertion_fess, payment_type }) => {
  if (!convertedAmount || payment_type === 'india') return null;
  
  return (
    <View style={{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 5
        }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>Calculation Summary</Text>

        <Text>💵 Entered Amount:  ${convertedAmount.usd}</Text>
        <Text>💱 Converted to INR: ₹{convertedAmount.converted}</Text>
        <Text>🔁 Razorpay Fee ({convertion_fess}%): - ₹{convertedAmount.conversionFeeAmount}</Text>
        {/* <Text>💳 Razorpay Fee ({fees}%): - ₹{convertedAmount.razorpayFee}</Text> */}
        <Text>🧾 GST on Razorpay (18%): - ₹{convertedAmount.razorpayGST}</Text>

        <View style={{
            borderTopWidth: 1,
            marginTop: 10,
            paddingTop: 10,
            borderColor: "#ddd"
        }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
            Final Amount We Receive: ₹{convertedAmount.finalAmount}
            </Text>
        </View>
        </View>
  );
};

export default ConvertedAmountCard;