import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Styles from './Styles';
import StarRating from 'react-native-star-rating';
import Back from 'react-native-vector-icons/AntDesign';
import {Rating} from 'react-native-ratings';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-gesture-handler';
import {PostRating} from '../../../lib/api';
import {useSelector} from 'react-redux';
// import {WaveIndicator} from 'react-native-indicators';
const Index = ({navigation, route}) => {
  const {userData} = useSelector(({USER}) => USER);
  const item = route.params;
  const ratings = route.params.ratings;
  const emp = route?.params?.emp;
  const user = route.params.user;
  console.log('item in Ratings=============>>>>>', user);
  //   Ratings States
  const [profileCount, setProfileCount] = useState(5);
  const [rateHime, setRateHim] = useState(2.5);
  const [communication, setCommunication] = useState(2.5);
  const [onTimeDelivery, setOnTimeDelivery] = useState(2.5);
  const [review, setReview] = useState('');
  const [reviewErr, setReviewErr] = useState('');
  const [showModal, setShowModal] = useState(false);
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
  const RatingPost = () => {
    console.log('Inside Rating function', JSON.stringify(item));
    setShowModal(true);
    const data = new FormData();
    {
      ratings
        ? data.append('reciever_id', user.id)
        : data.append(
            'reciever_id',
            userData.userdata.type == 'Employer'
              ? item.item.id
              : item.item.employer_id,
          );
    }

    data.append('rate_him', rateHime);
    data.append('communication', communication);
    data.append('on_time_delievery', onTimeDelivery);
    data.append('comment', review);
    PostRating({Auth: userData.token}, data)
      .then(res => {
        setShowModal(false);
        if (res) {
          console.log('Response of Post Rating Api ', res);
          if (res.status == 'Success') {
            // Alert.alert('Rated Successfuly !');
            if (emp) {
              navigation.navigate('TabNavigator');
            } else {
              navigation.navigate('WorkerTabNavigator');
            }
          } else {
            setShowModal(false);
            Alert.alert('Error while Rating try again !');
            navigation.goBack();
          }
        } else {
          setShowModal(false);
          navigation.goBack();
          Alert.alert('Error while Rating try again !');
        }
      })
      .catch(err => {
        setShowModal(false);
      });
  };

  const ratingCompleted = (rating, Ex) => {
    if (Ex == 'Rate') {
      setRateHim(rating);
    } else if (Ex == 'com') {
      setCommunication(rating);
    } else if (Ex == 'on') {
      setOnTimeDelivery(rating);
    }
  };
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={Styles.bg}>
        <View style={Styles.HeaderTopView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back name="left" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={Styles.ImageView}>
          <View style={Styles.PickerView}>
            <Image style={Styles.Picker} source={{uri: item.item.Image}} />
          </View>
          <View style={{marginTop: 20, borderWidth: 0}}>
            <Text style={Styles.MediumText}>{item.item.Name}</Text>
            <Text style={Styles.MediumTextBlur}>
              {item.item.category_name}{' '}
            </Text>
            <View style={Styles.StarView}>
              <StarRating
                disabled={false}
                // emptyStar={'ios-star-outline'}
                // fullStar={'ios-star'}
                // halfStar={'ios-star-half'}
                // iconSet={'Ionicons'}
                emptyStarColor={'white'}
                maxStars={5}
                rating={ratings ? ratings : item.item.Total_rating}
                selectedStar={rating => ratingCompleted(rating)}
                fullStarColor={'white'}
                starSize={15}
              />
              <Text
                style={[
                  Styles.MediumText,
                  {left: 10, fontSize: 18, fontFamily: 'Poppins-SemiBold'},
                ]}>
                {ratings ? ratings : item.item.Total_rating}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(15), flex: 1, backgroundColor: '#F4F4FA'}}>
          <ScrollView style={{marginTop: 0, paddingHorizontal: 15, flex: 1}}>
            <Text style={Styles.jobfinish}>Job finish</Text>

            <Text style={Styles.smallTextBold}>
              {item.gender == 'Female'
                ? 'Rate Her'
                : item.gender == 'Other'
                ? 'Rate Them'
                : 'Rate Him'}
            </Text>
            <View style={[Styles.StarView, {alignSelf: 'center'}]}>
              <Rating
                ratingCount={5}
                imageSize={30}
                jumpValue="0.5"
                onFinishRating={e => {
                  ratingCompleted(e, 'Rate');
                }}
                tintColor="#F4F4FA"
              />
            </View>
            <Text style={Styles.smallTextBold}>Communication</Text>
            <View style={[Styles.StarView, {alignSelf: 'center'}]}>
              <Rating
                ratingCount={5}
                imageSize={30}
                jumpValue="0.5"
                onFinishRating={e => {
                  ratingCompleted(e, 'com');
                }}
                tintColor="#F4F4FA"
              />
            </View>
            <Text style={Styles.smallTextBold}>On time Delivery</Text>
            <View
              style={[
                Styles.StarView,
                {alignSelf: 'center', marginBottom: 10},
              ]}>
              <Rating
                ratingCount={5}
                imageSize={30}
                jumpValue="0.5"
                onFinishRating={e => {
                  ratingCompleted(e, 'on');
                }}
                tintColor="#F4F4FA"
              />
            </View>
            <TextInput
              style={[
                Styles.Peragraph,
                {
                  borderWidth: 0,
                  borderColor: 'grey',
                },
              ]}
              placeholder="Comment here...."
              placeholderTextColor={'grey'}
              textAlignVertical="top"
              value={review}
              onChangeText={text => {
                setReview(text), setReviewErr('');
              }}
            />
            <TouchableOpacity style={Styles.Btn} onPress={RatingPost}>
              <Text style={Styles.BtnTxt}>Send</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {myModal()}
      </ImageBackground>
    </>
  );
};

export default Index;
