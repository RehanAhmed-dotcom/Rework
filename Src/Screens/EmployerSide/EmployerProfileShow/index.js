import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import Chat from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import StarRating from 'react-native-star-rating';
import Button from '../../../shared/Button';

const Index = ({navigation, route}) => {
  // console.log('user Data in profile employer .....', userData)
  const Count = 5;
  const item = route.params;
  console.log('item in Enmployer profile show', item);
  const dispatch = useDispatch();
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={Styles.bg}>
        <View style={Styles.ImageView}>
          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color="white" />
          </TouchableOpacity>
          <View style={Styles.PickerView}>
            <Image style={Styles.Picker} source={{uri: item.Image}} />
          </View>
          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={Styles.MediumText}>{item.Name}</Text>
            {/* <Text style={Styles.EditTxt}>{item.email}</Text> */}
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <StarRating
                disabled={true}
                emptyStarColor={'white'}
                maxStars={5}
                rating={item.Total_rating}
                fullStarColor={'white'}
                starSize={12}
              />

              <Text style={Styles.EditTxt}>{item.Total_rating}</Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.DetailsView}>
            <View
              style={[
                Styles.SingleCard,
                {height: 130, alignContent: 'center'},
              ]}>
              <Image
                source={require('../../../Assets/product-description.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 15,
                  tintColor: '#15096F',
                  alignSelf: 'flex-start',
                }}
              />
              <View style={Styles.input}>
                <Text style={{color: 'grey'}}>{item.description}</Text>
              </View>
              {/* <TextInput
                style={[Styles.input]}
                value={item.description}
                textAlignVertical="top"
                editable={false}
              /> */}
            </View>
            <View style={[Styles.SingleCard, {right: 8}]}>
              <Chat
                name="location-pin"
                size={30}
                color="#15096F"
                style={{marginRight: 20}}
              />
              <Text style={Styles.CardTxt}>{item.location}</Text>
            </View>

            <Button
              Title={
                item.gender == 'Female'
                  ? 'Rate Her'
                  : item.gender == 'Other'
                  ? 'Rate Them'
                  : 'Rate Him'
              }
              onpress={() => navigation.navigate('Ratings', {item})}
              Btnstyle={{marginTop: 50}}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
