import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Styles from './Styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {CounterPlus, getUser} from '../../../lib/api';
import Dir from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = ({navigation, route}) => {
  const item = route.params;
  console.log('item', item);
  const {userData} = useSelector(({USER}) => USER);

  const {bottom, top} = useSafeAreaInsets();
  const [fcm_token, setToken] = useState('');
  const [rating, setRating] = useState('');
  // console.log('item in worker details', item);
  useEffect(() => {
    getUser({Auth: userData.token, email: item.email}).then(res => {
      console.log('res', res);
      setToken(res.data.fcm_token);
      setRating(res.data.total_rating);
    });
  }, []);
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{
          flex: 1,
          height: '35%',
          backgroundColor: '#F4F4FA',
          paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
        }}
        resizeMode="stretch">
        <View style={Styles.HeaderTopView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color="white" />
          </TouchableOpacity>
          <Image
            source={require('../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={Styles.BigText}>Job Details</Text>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 100,
              backgroundColor: '#F4F4FA',
              height: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmployerProfielShow', item)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{color: '#5B77D0', fontFamily: 'Poppins-SemiBold'}}>
                  Visit Employer profile
                </Text>
                <Dir name="directions" size={25} color="#5B77D0" />
              </View>
            </TouchableOpacity>
            <View style={Styles.InputView}>
              <Text style={Styles.ProfessionTxt}>{item.category_name}</Text>
            </View>
            <View style={Styles.InputView}>
              <Text style={Styles.ProfessionTxt}>{item.location}</Text>
            </View>
            <View style={Styles.InputView}>
              <Text style={Styles.ProfessionTxt}>{item.experience} years</Text>
            </View>
            <TouchableOpacity
              style={Styles.InputViewPeragraph}
              onPress={() => console.log(userData.userdata.type)}>
              <Text style={Styles.ProfessionTxt}>{item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.ModalBtn}
              onPress={() => {
                CounterPlus({
                  Auth: userData.token,
                  id: item.id,
                }).then(res => {
                  console.log('response of Counter Plus Api ', res);
                });
                navigation.navigate('Chat', {
                  item,
                  searcing: item.category_name,
                  fcm_token,
                });
              }}>
              <Text style={Styles.ModalBtnTxt}>Chat</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
