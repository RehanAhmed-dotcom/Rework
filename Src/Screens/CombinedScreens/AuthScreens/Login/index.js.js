import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../../../shared/Button';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/Entypo';
import {login} from '../../../../lib/api';
import {logged} from '../../../../redux/actions';
import {WaveIndicator} from 'react-native-indicators';
import {useDispatch} from 'react-redux';
const StartScreen = ({navigation, route}) => {
  const [showModal, setShowModal] = useState(false);
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Emailerr, setEmailerr] = useState('');
  const [passworderr, setPassworderr] = useState('');
  const dispatch = useDispatch();
  const loginApiHandler = () => {
    if (Email && password) {
      setShowModal(true);
      login({email: Email, password: password}).then(res => {
        {
          console.log('login', res);
          if (res.status == 'success') {
            logged(res)(dispatch);
            setShowModal(false);
            navigation.navigate(
              res.userdata.type == 'Employer'
                ? 'TabNavigator'
                : 'WorkerTabNavigator',
            );
          } else {
            setShowModal(false);
            Alert.alert('invalid Email or password !');
          }
        }
      });
    } else if (!Email && !password) {
      setEmailerr('123');
      setPassworderr('123');
    } else if (!Email) {
      setEmailerr('123');
    } else if (!password) {
      setPassworderr('123');
    }
  };
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
  return (
    <>
      <SafeAreaView style={Styles.MainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.HeaderTopView}>
            <Icon name="chevron-small-left" size={25} color="white" />
            <Image
              source={require('../../../../Assets/Logo.png')}
              style={Styles.smallLogo}
              resizeMode="contain"
            />
          </View>
          <Text style={Styles.BigText}>Login</Text>
          <Text style={[Styles.SignUpText, {marginBottom: 100}]}>
            {/* Please Login Here */}
          </Text>

          <TextInput
            style={[Styles.input, {borderColor: Emailerr ? 'red' : '#15096F'}]}
            placeholder="Email Id"
            placeholderTextColor="lightgray"
            value={Email}
            onChangeText={text => {
              setEmail(text), Emailerr && setEmailerr('');
            }}
          />
          <TextInput
            style={[
              Styles.input,
              {borderColor: passworderr ? 'red' : '#15096F'},
            ]}
            placeholder="Password"
            placeholderTextColor="lightgray"
            secureTextEntry
            value={password}
            onChangeText={text => {
              setPassword(text), passworderr && setPassworderr('');
            }}
          />
          <View style={Styles.RecoverView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={Styles.RecoverTxt}>Recover Code</Text>
            </TouchableOpacity>
          </View>
          <Button
            Title={'Login'}
            navigation={navigation}
            onpress={loginApiHandler}
            Btnstyle={{marginTop: 100}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={Styles.Logintext}>
              Don't have an account ? click here to{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('WellcomeScreen')}>
              <Text style={Styles.LoginTouch}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {myModal()}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default StartScreen;
