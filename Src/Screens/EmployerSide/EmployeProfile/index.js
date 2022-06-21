import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Email from 'react-native-vector-icons/Zocial';
import Chat from 'react-native-vector-icons/Entypo';
import Settings from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {useSelector} from 'react-redux';
const Index = ({navigation}) => {
  const userType = useSelector(({APPSTATE}) => APPSTATE);
  const Count = 5;
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={Styles.bg}>
        <View style={Styles.HeaderTopView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="circle-with-cross" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={Styles.EditTxtView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EmployeEditProfile')}>
            <Text style={Styles.EditTxt}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.ImageView}>
          <View style={Styles.PickerView}>
            <Image
              style={Styles.Picker}
              source={require('../../../Assets/profile.jpg')}
            />
            <View
              style={{
                width: 60,
                alignSelf: 'center',
                top: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{borderWidth: 0, width: 70}}>
                <StarRating
                  disabled={false}
                  // emptyStar={'ios-star-outline'}
                  // fullStar={'ios-star'}
                  // halfStar={'ios-star-half'}
                  // iconSet={'Ionicons'}
                  maxStars={5}
                  emptyStarColor={'white'}
                  rating={Count}
                  // selectedStar={(rating) => this.onStarRatingPress(rating)}
                  fullStarColor={'white'}
                  starSize={12}
                />
              </View>
              <Text style={Styles.StartCountTxt}>5.0</Text>
            </View>
          </View>

          <View style={{bottom: 7}}>
            <Text style={Styles.MediumText}>Terry Cook</Text>
            {userType.userType == 'employer' ? (
              <Text style={Styles.EditTxt}>Employer</Text>
            ) : (
              <Text style={Styles.EditTxt}>123@gmail.com</Text>
            )}
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
              <Text style={Styles.CardTxt}>Christine.murphy @mail.com</Text>
            </View>
            <View style={Styles.SingleCard}>
              <Image
                source={require('../../../Assets/product-description.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 15,
                  tintColor: '#15096F',
                }}
              />
              <Text style={[Styles.CardTxt, {opacity: 0.6, fontSize: 14}]}>
                Lorem ipsum Lorem ipsu Lorem...
              </Text>
            </View>
            <View style={Styles.SingleCard}>
              <Chat
                name="chat"
                size={25}
                color="#15096F"
                style={{marginRight: 15}}
              />
              <Text style={Styles.CardTxt}>Chat</Text>
            </View>
            <View style={[Styles.SingleCard, {right: 8}]}>
              <Chat
                name="location-pin"
                size={30}
                color="#15096F"
                style={{marginRight: 20}}
              />
              <Text style={Styles.CardTxt}>christine street London</Text>
            </View>
            <TouchableOpacity
              style={Styles.SingleCard}
              onPress={() => navigation.navigate('Settings')}>
              <Settings
                name="settings-sharp"
                size={25}
                color="#15096F"
                style={{marginRight: 15, right: 3}}
              />
              <Text style={Styles.CardTxt}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.SingleCard, {borderBottomWidth: 0}]}
              onPress={() => navigation.navigate('Login')}>
              <Image
                source={require('../../../Assets/logout.png')}
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
