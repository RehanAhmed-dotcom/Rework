import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Styles from './Styles';
import {getUser, SearchWorker} from '../../../lib/api';
import Icon from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import {useSelector} from 'react-redux';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Button from '../../../shared/Button';
const Index = ({navigation, route}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [details, setDetails] = useState([]);
  const {item, searcing} = route.params;
  const [fcm_token, setToken] = useState('');
  // const  = route.params;
  console.log('item in worker profiel show', item);
  console.log('---------------------------------------', searcing);
  const Count = 5;
  const ratings = route?.params?.ratings;
  const emp = route?.params?.emp;
  const [Ratings, setRatings] = useState([]);
  const [rating, setRating] = useState('');
  const [user, setUser] = useState({});
  console.log('data', item);
  useEffect(() => {
    if (ratings) {
      SearchWorker({Auth: userData.token, category: item.Name}).then(res => {
        console.log('res of search', res);
        setUser(res.Workers[0]);
        setRatings(res.Workers[0].rating);
      });
    }
  }, []);
  useEffect(() => {
    setRatings(item.rating);
    getUser({Auth: userData.token, email: item.email}).then(res => {
      console.log('res', res.data.fcm_token);
      setToken(res.data.fcm_token);
      setRating(res.data.total_rating);
    });
  }, []);
  const renderItem = ({item}) => (
    <View style={Styles.ReviewBox}>
      <TouchableOpacity
        style={Styles.ReviewBoxTopView}
        onPress={() => console.log('Rating item ', item)}>
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
      </TouchableOpacity>
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
  // console.log('user', user);
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
            style={{paddingLeft: 10, paddingTop: 5}}
          />
        </TouchableOpacity>
        <View style={Styles.ImageView}>
          <View style={Styles.PickerView}>
            <Image
              style={Styles.Picker}
              source={{uri: item.Image ? item.Image : item.image}}
            />
          </View>

          <View style={{bottom: 0}}>
            {/* <Text style={Styles.MediumText2}>{details.Details.Name}</Text> */}
            <Text style={Styles.MediumText2}>
              {item.Name ? item.Name : item.name}
            </Text>
            {/* <Text style={Styles.EditTxt}>{searcing}hii</Text> */}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{borderWidth: 0, width: 65}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  emptyStarColor={'white'}
                  // rating={parseInt(details.Details.Total_rating)}
                  rating={
                    ratings
                      ? ratings
                      : item.Total_rating
                      ? item.Total_rating
                      : item.total_rating
                  }
                  fullStarColor={'white'}
                  starSize={12}
                />
              </View>
              <Text style={Styles.StartCountTxt}>
                {ratings
                  ? ratings
                  : item.Total_rating
                  ? item.Total_rating
                  : item.total_rating}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.DetailsView}>
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#F4F4FA',
                height: '100%',
              }}>
              <View style={Styles.InputView}>
                {/* <Text style={Styles.ProfessionTxt}>{details.Details.age} year's</Text> */}
                <Text style={Styles.ProfessionTxt}>
                  {user.age ? user.age : item.age ? item.age : 'Age not shown'}{' '}
                  {user.age ? user.age : item.age ? 'years' : null}{' '}
                </Text>
              </View>
              <View style={Styles.InputView}>
                {/* <Text style={Styles.ProfessionTxt}>{details.Details.gender}</Text> */}
                <Text style={Styles.ProfessionTxt}>
                  {user.gender
                    ? user.gender
                    : item.gender
                    ? item.gender
                    : 'Gender Not'}
                </Text>
              </View>

              <View style={Styles.InputViewPeragraph}>
                {/* <Text style={Styles.ProfessionTxt}>{details.Details.description}</Text> */}
                <Text style={Styles.ProfessionTxt}>
                  {user.description ? user.description : item.description}
                </Text>
              </View>
              <View style={Styles.InputView}>
                {/* <Text style={Styles.ProfessionTxt}>{details.Details.location}</Text> */}
                <Text style={Styles.ProfessionTxt}>
                  {user.location ? user.location : item.location}
                </Text>
              </View>

              {/* <View style={Styles.Swiper}>
                                <SwiperFlatList
                                    showPagination
                                    data={[1, 2, 3, 4, 5, 6]}
                                    renderItem={renderItem}

                                />

                            </View> */}

              <View style={Styles.RatingViewTop}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    color: '#15096F',
                  }}>
                  Reviews
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AllReviews', {
                      item,
                      emp,
                      user,
                      ratings,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                      color: '#15096F',
                    }}>
                    See All Reviews
                  </Text>
                </TouchableOpacity>
              </View>
              {user.Name && user?.rating?.length > 0 ? (
                <View style={Styles.container}>
                  <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    // autoplayLoop index={2}
                    // showPagination
                    data={Ratings}
                    renderItem={renderItem}></SwiperFlatList>
                </View>
              ) : item.Name && item?.rating?.length > 0 ? (
                <View style={Styles.container}>
                  <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    // autoplayLoop index={2}
                    // showPagination
                    data={Ratings}
                    renderItem={renderItem}></SwiperFlatList>
                </View>
              ) : (
                <Text style={Styles.Empty}>
                  This user has not been Rated yet
                </Text>
              )}
              {item.Name && (
                <Button
                  Title={'Chat'}
                  onpress={() =>
                    navigation.navigate('Chat', {
                      item,
                      searcing,
                      fcm_token,
                      rating,
                    })
                  }
                  Btnstyle={{
                    width: '70%',
                    height: 40,
                    bottom: user.Name
                      ? 60
                      : item.Name && item?.rating?.length > 0
                      ? 60
                      : 0,
                    marginBottom: 20,
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
