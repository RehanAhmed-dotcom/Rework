import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Text, Image, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../../shared/Button';
import Styles from './Styles';
// import {useTranslation} from 'react-i18next';
import {Checkbox} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
const StartScreen = ({navigation}) => {
  const [termCheck, setTermCheck] = React.useState(false);
  const [privacyChek, setPrivacyCheck] = React.useState(false);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  // const {t, i18n} = useTranslation();
  return (
    <>
      {/* <ScrollView> */}
      <SafeAreaView style={Styles.MainView}>
        <Image
          source={require('../../../Assets/Logo.png')}
          style={Styles.LogoImg}
          resizeMode="contain"
        />
        <Text style={[Styles.SignUpText, {marginBottom: 0}]}>
          {/* {t('Sign up for a free account to')} */}
          Sign up for a free account to
        </Text>
        <Text style={Styles.SignUpText}>
          {/* {t('find a post or job')} */}
          find a post or job
        </Text>

        <Image
          source={require('../../../Assets/manimg.png')}
          style={Styles.manImg}
          resizeMode="contain"
        />

        <Button
          Title={'Sign Up'}
          navigation={navigation}
          onpress={() => {
            // privacyChek && termCheck ?
            //   navigation.navigate('WellcomeScreen') :
            //   Alert.alert("You have to agree the terms and conditions for further processing")
            navigation.navigate('WellcomeScreen');
            // i18n.changeLanguage('en');
          }}
        />
        <Button
          Title={'Login'}
          navigation={navigation}
          onpress={() => navigation.navigate('Login')}
        />
        {/* <View style={Styles.CheckView}>
            <Checkbox
              status={termCheck ? 'checked' : 'unchecked'}
              onPress={() => {
                setTermCheck(!termCheck);
              }}
              uncheckedColor='#15096F'
              color="#15096F"
            />
            <TouchableOpacity style={{ right: 45 }}
              onPress={() => navigation.navigate('About')}>
              <Text style={Styles.checkTxt}>You are agree with term of usage</Text>
            </TouchableOpacity>
          </View> */}

        {/* <View style={[Styles.CheckView, { marginTop: 0 }]}>
            <Checkbox
              status={privacyChek ? 'checked' : 'unchecked'}
              onPress={() => {
                setPrivacyCheck(!privacyChek);
              }}
              uncheckedColor='#15096F'
              color="#15096F"

            />
            <View style={{ flexDirection: 'row', left: 5 }}>
              <Text style={Styles.checkTxt}>You are agree with </Text>
              <TouchableOpacity >
                <Text style={Styles.checkTxtBold}
                  onPress={() => navigation.navigate('Terms')}
                >Terms</Text></TouchableOpacity>
              <Text style={Styles.checkTxt}> & </Text>
              <TouchableOpacity><Text style={Styles.checkTxtBold}
                onPress={() => navigation.navigate('Privacy')}
              >Privacy policy</Text></TouchableOpacity>
            </View>
          </View> */}
      </SafeAreaView>
      {/* </ScrollView> */}
    </>
  );
};

export default StartScreen;
