import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import notifee, {AndroidStyle} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthSlice} from '../redux/Store';
import CustomModal from '../../components/common/CustomModel';
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
  }
}

async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      } else {
      }
    } catch (error) {}
  }
}

export const NotificationListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        importance: 4,
        vibrate: true,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    return unsubscribe;
  }, [dispatch]);
};

export {requestUserPermission, GetFCMToken};
