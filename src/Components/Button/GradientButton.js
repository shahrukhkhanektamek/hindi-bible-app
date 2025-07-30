import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GRADIENT_COLORS from '../../Constants/GradientColors.js';

const GradiantButton = ({
  title,
  title2,
  onPress,
  gradientType = 'orange',
  color = '#fff',
  width = '100%',
  height = 40,
  borderColor = '#000',
  borderWidth = 0,
  borderRadius = 5,
  fontSize = 14,
  fontWeight = '500',
  count=0
}) => {
  const colors = GRADIENT_COLORS[gradientType] || GRADIENT_COLORS.orange;

  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, { width, height, borderColor, borderWidth, borderRadius }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {count?(
            <View style={styles.countWrapper}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          ): null
          }
      <LinearGradient
        colors={colors}
        style={[styles.gradient, { borderRadius }]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color, fontSize, fontWeight }]}>{title}</Text>
          {title2 ? <Text style={[styles.text, { color, fontSize, fontWeight }]}>{title2}</Text> : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    overflow: 'hidden',
    position:'relative'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    position:'relative'
  },
  text: {
    textAlign: 'center',
  },
  countWrapper:{
    position:'absolute',
    width:'100%',
    height:'100%',
    top:0,
    zIndex:1,
    textAlign:'right',
    justifyContent:'space-between'
  },
  countText: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    width: 20,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft:2,
    marginTop:2,
},
});

export default GradiantButton;
