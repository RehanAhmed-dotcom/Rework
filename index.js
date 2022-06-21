import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { Store, persistor } from './Src/redux/store';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import PushNotificationConfig from './Src/config/PushNotificationConfig';
import SplashScreen from 'react-native-splash-screen';
const Application = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
};
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background! inside index', remoteMessage);
    PushNotification.localNotification(remoteMessage);
});
PushNotificationConfig.congigurations()
AppRegistry.registerComponent(appName, () => Application);
