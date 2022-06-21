import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  // ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Styles from './Styles';
import FlatList from 'react-native-swipeable-list';
import StarRating from 'react-native-star-rating';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../../../shared/Button';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from 'react-native-geolocation-service';
import {logged} from '../../../../redux/actions';
import {WaveIndicator} from 'react-native-indicators';
import {
  ActiveJobList,
  ArchiveJobList,
  AddActiveToArchive,
  AddArchiveToActive,
  updateFcmToken,
  UpdateLocation,
} from '../../../../lib/api';
const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const {bottom, top} = useSafeAreaInsets();
  const LocationUpdate = (latitude, longitude) => {
    // UpdateLocation({
    //   Auth: userData.userData.token,
    //   latitude: latitude,
    //   longitude: longitude,
    // }).then(res => {
    //   if (res.status == 'success') {
    //     logged(res)(dispatch);
    //   } else {
    //     Alert.alert('Something went wrong please try again !');
    //   }
    // });
  };
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
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

  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // setlatitude(position.coords.latitude);
        // setlongitude(position.coords.longitude);
        LocationUpdate(position.coords.latitude, position.coords.longitude);
      },
      error => {},
      {
        enableHighAccuracy: true,
        // timeout: 15000,
        // maximumAge: 10000
      },
    );
  };

  const userData = useSelector(({USER}) => USER);
  const [ActiveJobLists, setActiveJobList] = useState([]);
  const [ArchiveJobLists, setArchiveJobList] = useState([]);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [ActiveToArchive, setActiveToArchive] = useState('');
  const [ArchivetoActive, setArchiveToActive] = useState('');
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [check, setCheck] = useState(false);
  // console.log('list', JSON.stringify(list?.request_users[0]));
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
  useEffect(() => {
    SplashScreen.hide();
    getToken();
    setTimeout(() => {
      APiHandler();
    }, 1000);
    Platform.OS == 'ios'
      ? // Geolocation.requestAuthorization('always').then(res => {
        cuRRentlocation()
      : // })
        requestLocationPermission();
  }, [check]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        APiHandler();
      }, 1000);
    });
    return unsubscribe;
  }, [navigation]);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();

    updateFcmToken({Auth: userData.userData.token, fcm_token: fcmToken});
    messaging().onTokenRefresh(token => {
      updateFcmToken({Auth: userData.userData.token, fcm_token: token}).then(
        response => {},
      );
    });
  };

  const AddActiveJobToArchive = id => {
    //setShowModal(true)
    AddActiveToArchive({Auth: userData.userData.token, id: id}).then(res => {
      if (res.status == 'Success') {
        setShowArchiveModal(true);
        // setShowModal(false)
        // setCheck(!check)
      }
    });
  };
  const AddArchiveJobToActive = id => {
    AddArchiveToActive({Auth: userData.userData.token, id: id}).then(res => {
      if (res.status == 'Success') {
        setCheck(!check);
      }
    });
  };
  const APiHandler = () => {
    setShowModal(true);
    ActiveJobList({Auth: userData.userData.token})
      .then(res => {
        setShowModal(false);

        if (res) {
          if (res.status == 'Success') {
            setActiveJobList(res.ActiveJobsList);
            setList(res.ActiveJobsList);
          } else {
            setShowModal(false);
            Alert.alert('Something went wrong please try again !');
          }
        } else {
          setShowModal(false);
          Alert.alert('Something went wrong please try again !');
        }
      })
      .catch(err => {
        setShowModal(false);
      });
    ArchiveJobList({Auth: userData.userData.token}).then(res => {
      if (res) {
        if (res.status == 'Success') {
          setArchiveJobList(res.ArchieveJobsList.reverse());
          setShowModal(false);
        } else {
          setShowModal(false);
          Alert.alert('Something went wrong please try again !');
        }
      } else {
        setShowModal(false);
        Alert.alert('Something went wrong please try again !');
      }
    });
  };
  const searchText = e => {
    let filteredName = [];
    // if (e) {
    filteredName = ActiveJobLists.filter(item => {
      return (
        item.category_name.toLowerCase().includes(`${e.toLowerCase()}`) ||
        item?.location?.toLowerCase().includes(`${e.toLowerCase()}`)
      );
    });
    setList(filteredName);
    // filteredName = [];
    // }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  // console.log('userData in Employer Home',);
  const Count = 5;
  const [TabView, setTabView] = useState(1);
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
        {/* <WaveIndicator color="#5B77D0" size={150} /> */}
        <ActivityIndicator color="#5B77D0" size="large" />
      </View>
    </Modal>
  );
  const ArchiveModal = () => (
    <Modal animationType="slide" transparent={true} visible={showArchiveModal}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000088',
        }}>
        <View
          style={{
            height: 300,
            width: '90%',
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
          }}>
          <Text style={Styles.FoundText}>Found Worker</Text>
          {/* <View style={Styles.AnswerView}> */}
          <Button
            Title={'Yes'}
            Btnstyle={{width: '90%', marginTop: 40}}
            Txtstyle={{fontFamily: 'Poppins-SemiBold'}}
            navigation={navigation}
            onpress={() => {
              setShowArchiveModal(false), setCheck(!check);
            }}
          />
          <Button
            Title={'No'}
            Btnstyle={{
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 1,
              width: '90%',
              marginTop: 20,
            }}
            Txtstyle={{fontFamily: 'Poppins-SemiBold', color: 'red'}}
            navigation={navigation}
            onpress={() => {
              setShowArchiveModal(false), setCheck(!check);
            }}
          />
        </View>
      </View>

      {/* </View> */}
    </Modal>
  );
  const ActiveQuickActions = (index, item) => {
    setActiveToArchive(item.id);
    return (
      <TouchableOpacity
        onPress={() => {
          AddActiveJobToArchive(item.job_id);
        }}
        // onPress={() => console.log("item ", item)}
      >
        <View
          style={{
            height: '90%',
            width: 100,
            alignSelf: 'flex-end',
            borderBottomWidth: 0.3,
            borderBottomColor: 'grey',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 3,
            marginRight: 20,
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              marginRight: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#5B77D0',
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
              }}>
              Archive
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const AcrchiveQuickActions = (index, item) => {
    setArchiveToActive(item.id);
    return (
      <TouchableOpacity onPress={() => AddArchiveJobToActive(item.job_id)}>
        <View
          style={{
            height: '90%',
            width: 100,
            alignSelf: 'flex-end',
            borderBottomWidth: 0.3,
            borderBottomColor: 'grey',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 3,
            marginRight: 20,
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              marginRight: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#5B77D0',
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
              }}>
              Activate
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const ArchiveRender = ({item}) => (
    <TouchableOpacity
      style={[Styles.ActiveCardView]}
      onPress={() => navigation.navigate('EmployerJobDetails', item)}>
      <View style={Styles.ActiveCardImageView}>
        <Text style={[Styles.CardName, {color: 'white'}]}>
          {item.CategoryName} in {item.location}
        </Text>
        {/* <Text style={[Styles.CardProfession, { color: '#98A9E1' }]}>{item.location}</Text> */}
      </View>

      <View style={Styles.ActiveCardRatingView}>
        <Text style={Styles.ActiveTxt}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const SwipableRender = ({item}) => (
    <TouchableOpacity
      style={[
        Styles.ActiveCardView,
        {backgroundColor: '#fff', flexWrap: 'wrap'},
      ]}
      // onPress={() => navigation.navigate('EmployerJobDetails', item)}
      onPress={() => {
        // navigation.navigate('EmployerChatList')
        if (item.requests > 0) {
          navigation.navigate('SeprateChat', {
            item,
          });
        }
      }}>
      <Text style={Styles.CardName}>
        {item.category_name} in {item.location}
      </Text>
      <TouchableOpacity
      // onPress={() => {
      //   // navigation.navigate('EmployerChatList');
      //   // if (item.requests > 0) {
      //   //   navigation.navigate('Chat', {
      //   //     item: item.request_users[0].user,
      //   //     dist: item.disatance,
      //   //     // searcing: item.category_name,
      //   //     fcm_token: item.request_users[0].user.fcm_token,
      //   //   });
      //   // }

      // }}
      >
        <ImageBackground
          source={require('../../../../Assets/Clicks.png')}
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="contain">
          {/* <TouchableOpacity */}
          {/* // onPress={() => console.log('items', item)} */}
          {/* > */}
          <Text>{item.requests}</Text>
          {/* </TouchableOpacity> */}
        </ImageBackground>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  // console.log('userData', userData);
  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={Styles.bg}>
        <View style={[Styles.HeaderTopView, {marginTop: top - 10}]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}></TouchableOpacity>
          <Image
            source={require('../../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={Styles.BigText}>Offers</Text>

        <View style={Styles.TabView}>
          <TouchableOpacity onPress={() => setTabView(1)}>
            <Text
              style={[
                Styles.TabViewTxt,
                {
                  //   borderBottomColor: 'white',
                  //   backgroundColor: 'blue',
                  borderBottomWidth: 1,
                  // borderColor: 'white',
                  borderBottomWidth: TabView == 1 ? 2 : 0,
                  opacity: TabView == 1 ? 2 : 0.5,
                  fontSize: TabView == 1 ? 18 : 14,
                  fontFamily:
                    TabView == 1 ? 'Poppins-SemiBold' : 'Poppins-Medium',
                },
              ]}>
              {' '}
              Active{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTabView(2)}>
            <Text
              style={[
                Styles.TabViewTxt,
                {
                  borderBottomWidth: TabView == 2 ? 2 : 0,
                  opacity: TabView == 2 ? 2 : 0.5,
                  fontFamily:
                    TabView == 2 ? 'Poppins-SemiBold' : 'Poppins-Medium',
                  fontSize: TabView == 2 ? 18 : 14,
                },
              ]}>
              {' '}
              Archive{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={Styles.input}
          placeholder="Search"
          value={search}
          onChangeText={text => {
            setSearch(text);
            searchText(text);
          }}
          placeholderTextColor="#98A9E1"
        />

        {TabView == 1 && (
          <>
            <Wrapper
              behavior="padding"
              style={{
                marginTop: heightPercentageToDP(
                  keyboardStatus == 'Keyboard Shown' ? 2 : 18,
                ),
                flex: 1,
                // backgroundColor: 'red',
              }}>
              {ActiveJobLists.length > 0 ? (
                <FlatList
                  data={list}
                  renderItem={SwipableRender}
                  keyExtractor={item => item.id}
                  maxSwipeDistance={120}
                  renderQuickActions={({index, item}) =>
                    ActiveQuickActions(index, item)
                  }
                  style={{top: 10}}
                />
              ) : (
                <Text style={Styles.Empty}>You have no Active offer</Text>
              )}
            </Wrapper>
            {keyboardStatus != 'Keyboard Shown' && (
              <Button
                Title={'Add new offer'}
                Btnstyle={{
                  width: '90%',
                  alignItems: 'flex-start',
                  paddingHorizontal: 10,
                }}
                Txtstyle={{fontFamily: 'Poppins-SemiBold'}}
                navigation={navigation}
                onpress={() => {
                  navigation.navigate('EmployerCreateOffer');
                  setTabView(1);
                }}
              />
            )}
          </>
        )}

        {TabView == 2 && (
          <View
            style={{
              flex: 1,
              paddingTop: heightPercentageToDP(
                keyboardStatus == 'Keyboard Shown' ? 5 : 18,
              ),
            }}>
            {/* <FlatList
                            data={ArchiveJobLists}
                            renderItem={ArchiveRender}
                            keyExtractor={item => item.id}

                        /> */}
            {ArchiveJobLists.length > 0 ? (
              <FlatList
                data={ArchiveJobLists}
                renderItem={ArchiveRender}
                keyExtractor={item => item.id}
                maxSwipeDistance={120}
                renderQuickActions={({index, item}) =>
                  AcrchiveQuickActions(index, item)
                }
                style={{top: 10}}
              />
            ) : (
              <Text style={Styles.Empty}>You have no Archived offer</Text>
            )}
          </View>
        )}
        {myModal()}
        {ArchiveModal()}
      </ImageBackground>
    </>
  );
};

export default Index;
