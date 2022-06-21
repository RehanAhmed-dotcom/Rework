import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Styles from './Styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../../../shared/Button';
import {passwordreset} from '../../../../lib/api';
import {WaveIndicator} from 'react-native-indicators';

const Index = ({navigation, route}) => {
  const [showModal, setShowModal] = useState(false);
  const myModal = () => (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000088',
        }}>
        <ActivityIndicator color="#5B77D0" size="large" />
        {/* <WaveIndicator color="#5B77D0" size={150} /> */}
      </View>
    </Modal>
  );
  const {Email, value} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  console.log('value in new password', Email, value);

  const ApiHandler = () => {
    if (password && confirmPassword) {
      setShowModal(true);
      passwordreset({
        email: Email,
        password: password,
        confirm_password: confirmPassword,
        token: value,
      }).then(res => {
        console.log('response of new password api ', res);
        if (res) {
          if (res.status == 'success') {
            setShowModal(false);
            Alert.alert('Password Changed Successfuly!');
            navigation.navigate('Login');
          } else {
            setShowModal(false);
            Alert.alert('Something went wrong please try again !');
          }
        } else {
          setShowModal(false);
          Alert.alert('Something went wrong please try again !');
        }
      });
    } else if (!password && !confirmPassword) {
      setPasswordErr('123');
      setConfirmPasswordErr('123');
    } else if (!password) {
      setPasswordErr('123');
    } else if (!confirmPassword) {
      setConfirmPassword('123');
    }
  };
  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={Styles.bg}>
        <Text style={Styles.BigText}>Reset Password</Text>
        <ScrollView
          style={{
            marginTop: heightPercentageToDP(20),
            flex: 1,
            backgroundColor: '#F4F4FA',
            paddingHorizontal: 10,
          }}>
          <Text style={Styles.MediumText}>Enter your new password</Text>
          <TextInput
            style={[
              Styles.input,
              {borderColor: passwordErr ? 'red' : '#15096F'},
            ]}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="lightgray"
            value={password}
            onChangeText={text => {
              setPassword(text), passwordErr && setPasswordErr('');
            }}
          />
          <TextInput
            style={[
              Styles.input,
              {borderColor: confirmPasswordErr ? 'red' : '#15096F'},
            ]}
            placeholder="Confirm Password"
            placeholderTextColor="lightgray"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text),
                confirmPasswordErr && setConfirmPasswordErr('');
            }}
          />

          <Button
            Title={'Reset'}
            Btnstyle={{marginTop: 70, width: '80%'}}
            onpress={ApiHandler}
          />
        </ScrollView>
        {myModal()}
      </ImageBackground>
    </>
  );
};

export default Index;
