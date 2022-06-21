import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Styles from './Styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Entypo';
const Index = ({navigation, route}) => {
  const Count = 5;
  const {item} = route.params;
  const ratings = route?.params.ratings;
  const emp = route?.params?.emp;
  const user = route.params.user;
  console.log('item in All reviews ', ratings, item);
  const swipableRender = ({item}) => (
    <View style={Styles.ReviewBox}>
      <View style={Styles.ReviewBoxTopView}>
        <Image style={Styles.Picker2} source={{uri: item.giveruser.image}} />

        <View style={[Styles.nameView, {right: 20}]}>
          <Text style={Styles.MediumText}>{item.giveruser.name}</Text>
          {/* <Text style={Styles.SmallText}>1 day ago</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 0,
            height: 40,
            width: 80,
          }}>
          <View style={{borderWidth: 0, width: 50}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.rate_him}
              fullStarColor="orange"
              starSize={10}
            />
          </View>
          <Text style={[Styles.StartCountTxt, {color: '#15096F'}]}>
            {item.rate_him}
          </Text>
        </View>
      </View>
      <View style={{width: '90%', paddingHorizontal: 12}}>
        <Text
          style={{
            color: '#15096F',
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
          }}>
          {item.comment}
        </Text>
      </View>
    </View>
  );
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={Styles.bg}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-small-left"
            size={30}
            color={'#fff'}
            style={{padding: 10}}
          />
        </TouchableOpacity>

        <Text style={Styles.BigText}>Review's</Text>

        <View
          style={{
            marginTop: heightPercentageToDP(20),
            flex: 1,
            backgroundColor: '#F4F4FA',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingRight: 55,
            }}>
            <Text
              style={{
                color: '#15096F',
                fontSize: 20,
                fontFamily: 'Poppins-Medium',
                left: 30,
              }}>
              Average Rating
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Ratings', {item, emp, user, ratings})
              }>
              <Text
                style={{
                  color: '#15096F',
                  fontSize: 20,
                  fontFamily: 'Poppins-Medium',
                  left: 30,
                }}>
                Rate Him
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              height: 25,
              width: 120,
              left: 30,
              bottom: 5,
              marginBottom: 15,
            }}>
            <View style={{borderWidth: 0, width: 50}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={ratings ? ratings : item.Total_rating}
                fullStarColor="orange"
                starSize={10}
              />
            </View>
            <Text
              style={[
                Styles.StartCountTxt,
                {color: '#15096F', fontFamily: 'Poppins-Medium'},
              ]}>
              {ratings ? ratings : item.Total_rating}
            </Text>
          </View>

          <FlatList
            data={user.rating ? user.rating : item.rating}
            renderItem={swipableRender}
            keyExtractor={item => item.id}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default Index;
