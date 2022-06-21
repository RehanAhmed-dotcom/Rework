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
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {getUser} from '../../../lib/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Index = ({navigation, route}) => {
  const item = route.params;
  const {bottom, top} = useSafeAreaInsets();
  const [fcm_token, setToken] = useState('');
  const [rating, setRating] = useState('');
  const {userData} = useSelector(({USER}) => USER);
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
          paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
          height: '35%',
          backgroundColor: '#F4F4FA',
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
              marginTop: 60,
              backgroundColor: '#F4F4FA',
              height: '100%',
            }}>
            <View style={Styles.InputView}>
              <Text style={Styles.ProfessionTxt}>{item.category_name}</Text>
            </View>
            <View style={Styles.InputView}>
              <Text style={Styles.ProfessionTxt}>{item.location}</Text>
            </View>
            <View style={Styles.InputView}>
              <Text style={Styles.ProfessionTxt}>{item.Experience} years</Text>
            </View>
            <View style={Styles.InputViewPeragraph}>
              <Text style={Styles.ProfessionTxt}>{item.Description}</Text>
            </View>
            {userData.userdata.type == 'worker' && (
              <TouchableOpacity
                style={Styles.ModalBtn}
                onPress={() =>
                  navigation.navigate('Chat', {
                    item,
                    searcing: item.category_name,
                    fcm_token,
                    rating,
                  })
                }>
                <Text style={Styles.ModalBtnTxt}>Chat</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
