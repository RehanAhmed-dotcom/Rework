import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  Text,
  ImageBackground,
  Keyboard,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
  Platform,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Styles from './Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Pin from 'react-native-vector-icons/FontAwesome5';
import Button from '../../../shared/Button';
import Icon1 from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {CategoryList, Createjob} from '../../../lib/api';
import {WaveIndicator} from 'react-native-indicators';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Axios from 'axios';
const Index = ({navigation}) => {
  const ref = useRef();
  const userData = useSelector(({USER}) => USER);
  const scrollViewRef = useRef();
  const [textFocused, settextFocused] = useState(true);
  const [googleSearchText, setgoogleSearchText] = useState(null);
  const [pickstreeAdres, setpickstreeAdres] = useState('');
  const [pickstreeAdresErr, setpickstreeAdresErr] = useState('');
  const [latitude, setlatitude] = useState(0);
  const [checking, setChecking] = useState(false);
  const [Location, setLocation] = useState('');
  const [longitude, setlongitude] = useState(0);

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
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  // useEffect(() => {
  //   Platform.OS == 'ios'
  //     ? Geolocation.requestAuthorization('always').then(res => {
  //         cuRRentlocation();
  //       })
  //     : requestLocationPermission();
  // }, [checking]);
  useEffect(() => {
    console.log('pick', userData.userData.userdata.location);
    setpickstreeAdres(userData.userData.userdata.location);
  }, [checking]);
  const {bottom, top} = useSafeAreaInsets();
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cuRRentlocation();
      }
    } catch (err) {}
  };
  const getPlace = (latitude, longitude) => {
    let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';

    let radius = 100;
    // let mapKey = 'AIzaSyBC2R0hGR9kjgysDNUsOWHWF_oU0jc6DIg';
    let mapKey = 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI';
    // let request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${myapikey}`;
    let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${mapKey}`;
    return Axios.get(request)
      .then(({data, status}) => {
        const currentCity = data.results[0].address_components.filter(
          x =>
            x.types.filter(
              t =>
                t == 'administrative_area_level_1' ||
                t == 'administrative_area_level_2',
            ).length > 0,
        )[0].long_name;

        setLocation(currentCity);
        setpickstreeAdres(currentCity);

        return status === 200 || status === 201 ? data : null;
      })
      .catch(e => {});
  };
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setDeparture({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // LocationUpdate(position.coords.latitude, position.coords.longitude)
        getPlace(position.coords.latitude, position.coords.longitude);
      },
      error => {},
      {
        enableHighAccuracy: true,
        // timeout: 15000,
        // maximumAge: 10000
      },
    );
  };

  const [Categories, setCategories] = useState([]);
  const [catID, setCatId] = useState('');
  const [lat, setLat] = useState(userData.userData.userdata.latitude);
  const [long, setLong] = useState(userData.userData.userdata.longitude);
  const [departure, setDeparture] = useState({
    latitude: parseFloat(lat ? lat : 37.78825),
    longitude: parseFloat(long ? long : -122.4324),
  });
  // console.log('data', userData);
  useEffect(() => {
    setShowModal(true);
    CategoryList({Auth: userData.userData.token}).then(res => {
      if (res.status == 'Success') {
        setCategories(res.message);
        setShowModal(false);
      } else {
        setShowModal(false);
        Alert.alert('Error try again !');
      }
    });
  }, []);
  const ApiHandler = () => {
    if (Description) {
      setShowModal(true);
      Createjob({
        Auth: userData.userData.token,
        employer_id: userData.userData.userdata.id,
        category_id: catID,
        latitude: lat,
        longitude: long,
        description: Description,
        location: pickstreeAdres ? pickstreeAdres : Location,
        experience: experience,
      })
        .then(res => {
          setShowModal(false);

          if (res.status == 'Success') {
            setShowModal(false);
            navigation.goBack();
          } else {
            setShowModal(false);
            Alert.alert('Error try again !');
          }
        })
        .catch(error => {
          setShowModal(false);
        });
    } else {
      Alert.alert('Enter Description');
    }
  };

  const [TabView, setTabView] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [Skill, setSkill] = useState('');

  const [experience, setExperience] = useState('');
  const [experienceErr, setExperienceErr] = useState('');

  const [Description, setDescription] = useState('');
  const checkExp = text => {
    setExperience(text);
    if (text < 1) {
      setExperienceErr('Pleas Enter a Valid Experience');
    } else if (text > 0) {
      setExperienceErr('');
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[Styles.FlatListCard]}
        onPress={() => {
          setSkill(item.name);
          setCatId(item.id);
          setChecking(!checking);
          setTabView(2);
        }}>
        <View style={[Styles.GreenDot]}></View>
        <Text style={[Styles.FlatListCardTxt]}>{item.name}</Text>
        <Text></Text>
      </TouchableOpacity>
    );
  };
  console.log('address why i get empty', pickstreeAdres);
  console.log('lat', lat);
  console.log('long', long);
  console.log('location', Location);
  console.log('departure', userData.userData.userdata.location);
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{
          flex: 1,
          height: '50%',
          paddingBottom: Platform.OS == 'ios' ? bottom : 0,
          paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
        }}>
        <View style={Styles.HeaderTopView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon1 name="chevron-small-left" size={25} color="white" />
          </TouchableOpacity>
          <Image
            source={require('../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={Styles.BigText}>Create Offer</Text>

        <View style={Styles.TabView}>
          <TouchableOpacity
            onPress={() => {
              setTabView(1);
            }}>
            <Text
              style={[
                Styles.TabViewTxt,
                {
                  borderBottomWidth: TabView == 1 ? 2 : 0,
                  opacity: TabView == 1 ? 2 : 0.5,
                  fontSize: TabView == 1 ? 18 : 14,
                  fontFamily:
                    TabView == 1 ? 'Poppins-SemiBold' : 'Poppins-Medium',
                  top: TabView == 1 ? 0 : 7,
                },
              ]}>
              Skills{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setChecking(!checking);
              setTabView(2);
            }}>
            <Text
              style={[
                Styles.TabViewTxt,
                {
                  borderBottomWidth: TabView == 2 ? 2 : 0,
                  opacity: TabView == 2 ? 2 : 0.5,
                  fontSize: TabView == 2 ? 16 : 14,
                  fontSize: TabView == 2 ? 18 : 14,
                  fontFamily:
                    TabView == 2 ? 'Poppins-SemiBold' : 'Poppins-Medium',
                  top: TabView == 2 ? 0 : 5,
                },
              ]}>
              Location
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTabView(3)}>
            <Text
              style={[
                Styles.TabViewTxt,
                {
                  borderBottomWidth: TabView == 3 ? 2 : 0,
                  opacity: TabView == 3 ? 2 : 0.5,
                  fontSize: TabView == 3 ? 18 : 14,
                  fontFamily:
                    TabView == 3 ? 'Poppins-SemiBold' : 'Poppins-Medium',
                  top: TabView == 3 ? 0 : 5,
                },
              ]}>
              {' '}
              Experience
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTabView(4)}>
            <Text
              style={[
                Styles.TabViewTxt,
                {
                  borderBottomWidth: TabView == 4 ? 2 : 0,
                  opacity: TabView == 4 ? 2 : 0.5,
                  fontSize: TabView == 4 ? 18 : 14,
                  fontFamily:
                    TabView == 4 ? 'Poppins-SemiBold' : 'Poppins-Medium',
                  top: TabView == 4 ? 0 : 5,
                },
              ]}>
              {' '}
              Description{' '}
            </Text>
          </TouchableOpacity>
        </View>

        {TabView == 1 ? (
          <View style={{marginTop: hp(23), flex: 1}}>
            <FlatList
              data={Categories}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        ) : TabView == 2 ? (
          <>
            <Wrapper style={{flex: 1}} behavior={'padding'}>
              {/* <ScrollView> */}
              <ScrollView keyboardShouldPersistTaps={'always'}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => Keyboard.dismiss()}>
                  <TouchableOpacity
                    style={[
                      Styles.FlatListCard,
                      {
                        marginTop: hp(23),
                        // bottom: keyboardStatus === 'Keyboard Shown' ? 150 : 0,
                      },
                    ]}>
                    <View style={[Styles.GreenDot]}></View>
                    <Text style={[Styles.FlatListCardTxt]}>{Skill}</Text>
                    <Text></Text>
                  </TouchableOpacity>
                  {/* */}
                  <ScrollView
                    contentContainerStyle={{width: wp(90), marginLeft: 30}}
                    horizontal={true}
                    keyboardShouldPersistTaps={'always'}>
                    <TouchableOpacity
                      style={[
                        Styles.FlatListCard2,
                        {
                          backgroundColor: '#fff',
                          // bottom: keyboardStatus === 'Keyboard Shown' ? 150 : 0,
                        },
                      ]}>
                      <View style={[Styles.GreenDot]}></View>
                      <GooglePlacesAutocomplete
                        ref={ref}
                        // placeholder={Location}
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
                          setLat(details.geometry.location.lat);
                          setLong(details.geometry.location.lng);
                        }}
                        styles={{
                          textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            // width: '100%',
                            // alignSelf: 'center',
                            // zIndex: 100,
                            marginLeft: 30,
                          },
                          textInput: {
                            // borderWidth: 1,
                            borderColor: '#15096F',
                            borderRadius: 10,
                            height: 50,
                            color: 'grey',
                            backgroundColor: '#fff',
                            width: '100%',
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
                    </TouchableOpacity>
                  </ScrollView>
                  <View
                    style={{
                      height: 200,
                      width: '100%',
                      alignSelf: 'center',
                      margin: 10,
                    }}>
                    <MapView
                      style={{flex: 1}}
                      onPress={e => {
                        console.log('e', e.nativeEvent.coordinate);
                        setDeparture(e.nativeEvent.coordinate);
                        getPlace(
                          e.nativeEvent.coordinate.latitude,
                          e.nativeEvent.coordinate.longitude,
                        );
                        setLat(e.nativeEvent.coordinate.latitude);
                        setLong(e.nativeEvent.coordinate.longitude);
                      }}
                      region={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                      }}>
                      <Marker
                        coordinate={departure}
                        draggable={true}
                        onDragEnd={e => {
                          setDeparture(e.nativeEvent.coordinate);
                          getPlace(
                            e.nativeEvent.coordinate.latitude,
                            e.nativeEvent.coordinate.longitude,
                          );
                          setLat(e.nativeEvent.coordinate.latitude);
                          setLong(e.nativeEvent.coordinate.longitude);
                          // console.log('Drag', e.nativeEvent.coordinate);
                        }}
                        // onPress={() => { setTabView(3), setValue(Location), setLocation(Location) }}
                      >
                        <TouchableOpacity
                          style={{
                            height: 70,
                            width: 70,
                            backgroundColor: 'white',
                            borderRadius: 50,
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Pin size={20} name="map-marker" color="blue" />
                        </TouchableOpacity>
                      </Marker>
                    </MapView>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'flex-end',
                      // height: '80%',
                      bottom: 50,
                      paddingHorizontal: 20,
                      position: 'absolute',
                      // backgroundColor: 'red',
                    }}>
                    <Button
                      Title={'Cancel'}
                      Btnstyle={{width: 130, alignSelf: 'flex-end'}}
                      navigation={navigation}
                      onpress={() => {
                        setTabView(1),
                          setSkill(''),
                          setValue(''),
                          setLocation(''),
                          setExperience('');
                        setDescription('');
                      }}
                    />
                    <Button
                      Title={'Next'}
                      Btnstyle={{alignSelf: 'flex-end', width: 130}}
                      navigation={navigation}
                      onpress={() => {
                        setTabView(3);
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {/* </ScrollView> */}
              </ScrollView>
            </Wrapper>
          </>
        ) : TabView == 3 ? (
          <Wrapper style={{flex: 1}} behavior={'padding'}>
            <ScrollView
              style={{
                marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 2 : 23),
                marginBottom: hp(0),
              }}>
              <View>
                <TouchableOpacity style={[Styles.FlatListCard]}>
                  <View style={Styles.GreenDot}></View>
                  <Text style={Styles.FlatListCardTxt}>{Skill}</Text>
                  {/* <Image source={require('../../../Assets/bartender.png')} style={{ height: 25, width: 25 }} /> */}
                  <Text></Text>
                </TouchableOpacity>
                <View style={[Styles.FlatListCard]}>
                  <View style={Styles.GreenDot}></View>
                  <Text style={Styles.FlatListCardTxt}>
                    {pickstreeAdres ? pickstreeAdres : Location}
                  </Text>
                  {/* <Image source={require('../../../Assets/map.png')} style={{ height: 20, width: 20 }}
                                            resizeMode="contain"
                                            <Text></Text>
                                        /> */}
                  <Text></Text>
                </View>
                <TextInput
                  style={Styles.input}
                  placeholder="Enter Experience"
                  placeholderTextColor="lightgray"
                  value={experience}
                  onChangeText={text => checkExp(text)}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                {experienceErr ? (
                  <Text style={Styles.Error}>{experienceErr}</Text>
                ) : null}
                <Button
                  Title={'Next'}
                  Btnstyle={{marginBottom: 10, marginTop: 60}}
                  navigation={navigation}
                  onpress={() => {
                    if (experience) {
                      setTabView(4);
                    } else {
                      Alert.alert('Enter Experience');
                    }
                  }}
                />
              </View>
            </ScrollView>
          </Wrapper>
        ) : TabView == 4 ? (
          <Wrapper behavior={'padding'} style={{flex: 1}}>
            <ScrollView
              ref={scrollViewRef}
              style={{
                marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 1 : 23),
                marginBottom: hp(0),
              }}>
              <View>
                <TouchableOpacity style={[Styles.FlatListCard]}>
                  <View style={Styles.GreenDot}></View>
                  <Text style={Styles.FlatListCardTxt}>{Skill}</Text>
                  {/* <Image source={require('../../../Assets/bartender.png')} style={{ height: 25, width: 25 }} /> */}
                  <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.FlatListCard]}>
                  <View style={Styles.GreenDot}></View>
                  <Text style={Styles.FlatListCardTxt}>
                    {pickstreeAdres ? pickstreeAdres : Location}
                  </Text>
                  {/* <Image source={require('../../../Assets/map.png')} style={{ height: 20, width: 20 }}
                                            resizeMode="contain"
                                        /> */}
                  <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.FlatListCard]}>
                  <View style={Styles.GreenDot}></View>
                  <Text style={Styles.FlatListCardTxt}>{experience}</Text>
                  <Text></Text>
                </TouchableOpacity>
                <TextInput
                  style={Styles.Peragraph}
                  placeholder="Description"
                  placeholderTextColor="lightgray"
                  textAlignVertical="top"
                  value={Description}
                  multiline
                  onPressIn={() =>
                    scrollViewRef.current.scrollToEnd({animated: true})
                  }
                  onChangeText={text => setDescription(text)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <Button
                    Title={'Cancel'}
                    Btnstyle={{marginBottom: 10, marginTop: 0, width: 130}}
                    navigation={navigation}
                    onpress={() => {
                      setTabView(1),
                        setSkill(''),
                        setValue(''),
                        setLocation(''),
                        setExperience('');
                      setDescription('');
                    }}
                  />
                  <Button
                    Title={'Save'}
                    Btnstyle={{marginBottom: 10, marginTop: 0, width: 130}}
                    navigation={navigation}
                    onpress={ApiHandler}
                  />
                </View>
              </View>
              {myModal()}
            </ScrollView>
          </Wrapper>
        ) : null}
      </ImageBackground>
    </>
  );
};

export default Index;
