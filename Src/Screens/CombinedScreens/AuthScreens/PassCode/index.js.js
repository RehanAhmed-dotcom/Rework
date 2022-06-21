import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Modal,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Styles from './Styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../../../shared/Button';
import {verifyotp} from '../../../../lib/api';
import {WaveIndicator} from 'react-native-indicators';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const Index = ({navigation, route}) => {
  const Email = route.params;
  const [value, setValue] = useState('');
  const [valueErr, setValueErr] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [showModal, setShowModal] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
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
  const ApiHandler = () => {
    if (value) {
      setShowModal(true);
      verifyotp({token: value}).then(res => {
        console.log('response of verify otp api ', res);
        if (res) {
          if (res.status == 'success') {
            setShowModal(false);
            navigation.navigate('NewPassword', {Email, value});
          } else {
            setShowModal(false);
            Alert.alert('Something went wrong please try again !');
          }
        } else {
          setShowModal(false);
          navigation.navigate('ForgotPassword'),
            Alert.alert('Something went wrong please try again !');
        }
      });
    }
  };

  const CELL_COUNT = 4;
  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={Styles.bg}>
        <Text style={Styles.BigText}>Forgot Password</Text>
        <ScrollView
          style={{
            marginTop: heightPercentageToDP(23),
            flex: 1,
            backgroundColor: '#F4F4FA',
            paddingHorizontal: 10,
          }}>
          <Text style={Styles.MediumText}>
            Enter 4 digit code that we have sent you on your Email
          </Text>
          <KeyboardAvoidingView behavior="position">
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={Styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    Styles.cell,
                    isFocused && Styles.focusCell,
                    {borderColor: valueErr ? 'red' : '#15096F'},
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </KeyboardAvoidingView>

          <Button
            Title={'Send'}
            Btnstyle={{marginTop: 130, width: '80%'}}
            onpress={ApiHandler}
          />
          {myModal()}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
