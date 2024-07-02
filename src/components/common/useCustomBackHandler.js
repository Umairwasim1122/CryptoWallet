import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export const useCustomBackHandler = callback => {
  useEffect(() => {
    const handleBackPress = () => {
      if (callback) {
        callback();
        return true; // Return true to prevent default behavior (exit the app)
      }
      return false; // Continue with default behavior (allow navigation)
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [callback]);
};
