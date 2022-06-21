import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Styles from './styles';
// import
import Email from 'react-native-vector-icons/Zocial';
import Chat from 'react-native-vector-icons/Entypo';
import Settings from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {useSelector, useDispatch} from 'react-redux';
import {logoutuser} from '../../../../redux/actions';
import {SkillsList} from '../../../../lib/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gender from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(({USER}) => USER);
  const Count = 5;
  const [skills, setSkills] = useState([]);
  const {bottom, top} = useSafeAreaInsets();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SkillsList({
        Auth: userData.userData.token,
        id: userData.userData.userdata.id,
      }).then(res => {
        if (res.status == 'success') {
          setSkills(res.WorkerSkills);
        } else {
          setSkills([]);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({item}) => (
    <View style={Styles.Tag}>
      <Text style={Styles.TagTxt}>{item.category_name}</Text>
    </View>
  );
  console.log('userdata', userData);
  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={Styles.bg}>
        <View style={[Styles.HeaderTopView]}></View>
        <View style={Styles.EditTxtView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WorkeEditProfile')}>
            <Text style={Styles.EditTxt}>Edit</Text>
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
            style={{
              borderWidth: 0,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              width: '65%',
              //   backgroundColor: 'red',
            }}>
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
                  rating={userData.userData.userdata.total_rating}
                  fullStarColor={'white'}
                  starSize={12}
                />
              </View>
              <Text style={Styles.StartCountTxt}>
                {userData.userData.userdata.total_rating}
              </Text>
            </View>
          </View>
        </View>

        <View style={Styles.DetailsView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.SingleCard}>
              <Email
                name="email"
                size={25}
                color="#15096F"
                style={{marginRight: 15}}
              />
              <Text style={Styles.CardTxt}>
                {userData.userData.userdata.email}
              </Text>
            </View>
            <View style={[Styles.SingleCard, {height: 120}]}>
              <Image
                source={require('../../../../Assets/product-description.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 15,
                  tintColor: '#15096F',
                }}
              />
              <Text style={[Styles.CardTxt, {fontSize: 15, paddingRight: 25}]}>
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

            <View style={Styles.SingleCard}>
              <Gender
                name={
                  userData.userData.userdata.gender == 'Male'
                    ? 'gender-male'
                    : userData.userData.userdata.gender == 'Female'
                    ? 'gender-female'
                    : 'gender-male-female'
                }
                size={25}
                style={{marginRight: 20}}
                color={
                  userData.userData.userdata.gender == 'Male'
                    ? '#15096F'
                    : userData.userData.userdata.gender == 'Female'
                    ? '#F0529C'
                    : '#E7A201'
                }
              />

              <Text style={Styles.CardTxt}>
                {userData.userData.userdata.gender}
              </Text>
            </View>

            <View style={Styles.SingleCard}>
              <Image
                source={require('../../../../Assets/age.png')}
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 15,
                  tintColor: '#15096F',
                }}
              />
              <Text style={Styles.CardTxt}>
                {userData.userData.userdata.age}
              </Text>
            </View>
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
            </TouchableOpacity>

            <View style={Styles.SkillsCard}>
              <View style={Styles.insideSkillCard}>
                <Text style={[Styles.CardTxt, {fontSize: 14}]}>Skills</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WorkerSkillSet', 'Profile')
                  }>
                  <Text style={[Styles.CardTxt, {fontSize: 14}]}>
                    Add/Remove skills
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <FlatList
                data={skills}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={4}
              /> */}
              <View style={{}}>
                {skills.map(item => (
                  <View style={Styles.Tag}>
                    <Text style={Styles.TagTxt}>{item.category_name}</Text>
                  </View>
                ))}
              </View>
            </View>
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
