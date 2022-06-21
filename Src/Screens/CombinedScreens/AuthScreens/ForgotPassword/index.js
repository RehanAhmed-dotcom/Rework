import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Styles from './Styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../../../shared/Button';
import {forgetpassword} from '../../../../lib/api';
import {WaveIndicator} from 'react-native-indicators';

const Index = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Emailerr, setEmailerr] = useState('');
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
        {/* <WaveIndicator color="#5B77D0" size={150} /> */}
        <ActivityIndicator color="#5B77D0" size="large" />
      </View>
    </Modal>
  );
  const ApiHAndler = () => {
    if (Email) {
      setShowModal(true);
      forgetpassword({email: Email}).then(res => {
        console.log('Email send response Api', res);
        if (res) {
          if (res.status == 'success') {
            setShowModal(false);
            navigation.navigate('PassCode', Email);
          } else {
            setShowModal(false);
            Alert.alert('Something went wrong please try again !');
          }
        } else {
          setShowModal(false);
          Alert.alert('Something went wrong please try again !');
        }
      });
    } else if (!Email) {
      setEmailerr('123');
    }
  };

  // () => navigation.navigate('PassCode')
  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={Styles.bg}>
        <Text style={Styles.BigText}>Forgot Password</Text>
        <ScrollView
          style={{
            marginTop: heightPercentageToDP(22),
            flex: 1,
            backgroundColor: '#F4F4FA',
            paddingHorizontal: 10,
          }}>
          <Text style={Styles.MediumText}>
            Enter your Email to recive 4 digit pin code
          </Text>
          <TextInput
            style={[Styles.input, {borderColor: Emailerr ? 'red' : '#15096F'}]}
            placeholder="Enter Email"
            placeholderTextColor="lightgray"
            value={Email}
            onChangeText={text => {
              setEmail(text), Emailerr && setEmailerr('');
            }}
          />

          <Button
            Title={'Send'}
            Btnstyle={{marginTop: 130, width: '80%'}}
            onpress={ApiHAndler}
          />
          {myModal()}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
