import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Modal,
  Alert,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Styles from './Styles';
import Button from '../../../../shared/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import {Checkbox, RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useSelector, useDispatch} from 'react-redux';
import {signup, UpdateLocation} from '../../../../lib/api';
import {logged} from '../../../../redux/actions';
import ImagePicker from 'react-native-image-crop-picker';
import {WaveIndicator} from 'react-native-indicators';
import Axios from 'axios';
import Gender from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import MF from 'react-native-vector-icons/FontAwesome';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const About = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [termCheck, setTermCheck] = React.useState(false);
  const [privacyChek, setPrivacyCheck] = React.useState(false);
  const [img, setImg] = useState('');
  const [fname, setfname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [Description, setDiscription] = useState('');
  const [location, setLocation] = useState('');
  const [Age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [checked, setChecked] = React.useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Male');
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ]);
  //Error States
  const [termCheckerr, setTermCheckerr] = useState(false);
  const [privacyChekerr, setPrivacyCheckerr] = useState(false);
  const [imgerr, setImgerr] = useState('');
  const [fnameerr, setfnameerr] = useState('');
  const [emailerr, setemailerr] = useState('');
  const [passworderr, setpassworderr] = useState('');
  const [confirmpassworderr, setconfirmpassworderr] = useState('');
  const [Descriptionerr, setDiscriptionerr] = useState('');
  const [locationerr, setLocationerr] = useState('');
  const [Ageerr, setAgeerr] = useState('');
  const [gendererr, setGendererr] = useState('');

  //Error states End
  const dispatch = useDispatch();
  const ref = useRef();
  const [textFocused, settextFocused] = useState(true);
  const [googleSearchText, setgoogleSearchText] = useState(null);
  const [pickstreeAdres, setpickstreeAdres] = useState('');
  const [pickstreeAdresErr, setpickstreeAdresErr] = useState('');
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const {userType} = useSelector(({APPSTATE}) => APPSTATE);
  const [pValditaionErr, setPvalidationErr] = useState('');
  const [pConfirmValditaionErr, setComfirmPvalidationErr] = useState('');
  const validateEmail = emailC => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  const lot = '37.785834';
  const logo = '-122.406417';
  // console.log("user Type in Signup.........", userType)
  const dpImg = require('../../../../Assets/dp.png');
  useEffect(() => {
    Platform.OS == 'ios'
      ? Geolocation.requestAuthorization('always').then(res => {
          cuRRentlocation();
          console.log('res', res);
        })
      : requestLocationPermission();
  }, []);
  console.log('data 123', pickstreeAdres);
  const getPlace = (latitude, longitude) => {
    // console.log('inside get place fuction');
    // console.log('lat long', latitude, longitude);
    let radius = 100;
    // let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
    // let mapKey = 'AIzaSyBC2R0hGR9kjgysDNUsOWHWF_oU0jc6DIg';
    let mapKey = 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI';
    // let request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${myapikey}`;
    let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${mapKey}`;
    // let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${lot},${logo}&key=${mapKey}`;
    return Axios.get(request)
      .then(({data, status}) => {
        console.log('data', data.results[0].address_components);
        // setLocation("Rawalpindi")
        // console.log('whole responce', JSON.stringify(data));
        // const currentCity = data.results[0].address_components.filter(
        //   x =>
        //     x.types.filter(
        //       t =>
        //         t == 'administrative_area_level_2' ||
        //         'administrative_area_level_1',
        //     ).length > 0,
        // )[2].long_name;
        const currentCity = data.results[0].address_components.filter(
          x =>
            x.types.filter(
              t =>
                t == 'administrative_area_level_1' ||
                t == 'administrative_area_level_2',
            ).length > 0,
        )[0].long_name;
        // console.log('city current city', currentCity);
        setpickstreeAdres(currentCity);

        setLocation(currentCity);
        // console.log('place', JSON.stringify(data.results[0].name));
        // return status === 200 || status === 201 ? data : null;
      })
      .catch(e => {});
  };
  console.log('current city', location);
  console.log('current location', pickstreeAdres);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cuRRentlocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  console.log('location');
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        getPlace(position.coords.latitude, position.coords.longitude);
        // getPlace('47.751076', '-120.740135');
        console.log('users location', position.coords.longitude);

        console.log('users location', position.coords.latitude);
      },
      error => {
        console.log('error in loc', error);
      },
      {
        enableHighAccuracy: true,
        // timeout: 15000,
        // maximumAge: 10000
      },
    );
  };

  const imagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImg(image.path);
      setImgerr('');
    });
  };
  const checkNumber = text => {
    if (text < 1) {
      setAgeerr('Pleas enter a valid age');
      setAge(text);
    }
  };
  const EmployerRegisterApiHander = () => {
    const data = new FormData();
    data.append('name', fname);
    data.append('email', email);
    data.append('password', password);
    data.append('confirm_password', confirmpassword);
    data.append('description', Description);
    data.append('location', pickstreeAdres);
    data.append('type', userType);
    {
      img &&
        data.append('image', {
          uri: img,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });

      if (
        img &&
        fname &&
        validateEmail(email) &&
        password &&
        confirmpassword &&
        Description &&
        pickstreeAdres &&
        password == confirmpassword &&
        privacyChek &&
        termCheck &&
        !pValditaionErr &&
        !pConfirmValditaionErr
      ) {
        setShowModal(true);

        signup(data).then(res => {
          console.log('Signup respone ................................', res);
          if (res) {
            if (res.status == 'success') {
              console.log('res', res);
              UpdateLocation({
                Auth: res.token,
                latitude: latitude,
                longitude: longitude,
              }).then(ress => {
                logged(ress)(dispatch);
                setShowModal(false);
                navigation.navigate('TabNavigator');
              });
              // logged(res)(dispatch);
              // setShowModal(false);
            } else {
              setShowModal(false);
              Alert.alert('Email has already been taken.');
            }
          } else {
            setShowModal(false);
            Alert.alert('Something went wrong please try again !');
          }
        });
      } else if (
        !img &&
        !fname &&
        !validateEmail(email) &&
        !password &&
        !confirmpassword &&
        !Description &&
        (!location || !pickstreeAdres) &&
        !privacyChek &&
        !termCheck &&
        !pConfirmValditaionErr
      ) {
        setImgerr('Profile picture is missing');
        setfnameerr('Please enter your name');
        setemailerr('Please enter valid email');
        setpassworderr('Please enter password');
        setconfirmpassworderr('Please repeate your password');
        setDiscriptionerr('Please enter Description');
        setPrivacyCheckerr('');
        setTermCheckerr('1');
        setLocationerr('Please enter Location');
        setComfirmPvalidationErr(
          'password and Confirm password should be same',
        );
      }
      if (!img) {
        setImgerr('Profile picture is missing');
      }
      if (!fname) {
        setfnameerr('Please enter your name');
      }
      if (!validateEmail(email)) {
        setemailerr('Please enter valid email');
      }
      if (!password) {
        setpassworderr('Please enter password');
      }
      if (!confirmpassword) {
        setconfirmpassworderr('Please repeate your password');
      }
      if (!Description) {
        setDiscriptionerr('Please enter Description');
      }
      if (!privacyChek) {
        setPrivacyCheckerr('1');
      }
      if (!termCheck) {
        setTermCheckerr('1');
      }
      if (!location) {
        setLocationerr('Please enter Location');
      }
      if (password !== confirmpassword) {
        setComfirmPvalidationErr(
          'Password and Confirm password should be same',
        );
      }
    }
  };
  const WorkerRegisterApiHander = () => {
    const data = new FormData();
    data.append('name', fname);
    data.append('email', email);
    data.append('password', password);
    data.append('confirm_password', confirmpassword);
    data.append('age', Age);
    data.append('gender', value);
    data.append('description', Description);
    data.append('location', pickstreeAdres);
    data.append('type', userType);
    {
      img &&
        data.append('image', {
          uri: img,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });

      if (
        img &&
        fname &&
        validateEmail(email) &&
        password &&
        confirmpassword &&
        password == confirmpassword &&
        Age &&
        value &&
        Description &&
        (location || pickstreeAdres) &&
        privacyChek &&
        termCheck &&
        !pValditaionErr &&
        !pConfirmValditaionErr
      ) {
        setShowModal(true);

        signup(data).then(res => {
          console.log('Signup respone ................................', res);
          if (res) {
            if (res.status == 'success') {
              UpdateLocation({
                Auth: res.token,
                latitude: latitude,
                longitude: longitude,
              }).then(ress => {
                logged(ress)(dispatch);
                setShowModal(false);
                navigation.navigate('WorkerAddSkill', 'Signup');
              });
              // logged(res)(dispatch);

              // setShowModal(false);
            } else {
              setShowModal(false);
              Alert.alert('Email has already been taken');
            }
          } else {
            setShowModal(false);
            Alert.alert('Something went wrong please try again !');
          }
        });
      } else if (
        !img &&
        !fname &&
        !email &&
        !password &&
        !confirmpassword &&
        !Age &&
        !value &&
        !Description &&
        !pickstreeAdres &&
        !privacyChek &&
        !termCheck &&
        pConfirmValditaionErr
      ) {
        setImgerr('Profile picture is missing');
        setfnameerr('Please enter your name');
        setemailerr('Please enter email');
        setpassworderr('Please enter password');
        setconfirmpassworderr('Please repeate your password');
        setDiscriptionerr('Please enter Description');
        setPrivacyCheckerr('1');
        setTermCheckerr('1');
        setAgeerr('Please enter Age');
        setGendererr('Please Select Gender');
        setComfirmPvalidationErr(
          'Password and Confirm password should be same',
        );

        // setLocationerr("Please enter Location")
      } else if (!img) {
        setImgerr('Profile picture is missing');
      }
      if (!fname) {
        setfnameerr('Please enter your name');
      }
      if (!email) {
        setemailerr('Please enter email');
      }
      if (!password) {
        setpassworderr('Please enter password');
      }
      if (!confirmpassword) {
        setconfirmpassworderr('Please repeate your password');
      }
      if (!Description) {
        setDiscriptionerr('Please enter Description');
      }
      if (!privacyChek) {
        setPrivacyCheckerr('1');
      }
      if (!termCheck) {
        setTermCheckerr('1');
      }
      if (!Age) {
        setAgeerr('Please enter Age');
      }
      if (!value) {
        setGendererr('Please Select Gender');
      }
      if (!pickstreeAdres) {
        setLocationerr('Please enter Location');
      }
      if (password !== confirmpassword) {
        setconfirmpassworderr('Password and confirm password should be same');
      }
    }
  };
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
  const PasswrodValidator = (text, state) => {
    console.log('state in password validator', state, text);
    if (state == 'password') {
      if (text.length < 6) {
        setPvalidationErr('Password Should be minimum 6 charachters');
      } else {
        setPvalidationErr('');
      }
    } else if (state == 'ConfirmPassword') {
      if (text.length < 6) {
        setComfirmPvalidationErr('Password Should be minimum 6 charachters');
      } else {
        setComfirmPvalidationErr('');
      }
    }
  };
  const {bottom, top} = useSafeAreaInsets();
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={[
            Styles.MainView,
            {
              marginTop: Platform.OS === 'ios' ? top : 0,
              paddingBottom: Platform.OS === 'ios' ? bottom : 0,
            },
          ]}
          // keyboardShouldPersistTaps={'always'}
          keyboardShouldPersistTaps={'handled'}>
          {/* <SafeAreaView> */}
          <View style={Styles.HeaderTopView}>
            <Image
              source={require('../../../../Assets/Logo.png')}
              resizeMode="contain"
              style={Styles.smallLogo}
            />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate("GooglePlaces")}> */}
          <Text style={Styles.BigText}>Sign Up</Text>
          {/* </TouchableOpacity> */}

          <Text style={Styles.MediumText}>Please Register Yourself here</Text>
          <TouchableOpacity onPress={imagePicker}>
            <View
              style={[
                Styles.PickerView,
                {
                  borderWidth: imgerr ? 2 : 0,
                  borderColor: imgerr ? 'red' : '#fff',
                },
              ]}>
              <Image
                style={Styles.Picker}
                resizeMode="cover"
                source={img ? {uri: img} : dpImg}
              />
            </View>
          </TouchableOpacity>
          {imgerr ? <Text style={Styles.Error}>{imgerr}</Text> : null}
          <TextInput
            style={[
              Styles.input,
              {marginTop: 20, borderColor: fnameerr ? 'red' : '#15096F'},
            ]}
            placeholder="Full Name"
            placeholderTextColor="lightgray"
            value={fname}
            onChangeText={text => {
              setfname(text), fnameerr && setfnameerr('');
            }}
          />

          {fnameerr ? <Text style={Styles.Error}>{fnameerr}</Text> : null}
          <TextInput
            style={[Styles.input, {borderColor: emailerr ? 'red' : '#15096F'}]}
            placeholder="Email"
            placeholderTextColor="lightgray"
            value={email}
            onChangeText={text => {
              setemail(text), emailerr && setemailerr('');
            }}
          />
          {emailerr ? <Text style={Styles.Error}>{emailerr}</Text> : null}
          <TextInput
            style={[
              Styles.input,
              {borderColor: passworderr ? 'red' : '#15096F'},
            ]}
            placeholder="Password"
            placeholderTextColor="lightgray"
            value={password}
            onChangeText={text => {
              setpassword(text),
                passworderr && setpassworderr(''),
                PasswrodValidator(text, 'password');
              setconfirmpassworderr('');
            }}
            secureTextEntry
          />
          {passworderr ? <Text style={Styles.Error}>{passworderr}</Text> : null}
          {pValditaionErr ? (
            <Text style={Styles.Error}>{pValditaionErr}</Text>
          ) : null}
          <TextInput
            style={[
              Styles.input,
              {borderColor: confirmpassworderr ? 'red' : '#15096F'},
            ]}
            placeholder="Confirm Password"
            placeholderTextColor="lightgray"
            value={confirmpassword}
            onChangeText={text => {
              setconfirmpassword(text),
                passworderr && setpassworderr(''),
                confirmpassworderr && setconfirmpassworderr(''),
                PasswrodValidator(text, 'ConfirmPassword');
            }}
            secureTextEntry
          />
          {confirmpassworderr ? (
            <Text style={Styles.Error}>{confirmpassworderr}</Text>
          ) : null}
          {pConfirmValditaionErr ? (
            <Text style={Styles.Error}>{pConfirmValditaionErr}</Text>
          ) : null}

          {userType == 'worker' && (
            <>
              <TextInput
                style={[
                  Styles.input,
                  {borderColor: Ageerr ? 'red' : '#15096F'},
                ]}
                placeholder="Age"
                placeholderTextColor="lightgray"
                value={Age}
                onChangeText={text => {
                  setAge(text), Ageerr && setAgeerr(''), checkNumber(text);
                }}
                keyboardType="number-pad"
              />
              {Ageerr ? <Text style={Styles.Error}>{Ageerr}</Text> : null}

              <View
                style={[
                  Styles.DDView,
                  {
                    paddingBottom: open ? 150 : 0,
                    marginTop: open ? 30 : 0,
                    paddingTop: open ? 20 : 0,
                    borderColor: gendererr ? 'red' : '#15096F',
                  },
                ]}>
                <View
                  style={{
                    width: '20%',
                    // borderWidth: 1,
                    height: 50,
                    borderTopStartRadius: 10,
                    marginTop: open ? 10 : 0,
                    borderBottomStartRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Gender
                    name={
                      value == 'Male'
                        ? 'gender-male'
                        : value == 'Female'
                        ? 'gender-female'
                        : 'gender-male-female'
                    }
                    size={25}
                    color={
                      value == 'Male'
                        ? '#15096F'
                        : value == 'Female'
                        ? '#F0529C'
                        : '#E7A201'
                    }
                  />
                </View>
                <View style={[Styles.DDPickerView, {marginTop: open ? 10 : 0}]}>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Gender"
                    placeholderStyle={{color: 'lightgray'}}
                    style={{
                      width: '100%',
                      borderColor: gendererr ? 'red' : 'white',
                      marginBottom: open ? 130 : 0,
                      borderRadius: 0,
                      borderWidth: 0,
                      height: 50,
                      borderTopEndRadius: 10,
                      borderBottomEndRadius: 10,
                      // paddingTop: open ? 20 : 0
                      borderWidth: 0.4,
                      borderLeftWidth: 0,
                    }}
                    // containerStyle={{ width: '75%' }}
                    dropDownContainerStyle={{width: '100%', borderWidth: 0}}
                    onChangeValue={() => setGendererr && setGendererr('')}
                  />
                </View>
              </View>
              {gendererr ? <Text style={Styles.Error}>{gendererr}</Text> : null}
            </>
          )}
          <TextInput
            style={[
              Styles.input,
              {
                height: hp(20),
                textAlignVertical: 'top',
                borderColor: Descriptionerr ? 'red' : '#15096F',
              },
            ]}
            placeholder="Description"
            placeholderTextColor="lightgray"
            value={Description}
            onChangeText={text => {
              setDiscription(text), Descriptionerr && setDiscriptionerr('');
            }}
            numberOfLines={5}
            multiline
          />
          {Descriptionerr ? (
            <Text style={Styles.Error}>{Descriptionerr}</Text>
          ) : null}
          <ScrollView
            contentContainerStyle={{width: wp(90)}}
            horizontal={true}
            keyboardShouldPersistTaps={'always'}>
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder={pickstreeAdres ? pickstreeAdres : 'Address'}
              fetchDetails={true}
              placeholderTextColor="grey"
              textInputProps={{
                value: pickstreeAdres,
                onChangeText: text => {
                  setpickstreeAdresErr('');
                  setpickstreeAdres(text);
                  console.log('google text', text);
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
                locationerr && setLocationerr('');
                console.log('[][][][][]', data.description);
                //Function which send to parent screen.
                // Alert.alert(details.geometry.location);
                console.log('location on onpress', details.geometry.location);
                setpickstreeAdres(data.description);
                setLocation(data.description);
                setlatitude(details.geometry.location.lat);
                setlongitude(details.geometry.location.lng);
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  // width: 150,
                  alignSelf: 'center',

                  marginLeft: 30,
                  width: '76%',
                },
                textInput: {
                  borderWidth: 1,
                  borderColor: '#15096F',
                  borderRadius: 10,
                  // width: 150,
                  height: 50,
                  color: 'grey',
                  alignSelf: 'center',
                  right: 15,
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
          </ScrollView>
          {/* <TextInput style={[Styles.input, { flexWrap: 'wrap', borderColor: locationerr ? "red" : "#15096F" }]} multiline placeholder="Location" placeholderTextColor="lightgray"
          value={location}
          onChangeText={(text) => {
            setLocation(text),
              locationerr && setLocationerr("")
          }}
        // editable={false}

        /> */}
          {locationerr ? <Text style={Styles.Error}>{locationerr}</Text> : null}
          <View style={[Styles.CheckView, {marginTop: 30, marginBottom: 10}]}>
            <CheckBox
              lineWidth={1}
              // status={termCheck ? 'checked' : 'unchecked'}
              value={termCheck}
              onValueChange={newValue => {
                setTermCheck(newValue);
                termCheckerr && setTermCheckerr('');
              }}
              // onPress={() => {
              //   setTermCheck(!termCheck);
              //   termCheckerr && setTermCheckerr('');
              // }}
              onCheckColor={'#15096F'}
              onTintColor={'#15096F'}
              tintColors={{true: '#15096F'}}
              tintColor={termCheckerr ? 'red' : '#15096F'}
              // uncheckedColor={termCheckerr ? 'red' : '#15096F'}
              // color="#15096F"
            />
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigation.navigate('About')}>
              <Text
                style={[
                  Styles.checkTxt,
                  {color: termCheckerr ? 'red' : '#15096F'},
                ]}>
                You are agree with term of usage
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[Styles.CheckView, {marginTop: 0}]}>
            <CheckBox
              lineWidth={1}
              // status={privacyChek ? 'checked' : 'unchecked'}
              value={privacyChek}
              // onPress={() => {
              //   setPrivacyCheck(!privacyChek);
              //   {
              //     privacyChekerr && setPrivacyCheckerr('');
              //   }
              // }}
              onValueChange={newValue => {
                setPrivacyCheck(newValue);
                privacyChekerr && setPrivacyCheckerr('');
              }}
              onCheckColor={'#15096F'}
              onTintColor={'#15096F'}
              tintColors={{true: '#15096F'}}
              tintColor={privacyChekerr ? 'red' : '#15096F'}
              // color="#15096F"
            />
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Text
                style={[
                  Styles.checkTxt,
                  {color: privacyChekerr ? 'red' : '#15096F'},
                ]}>
                You are agree with{' '}
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    Styles.checkTxtBold,
                    {color: privacyChekerr ? 'red' : '#15096F'},
                  ]}
                  onPress={() => navigation.navigate('Terms')}>
                  Terms
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  Styles.checkTxt,
                  {color: privacyChekerr ? 'red' : '#15096F'},
                ]}>
                {' '}
                &{' '}
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    Styles.checkTxtBold,
                    {color: privacyChekerr ? 'red' : '#15096F'},
                  ]}
                  onPress={() => navigation.navigate('Privacy')}>
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            Title={'Register'}
            navigation={navigation}
            onpress={
              userType == 'Employer'
                ? EmployerRegisterApiHander
                : WorkerRegisterApiHander
            }
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Text style={Styles.SmallText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={Styles.SmallTextBold}>Login</Text>
            </TouchableOpacity>
          </View>
          {Platform.OS === 'ios' && <View style={{height: 25}} />}
          {myModal()}
          {/* </SafeAreaView> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default About;
const Astyles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    // backgroundColor: 'red',
    color: '#5D5D5D',
    fontSize: 16,
    height: 48,
    paddingHorizontal: 6,
    borderRadius: 0,
    borderRadius: 10,
    borderWidth: 1,
  },
  predefinedPlacesDescription: {
    color: '#1FAADB',
  },
  listView: {
    // top: 30,
    width: '100%',

    borderRadius: 10,
    backgroundColor: 'white',
    // position: 'absolute',
    color: 'black',
    elevation: 1,
    // zIndex: 100,
  },
});
