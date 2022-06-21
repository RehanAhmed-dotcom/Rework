import React, {useState, useEffect, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Modal,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Styles from './Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../../shared/Button';
import Icon1 from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {
  CategoryList,
  AddSkill,
  UpdateLocation,
  GetCategoryName,
} from '../../../lib/api';
import GetLocation from 'react-native-get-location';
import Axios from 'axios';
import {logged} from '../../../redux/actions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {WaveIndicator} from 'react-native-indicators';
const Index = ({navigation, route}) => {
  const userData = useSelector(({USER}) => USER);
  const navigateFrom = route.params;
  const scrollViewRef = useRef();
  const [Cname, setCname] = useState('');
  const ref = useRef();
  const [textFocused, settextFocused] = useState(true);
  const [googleSearchText, setgoogleSearchText] = useState(null);
  const [pickstreeAdres, setpickstreeAdres] = useState('');
  const [pickstreeAdresErr, setpickstreeAdresErr] = useState('');
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  // console.log("Navigate From ", navigateFrom)
  const labels = 'artist';
  const [checking, setChecking] = useState(false);
  const val = 1;
  const disptch = useDispatch();
  const [lat, setLat] = useState(userData.userData.userdata.latitude);
  const [long, setLong] = useState(userData.userData.userdata.longitude);
  const [ExperienceErr, setExperienceErr] = useState('');
  const [skillErr, setSkillErr] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [Categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [catID, setCatId] = useState('');
  const [TabView, setTabView] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [Skill, setSkill] = useState('');
  const [Location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [experienceerr, setExperienceerr] = useState('');
  const [Description, setDescription] = useState('');
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
  const checkExp = text => {
    console.log('text', text);
    setExperience(text);
    if (text < 1) {
      setExperienceErr('Pleas enter a valid Experience');
      // setAge(text)
    } else if (text > 0) {
      setExperienceErr('');
    }
    // experienceerr && setExperience("")
  };

  const LocationUpdate = ({latitude, longitude}) => {
    UpdateLocation({
      Auth: userData.userData.token,
      latitude: latitude,
      longitude: longitude,
    }).then(res => {
      if (res) {
        if (res.status == 'success') {
          // console.log("Location update ", res.status)
          logged(res)(disptch);
        } else {
        }
      } else {
      }
    });
  };

  const fetchNearestPlacesFromGoogleAPI = ({latitude, longitude}, myapikey) => {
    let radius = 100;
    let mapKey = 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI';
    // let mapKey = 'AIzaSyBC2R0hGR9kjgysDNUsOWHWF_oU0jc6DIg';
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
        )[0].short_name;
        console.log('i am the current city', currentCity);
        // setgoogleSearchText(data.results[0].name);
        setLocation(currentCity);
        setpickstreeAdres(currentCity);
        return status === 200 || status === 201 ? data : null;
      })
      .catch(e => {
        console.log('error', e);
      });
  };
  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardStatus('Keyboard Shown');
  //   });
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardStatus('Keyboard Hidden');
  //   });

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);
  console.log('keyboard', userData);
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    CategoryList({Auth: userData.userData.token}).then(res => {
      if (res) {
        if (res.status == 'Success') {
          setCategories(res.message);
          const PapulateList = res.message.map(item => {
            const NewData = {
              label: item.name,
              value: item.id.toString(),
            };
            return NewData;
          });
          setItems(PapulateList);
        } else {
          Alert.alert('Something went wrong please try again !');
        }
      } else {
        Alert.alert('Something went wrong please try again !');
      }
    });
    setpickstreeAdres(userData.userData.userdata.location);
    // Geolocation.getCurrentPosition(position => {
    //   let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
    //   setLat(position.coords.latitude);
    //   setLong(position.coords.longitude);
    //   console.log('lat long at current positon func', position.coords);
    //   // LocationUpdate({
    //   //   latitude: position.coords.latitude,
    //   //   longitude: position.coords.longitude,
    //   // });
    //   fetchNearestPlacesFromGoogleAPI(
    //     {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     },
    //     myapikey,
    //   );
    // });
    // .then(location => {
    //   let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
    //   setLat(location.latitude);
    //   setLong(location.longitude);
    //   LocationUpdate({
    //     latitude: location.latitude,
    //     longitude: location.longitude,
    //   });
    //   fetchNearestPlacesFromGoogleAPI(
    //     {latitude: location.latitude, longitude: location.longitude},
    //     myapikey,
    //   );
    // })

    // .catch(error => {
    //   const {code, message} = error;
    //   console.warn(code, message);
    // });
    // });
    // return unsubscribe;
  }, [checking]);
  console.log('location', pickstreeAdres);
  console.log('lat', lat);
  console.log('long', long);
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  const ApiHandler = () => {
    setShowModal(true);
    Description
      ? AddSkill({
          Auth: userData.userData.token,
          category_id: value,
          experience: experience,
          latitude: lat,
          longitude: long,
          description: Description,
          location: pickstreeAdres,
        })
          .then(res => {
            if (res) {
              if (res.status == 'Success') {
                setShowModal(false);
                // navigation.goBack();
                navigation.navigate('WorkerTabNavigator');
              } else {
                setShowModal(false);
              }
            } else {
              setShowModal(false);
            }
          })
          .catch(e => {})
      : (setDescriptionErr('Please Describe Your Skill'), setShowModal(false));
  };
  const FindName = id => {
    GetCategoryName({Auth: userData.userData.token, id: id}).then(res => {
      // setCname(res.name)
      if (res.status == 'Success')
        console.log('categoryName', res.categoryName[0].name);
      setCname(res.categoryName[0].name);
    });
    // Alert.alert(id)
  };

  const {bottom, top} = useSafeAreaInsets();
  // console.log('bottom,top', bottom, top);
  return (
    <>
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
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{
          flex: 1,
          height: '50%',
          paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
          marginBottom: Platform.OS === 'ios' ? bottom : 0,
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
        <Text style={Styles.BigText}>Add Skill</Text>

        <View style={Styles.TabView}>
          <TouchableOpacity onPress={() => setTabView(1)}>
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
                  fontSize: TabView == 2 ? 18 : 14,
                  fontFamily:
                    TabView == 2 ? 'Poppins-SemiBold' : 'Poppins-Medium',
                  top: TabView == 2 ? 0 : 5,
                },
              ]}>
              {' '}
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
          <>
            <View style={{marginTop: hp(23), flex: 1}}>
              <Button
                Title={'Choose a Skill'}
                Btnstyle={{
                  marginTop: 20,
                  width: '80%',
                  alignItems: 'flex-start',
                  paddingHorizontal: 10,
                }}
                Txtstyle={{fontSize: 18}}
                navigation={navigation}
                onpress={() => null}
              />
              {Categories.length > 0 && (
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  onChangeValue={items => {
                    setSkillErr('');
                    setValue(value);
                    FindName(items);

                    console.log('items', items);
                  }}
                  onChangeText={text => console.log('text', text)}
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: '#15096F',
                  }}
                  containerStyle={{width: '90%', alignSelf: 'center'}}
                  dropDownContainerStyle={{
                    width: '90%',
                    marginTop: 10,
                    alignSelf: 'center',
                  }}
                  dropDownDirection="BOTTOM"
                  arrowIconStyle={{tintColor: '#15096F'}}
                />
              )}
              {skillErr ? <Text style={Styles.Empty}>{skillErr}</Text> : null}
            </View>
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
                  navigateFrom == 'Profile'
                    ? (setTabView(1),
                      setSkill(''),
                      setValue(''),
                      setLocation(''),
                      setExperience(''),
                      setDescription(''),
                      navigation.goBack())
                    : Alert.alert('You have to Add at least 1 skill');
                }}
              />
              <Button
                Title={'Next'}
                Btnstyle={{marginBottom: 10, marginTop: 0, width: 130}}
                navigation={navigation}
                onpress={() => {
                  value ? setTabView(2) : setSkillErr('Please select a skill');
                  setChecking(!checking);
                }}
              />
            </View>
          </>
        ) : TabView == 2 ? (
          <Wrapper
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              style={{
                marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 2 : 23),
                marginBottom: hp(0),
              }}
              keyboardShouldPersistTaps={'always'}>
              <TouchableOpacity
                onPress={() => {
                  // console.log('street ', pickstreeAdres);
                  // console.log('location', Location);
                }}
                style={[Styles.FlatListCard]}>
                <View style={Styles.GreenDot}></View>
                <Text style={Styles.FlatListCardTxt}>{Cname}</Text>
                {/* <Image source={require('../../../Assets/bartender.png')} style={{ height: 25, width: 25 }} /> */}
                <Text></Text>
              </TouchableOpacity>
              <ScrollView
                contentContainerStyle={{width: wp(90), marginLeft: 30}}
                horizontal={true}
                keyboardShouldPersistTaps={'always'}>
                <TouchableOpacity
                  style={[Styles.FlatListCard2, {backgroundColor: '#fff'}]}>
                  <View style={[Styles.GreenDot]}></View>

                  <GooglePlacesAutocomplete
                    listViewDisplayed="false"
                    // listViewDisplayed={false}
                    // numberOfLines={2}
                    ref={ref}
                    // placeholder={pickstreeAdres ? pickstreeAdres : Location}
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
                        marginLeft: 30,
                      },
                      textInput: {
                        borderWidth: 0,
                        borderColor: '#15096F',
                        borderRadius: 10,
                        height: 50,
                        backgroundColor: '#fff',
                        width: '100%',
                        color: '#15096F',
                        fontFamily: 'Poppins-Medium',
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
              {/* {ExperienceErr ? <Text style={Styles.Empty}>{ExperienceErr}</Text> : null} */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 40,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Button
                  Title={'Back'}
                  Btnstyle={{marginBottom: 10, marginTop: 0, width: 130}}
                  navigation={navigation}
                  onpress={() => setTabView(1)}
                />
                <Button
                  Title={'Next'}
                  Btnstyle={{marginBottom: 10, marginTop: 0, width: 130}}
                  navigation={navigation}
                  onpress={() => setTabView(3)}
                />
              </View>
            </ScrollView>
          </Wrapper>
        ) : TabView == 3 ? (
          <Wrapper style={{flex: 1}} behavior="padding">
            <ScrollView
              keyboardDismissMode="interactive"
              style={{
                marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 2 : 23),
                paddingBottom: bottom + 50,
              }}
              keyboardShouldPersistTaps={'always'}>
              <View>
                <TouchableOpacity style={[Styles.FlatListCard]}>
                  <View style={Styles.GreenDot}></View>
                  <Text style={Styles.FlatListCardTxt}>{Cname}</Text>
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
                                            <Text></Text>
                                        /> */}
                  <Text></Text>
                </TouchableOpacity>
                <TextInput
                  style={Styles.input}
                  placeholder="Enter Experience"
                  placeholderTextColor="lightgray"
                  returnKeyType="done"
                  value={experience}
                  onChangeText={text => {
                    checkExp(text);
                  }}
                  keyboardType="number-pad"
                />
                {ExperienceErr ? (
                  <Text style={Styles.Empty}>{ExperienceErr}</Text>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <Button
                    Title={'Back'}
                    Btnstyle={{marginBottom: 10, marginTop: 0, width: 130}}
                    navigation={navigation}
                    onpress={() => setTabView(1)}
                  />
                  <Button
                    Title={'Next'}
                    Btnstyle={{marginBottom: 10, marginTop: 0, width: 130}}
                    navigation={navigation}
                    onpress={() => setTabView(4)}
                  />
                </View>
              </View>
            </ScrollView>
          </Wrapper>
        ) : TabView == 4 ? (
          Platform.OS == 'android' ? (
            <ScrollView
              keyboardDismissMode="interactive"
              style={{
                marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 2 : 23),
                paddingBottom: Platform.OS == 'ios' ? bottom : 0,
              }}
              keyboardShouldPersistTaps={'handled'}>
              <View>
                <TouchableOpacity style={[Styles.FlatListCard]}>
                  <View style={Styles.GreenDot}></View>

                  <Text style={Styles.FlatListCardTxt}>{Cname}</Text>
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
                  onChangeText={text => {
                    setDescription(text), setDescriptionErr('');
                  }}
                />
                {descriptionErr ? (
                  <Text style={Styles.Empty}>{descriptionErr}</Text>
                ) : null}
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
                      navigateFrom == 'Profile'
                        ? (setTabView(1),
                          setSkill(''),
                          setValue(''),
                          setLocation(''),
                          setExperience(''),
                          setDescription(''))
                        : Alert.alert('You have to Add at least 1 skill');
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
            </ScrollView>
          ) : (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              <ScrollView
                ref={scrollViewRef}
                // keyboardDismissMode="interactive"
                style={{
                  marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 1 : 23),
                  paddingBottom: Platform.OS == 'ios' ? bottom : 0,
                }}
                keyboardShouldPersistTaps={'handled'}>
                <View>
                  <TouchableOpacity style={[Styles.FlatListCard]}>
                    <View style={Styles.GreenDot}></View>

                    <Text style={Styles.FlatListCardTxt}>{Cname}</Text>
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
                    onChangeText={text => {
                      setDescription(text), setDescriptionErr('');
                    }}
                  />
                  {descriptionErr ? (
                    <Text style={Styles.Empty}>{descriptionErr}</Text>
                  ) : null}
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
                        navigateFrom == 'Profile'
                          ? (setTabView(1),
                            setSkill(''),
                            setValue(''),
                            setLocation(''),
                            setExperience(''),
                            setDescription(''))
                          : Alert.alert('You have to Add at least 1 skill');
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
              </ScrollView>
            </KeyboardAvoidingView>
          )
        ) : null}
      </ImageBackground>
    </>
  );
};

export default Index;
