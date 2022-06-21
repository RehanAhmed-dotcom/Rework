import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Styles from './styles';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Email from 'react-native-vector-icons/Zocial';
import Chat from 'react-native-vector-icons/Entypo';
import Settings from 'react-native-vector-icons/Ionicons';
import Button from '../../../shared/Button';
import ImagePicker from 'react-native-image-crop-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Editprofile} from '../../../lib/api';
import {logged} from '../../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {WaveIndicator} from 'react-native-indicators';

const Index = ({navigation, route}) => {
  const ref = useRef();
  const [textFocused, settextFocused] = useState(true);
  const [googleSearchText, setgoogleSearchText] = useState(null);
  const [pickstreeAdres, setpickstreeAdres] = useState('');
  const [pickstreeAdresErr, setpickstreeAdresErr] = useState('');
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const {bottom, top} = useSafeAreaInsets();
  const loader = () => (
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

  const Type = route.params;
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const userType = useSelector(({APPSTATE}) => APPSTATE);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [img, setImg] = useState('');
  const dpImg = require('../../../Assets/dp.png');
  const openPicker = (open = false) => {
    ImagePicker[`open${open ? 'Camera' : 'Picker'}`]({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('iMAGE', image);
      setImg(image.path);
    });
  };
  const userData = useSelector(({USER}) => USER);
  useEffect(() => {
    setImg(userData.userData.userdata.image);
    setName(userData.userData.userdata.name);
    // setProfession("Plumber"),
    setEmail(userData.userData.userdata.email),
      setDescription(userData.userData.userdata.description),
      setLocation(userData.userData.userdata.location);
  }, []);
  const Update = () => {
    setShowModal(true);
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('location', location);
    {
      img &&
        data.append('image', {
          uri: img,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });
      Editprofile({Auth: userData.userData.token}, data).then(res => {
        console.log(
          'Edit Profile respone ................................',
          res,
        );
        if (res) {
          if (res.status == 'success') {
            setShowModal(false);
            logged(res)(dispatch);
            navigation.goBack();
          }
        } else {
          setShowModal(false);
          Alert.alert('something went wrong ');
        }
      });
    }
  };
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{
          flex: 1,
          height: hp(35),
          paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
        }}
        resizeMode="stretch">
        <View style={Styles.HeaderTopView}>
          <Image
            source={require('../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="circle-with-cross" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={Styles.BigText}>Update Profile</Text>
        </View>

        {/* <View style={Styles.PickerView}>
                    <Image style={Styles.Picker} source={require('../../../Assets/profile.jpg')} resizeMode="contain" />

                </View> */}

        {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior='position'> */}
        <TouchableOpacity onPress={() => openPicker(true)}>
          <View style={Styles.PickerView}>
            <Image style={Styles.Picker} source={img ? {uri: img} : dpImg} />
          </View>
        </TouchableOpacity>

        <View style={Styles.DetailsView}>
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior="position">
              <View style={Styles.SingleCard}>
                <Settings
                  name="person"
                  size={25}
                  color="#15096F"
                  style={{marginRight: 15}}
                />
                <TextInput
                  style={Styles.CardTxt}
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>

              <View style={Styles.SingleCard}>
                <Email
                  name="email"
                  size={25}
                  color="#15096F"
                  style={{marginRight: 15}}
                />
                <TextInput
                  style={[Styles.CardTxt, {opacity: 0.4}]}
                  editable={false}
                  value={email}
                />
              </View>
              <View style={[Styles.SingleCard, {height: hp(20)}]}>
                <Image
                  source={require('../../../Assets/product-description.png')}
                  style={{
                    height: 20,
                    width: 25,
                    tintColor: '#15096F',
                    alignSelf: 'baseline',
                    top: 10,
                    marginRight: 15,
                  }}
                  resizeMode="contain"
                />
                <TextInput
                  style={[
                    Styles.CardTxt,
                    {
                      height: hp(18),
                      top: 10,
                      textAlignVertical: 'top',
                      borderWidth: 0,
                      width: '90%',
                      fontFamily: 'Poppins-Medium',
                    },
                  ]}
                  multiline
                  value={description}
                  onChangeText={text => setDescription(text)}
                />
              </View>
              <View style={[Styles.SingleCard, {flexWrap: 'wrap'}]}>
                <Chat name="location-pin" size={30} color="#15096F" />
                {/* <TextInput style={Styles.CardTxt}
                                value={location}
                                onChangeText={(text) => setLocation(text)}
                            /> */}
                <GooglePlacesAutocomplete
                  ref={ref}
                  placeholder={location}
                  fetchDetails={true}
                  textInputProps={{
                    value: pickstreeAdres,
                    onChangeText: text => {
                      setpickstreeAdresErr('');
                      setpickstreeAdres(text);
                      if (text === '') {
                        settextFocused(false);
                      } else {
                        if (!textFocused) {
                          settextFocused(true);
                        }
                      }
                    },
                  }}
                  query={{
                    key: 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI',
                    language: 'en',
                  }}
                  enablePoweredByContainer={false}
                  onPress={(data, details) => {
                    console.log('[][][][][]', data.description);
                    //Function which send to parent screen.
                    setpickstreeAdres(data.description);
                    setlatitude(details.geometry.location.lat);
                    setlongitude(details.geometry.location.lng);
                    setLocation(data.description);
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: 'rgba(0,0,0,0)',
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      width: '100%',
                      alignSelf: 'center',
                      marginLeft: 30,
                    },
                    textInput: {
                      borderBottomWidth: 0,
                      borderColor: '#15096F',
                      borderRadius: 10,
                      height: 50,
                      backgroundColor: '#F4F4F4',
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    listView: {
                      backgroundColor: '#fff',
                      borderWidth: 0.5,
                      borderColor: '#dedede',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 6,
                      },
                      shadowOpacity: 0.05,
                      shadowRadius: 10,
                      elevation: 4,
                    },
                    description: {
                      color: 'grey',
                    },
                  }}
                />
              </View>

              <Button
                Title={'Update'}
                navigation={navigation}
                Btnstyle={{marginBottom: 10, marginTop: 50}}
                onpress={Update}
              />
              {loader()}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    </>
  );
};

export default Index;
