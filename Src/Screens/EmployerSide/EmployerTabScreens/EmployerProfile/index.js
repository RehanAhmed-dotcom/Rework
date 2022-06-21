import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Arrow from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from 'react-native-vector-icons/Entypo';
import Settings from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {useSelector, useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {logoutuser} from '../../../../redux/actions';
import {updateRedux} from '../../../../lib/api';
const Index = ({navigation}) => {
  const userData = useSelector(({USER}) => USER);
  const [rating, setRating] = useState('');
  // console.log('user Data in profile employer .....', );
  const Count = 5;
  const dispatch = useDispatch();
  const {bottom, top} = useSafeAreaInsets();
  useEffect(() => {
    updateRedux({Auth: userData.userData.token}).then(res => {
      console.log('res', res);
      setRating(res.data);
    });
  });
  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={Styles.bg}>
        <View
          style={[
            Styles.EditTxtView,
            {marginTop: Platform.OS == 'ios' ? top : 30},
          ]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EmployeEditProfile')}>
            <Text style={[Styles.EditTxt, {fontFamily: 'Poppins-Medium'}]}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.ImageView}>
          <View style={Styles.PickerView}>
            <Image
              style={Styles.Picker}
              source={{uri: userData.userData.userdata.image}}
            />
          </View>

          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={Styles.MediumText}>
              {userData.userData.userdata.name}
            </Text>

            <Text style={Styles.EditTxt}>
              {userData.userData.userdata.email}
            </Text>
            <View
              style={{
                width: 60,
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{borderWidth: 0, width: 70}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  emptyStarColor={'white'}
                  rating={
                    rating ? rating : userData.userData.userdata.total_rating
                  }
                  fullStarColor={'white'}
                  starSize={12}
                />
              </View>
              <Text style={Styles.StartCountTxt}>
                {rating ? rating : userData.userData.userdata.total_rating}
              </Text>
            </View>
          </View>
        </View>

        <View style={Styles.DetailsView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.SingleCard}>
              <Image
                source={require('../../../../Assets/product-description.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 15,
                  tintColor: '#15096F',
                }}
              />
              <Text style={[Styles.CardTxt, {opacity: 0.6, fontSize: 14}]}>
                {userData.userData.userdata.description}
              </Text>
            </View>
            <View style={[Styles.SingleCard, {right: 8}]}>
              <Chat
                name="location-pin"
                size={30}
                color="#15096F"
                style={{marginRight: 20}}
              />
              <Text style={Styles.CardTxt}>
                {userData.userData.userdata.location}
              </Text>
            </View>
            {/* <TouchableOpacity style={Styles.SingleCard}
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Settings name="settings-sharp" size={25} color="#15096F" style={{ marginRight: 15, right: 3 }} />
                            <Text style={Styles.CardTxt}>Settings</Text>
                        </TouchableOpacity> */}

            <TouchableOpacity
              style={Styles.SingleCard}
              onPress={() => navigation.navigate('ChangePassword')}>
              <Image
                source={require('../../../../Assets/reset-password.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 15,
                  tintColor: '#15096F',
                }}
              />
              <Text style={[Styles.CardTxt, {fontSize: 14}]}>
                Change Password
              </Text>
              <Arrow
                name="arrow-right"
                size={25}
                color="#15096F"
                style={{marginLeft: 130}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[Styles.SingleCard, {borderBottomWidth: 0}]}
              onPress={() => logoutuser(false)(dispatch)}>
              <Image
                source={require('../../../../Assets/logout.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 15,
                  tintColor: '#15096F',
                  opacity: 0.6,
                }}
              />
              <Text style={[Styles.CardTxt, {opacity: 0.6, fontSize: 14}]}>
                Logout
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
};

export default Index;
