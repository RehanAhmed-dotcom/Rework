import React, {useEffect} from 'react';

import {View, Text, SafeAreaView, Image} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // write your functions
      navigation.navigate('StartScreen');
    }, 1000);
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#5B77D0'}}>
      <Image
        source={require('../../../../Assets/splash_icon.png')}
        style={{height: '100%', width: '100%'}}
      />
    </SafeAreaView>
  );
};
export default Splash;
