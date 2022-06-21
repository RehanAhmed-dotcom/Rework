import React, { useState, useEffect } from 'react';
import { View, Text, Image, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../shared/Button'
import Styles from './Styles';
import { setUserType } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
const StartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>

      <View style={Styles.MainView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Text style={Styles.Wellcom}>WELCOME</Text>
          <Image source={require('../../../Assets/LogoWhite.png')} style={Styles.LogoImg} resizeMode="contain" />
          <Text style={Styles.CategoryTxt}>Select your category to find or {'\n'} post jobs.</Text>

          <Button Title={'Employer'} navigation={navigation}
            onpress={() => {
              setUserType("Employer")(dispatch)
              navigation.navigate('Signup')
            }}

            Btnstyle={Styles.BtnExtraStyle}
            Txtstyle={Styles.BtnTxtExtraStyle}
          />
          <Button Title={'Worker'} navigation={navigation}
            onpress={() => {
              setUserType("worker")(dispatch)
              navigation.navigate('Signup')
            }}
            Btnstyle={{ backgroundColor: '#5B77D0', borderWidth: 1, borderColor: 'white' }}
            Txtstyle={{ color: '#fff' }}
          />


        </ScrollView>
      </View>

    </>
  );
}

export default StartScreen;

