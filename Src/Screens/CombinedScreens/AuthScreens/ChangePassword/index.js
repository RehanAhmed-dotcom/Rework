import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Platform,
  Keyboard,
  Modal,
  TextInput,
} from 'react-native';
import Styles from './Styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../../../shared/Button';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {ChangePassword} from '../../../../lib/api';
import {ScrollView} from 'react-native-gesture-handler';
import {WaveIndicator} from 'react-native-indicators';
import {logoutuser} from '../../../../redux/actions';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
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
  const [showModal, setShowModal] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [oldPasserr, setOldPasserr] = useState('');
  const [passworderr, setPassworderr] = useState('');
  const [confirmPasserr, setConfirmPasserr] = useState('');
  const [samePassErr, setSamePassErr] = useState('');
  const userData = useSelector(({USER}) => USER);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const ChangePass = () => {
    if (oldPass && password && confirmPass) {
      if (oldPass == password || oldPass == confirmPass) {
        setSamePassErr("Old password can't be used as new passsword");
      } else {
        setShowModal(true);
        ChangePassword({
          Auth: userData.userData.token,
          password: oldPass,
          new_password: password,
          confirm_password: confirmPass,
        }).then(res => {
          if (res) {
            console.log('response of Chnage password Api ', res);
            if (res.status == 'success') {
              setShowModal(false);
              Alert.alert('Succesfuly Changed password');
              // navigation.goBack()
              logoutuser(false)(dispatch);
            } else {
              Alert.alert('Something went wrong');
              navigation.goBack();
              setShowModal(false);
            }
          } else {
            Alert.alert('Something went wrong while changing password');
            navigation.goBack();
            setShowModal(false);
          }
        });
      }
    } else if (!oldPass && !password && !confirmPass) {
      setOldPasserr('123');
      setPassworderr('123');
      setConfirmPasserr('123');
    } else if (!oldPass) {
      setOldPasserr('123');
    } else if (!password) {
      setPassworderr('123');
    } else if (!confirmPass) {
      setConfirmPasserr('123');
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={Styles.bg}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: Platform.OS == 'ios' ? 50 : 30, marginLeft: 15}}>
          <Icon name="left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={Styles.BigText}>Change Password</Text>

        <ScrollView>
          <View
            style={{
              marginTop: heightPercentageToDP(
                keyboardStatus == 'Keyboard Shown' ? 5 : 25,
              ),
              flex: 1,
              backgroundColor: '#F4F4FA',
            }}>
            <TextInput
              style={[
                Styles.input,
                {borderColor: oldPasserr ? 'red' : '#15096F'},
              ]}
              placeholder="Current Password"
              placeholderTextColor="lightgray"
              secureTextEntry
              value={oldPass}
              onChangeText={text => {
                setOldPass(text);
                oldPasserr && setOldPasserr('');
              }}
            />
            <TextInput
              style={[
                Styles.input,
                {borderColor: passworderr ? 'red' : '#15096F'},
              ]}
              placeholder="New Password"
              placeholderTextColor="lightgray"
              secureTextEntry
              value={password}
              onChangeText={text => {
                setPassword(text);
                passworderr && setPassworderr('');
              }}
            />
            <TextInput
              style={[
                Styles.input,
                {borderColor: confirmPasserr ? 'red' : '#15096F'},
              ]}
              placeholder="Confirm new password"
              placeholderTextColor="lightgray"
              secureTextEntry
              value={confirmPass}
              onChangeText={text => {
                setConfirmPass(text);
                confirmPasserr && setConfirmPasserr('');
              }}
            />
            <Text style={Styles.Error}>{samePassErr}</Text>
            <Button
              Title={'Update'}
              Btnstyle={{marginTop: 50, width: '80%'}}
              onpress={ChangePass}
            />
          </View>
          {myModal()}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
