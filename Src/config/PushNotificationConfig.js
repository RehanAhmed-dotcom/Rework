import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as RootNavigation from './NavigationService';

const PushNotificationsConfigs = {
  congigurations: () => {
    PushNotification.configure({
      onNotification: notification => {
        console.log(
          'called on notification',
          JSON.parse(notification.data.guestData),
        );
        console.log(
          'called on notification',
          JSON.parse(notification.data.item),
        );
        // console.log()
        // PushNotificationIOS.setApplicationIconBadgeNumber(2);
        // Platform.OS === 'ios' &&
        //   PushNotificationIOS.setApplicationIconBadgeNumber(8);
        const clicked = notification.userInteraction;
        if (clicked) {
          // RootNavigation.navigate('Notifications');
          console.log(
            'called on notification2',
            JSON.parse(notification.data.item),
          );
          console.log('called on notification3', notification.data.fcm_token);
          RootNavigation.navigate1('Chat', {
            item: JSON.parse(notification.data.item),
            fcm_token: notification.data.fcm_token,
          });
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onRegistrationError: err => {},
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  },
};
export default PushNotificationsConfigs;
