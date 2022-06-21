import React, {useState, useEffect} from 'react';
import Root from './Src/Navigator/root';
import {useDispatch} from 'react-redux';
import {fcm} from './Src/redux/actions';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import './Src/i18';
import {Platform} from 'react-native';

const App = () => {
  const [badge, setBadge] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('called on every time app awake');
    getToken();
    getNotifications();
    Platform.OS == 'android' && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
      Platform.OS === 'ios' &&
        PushNotificationIOS.setApplicationIconBadgeNumber(1);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {});
    return unsubscribe;
  }, []);

  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    console.log('i got fcm', fcmToken);
    if (fcmToken) {
      try {
        fcm(fcmToken)(dispatch);
      } catch (e) {
        'Error in dispatching fcm to redux', e;
      }
    }
  };
  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => {
      // setBadge(0);
    });
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {});
  };

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log('created channel', created),
    );
  };
  return <Root />;
};
export default App;
