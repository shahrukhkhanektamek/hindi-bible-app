import { useEffect, useState, useRef } from 'react';
import { Keyboard, Dimensions, Platform } from 'react-native';

const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const screenHeight = Dimensions.get('window').height;

    const updateHeight = () => {
      const currentHeight = screenHeight - Dimensions.get('window').height;
      if (currentHeight > 0) {
        setKeyboardVisible(true);
        setKeyboardHeight(currentHeight);
      } else {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    };

    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      // Start interval to track height changes
      if (!intervalRef.current) {
        intervalRef.current = setInterval(updateHeight, 200);
      }
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    });

    const frameSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidChangeFrame',
      () => updateHeight()
    );

    return () => {
      showSub.remove();
      hideSub.remove();
      frameSub.remove();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight };
};

export default useKeyboard;
