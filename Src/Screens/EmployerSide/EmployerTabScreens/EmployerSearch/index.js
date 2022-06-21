import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
  BackHandler,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Styles from './styles';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchWorker, EmployerFilter, CategoryList} from '../../../../lib/api';
import {useSelector} from 'react-redux';
import Person from 'react-native-vector-icons/MaterialIcons';
import Arrow from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import Thumb from 'react-native-vector-icons/FontAwesome';
import {WaveIndicator} from 'react-native-indicators';
import Slider from '@react-native-community/slider';
import {parse} from '@babel/core';
const Index = ({navigation}) => {
  const [scroll, setScroll] = useState(true);
  const [slideStartingValue, setslideStartingValue] = useState(1);
  const [slideStartingCount, setslideStartingCount] = useState(1);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  useEffect(() => {
    CategoryList({Auth: userData.userData.token}).then(res => {
      if (res) {
        if (res.status == 'Success') {
          const PapulateList = res.message.map(item => {
            const NewData = {
              label: item.name,
              value: item.id.toString(),
            };
            console.log('New Data', NewData);
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
  }, []);
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
  // const {bottom, top} = useSafeAreaInsets();
  const FilterApiHandler = () => {
    setShowModal(true);
    console.log('inside Filter Api handler');
    const data = new FormData();
    experience && data.append('experience', experience);
    slideStartingValue && data.append('radius', slideStartingValue);
    rating && data.append('rating', rating);
    Skill && data.append('skill', Skill);

    EmployerFilter({Auth: userData.userData.token}, data)
      .then(res => {
        console.log('Filter Api Response', res);
        if (res.status == 'success') {
          setSearchResult(res.Workers);
          setShowFilterModal(false);
          setShowModal(false);
        } else {
          setShowFilterModal(false);
          setShowModal(false);
          Alert.alert('Something went wrong');
        }
      })
      .catch(e => {
        console.log('error ,', e);
      });
  };
  const {bottom, top} = useSafeAreaInsets();
  const Count = 3;
  const userData = useSelector(({USER}) => USER);
  const [searcing, setSearching] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [emptyError, setEmptyErro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [Cname, setCname] = useState('');
  const [open, setOpen] = useState(false);
  const [Skill, setSkill] = useState(null);
  const [items, setItems] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [rating, setRating] = useState(null);
  const [items1, setItems1] = useState([
    {label: '1 Stars', value: '1'},
    {label: '2 Stars', value: '2'},
    {label: '3 Stars', value: '3'},
    {label: '4 Stars', value: '4'},
    {label: '5 Stars', value: '5'},
  ]);
  const [open2, setOpen2] = useState(false);
  const [radius, setRadius] = useState(null);
  const [items2, setItems2] = useState([
    {label: '1  to 10KM', value: '10'},
    {label: '11  to 20KM', value: '20'},
    {label: '21  to 30KM', value: '30'},
  ]);
  const [low, setLow] = useState('');
  const [high, setHigh] = useState('');
  const [experience, setExperience] = useState('');
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
  const filterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
      visible={showFilterModal}>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={{
          flex: 1,
          height: '50%',
          paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
          paddingBottom: Platform.OS == 'ios' ? bottom : 0,
        }}>
        <View style={Styles.HeaderTopView}>
          <TouchableOpacity onPress={() => setShowFilterModal(false)}>
            <Arrow name="left" size={20} color="#fff" style={{left: 20}} />
          </TouchableOpacity>
          <Image
            source={require('../../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={Styles.BigText}>Filters</Text>
        <ScrollView
          style={{marginTop: hp('32%'), backgroundColor: '#F4F4Fa'}}
          scrollEnabled={scroll}>
          <View style={Styles.InputsView}>
            <Text style={Styles.HeadinOnly}>Skill</Text>
            <DropDownPicker
              onPress={() => setScroll(!scroll)}
              open={open}
              value={Skill}
              items={items}
              setOpen={setOpen}
              setValue={setSkill}
              setItems={setItems}
              style={{marginTop: 10, marginBottom: open ? 200 : 10}}
              placeholder="Select Skill"
              placeholderStyle={{color: '#A19DC5'}}
              dropDownContainerStyle={{flex: 1}}
              itemSeparator={true}
              onChangeValue={() => setScroll(!scroll)}
            />
            <Text style={Styles.HeadinOnly}>Score</Text>
            <DropDownPicker
              open={open1}
              value={rating}
              items={items1}
              setOpen={setOpen1}
              setValue={setRating}
              setItems={setItems1}
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginBottom: open1 ? 120 : 10,
              }}
              placeholder="Select Score"
              placeholderStyle={{color: '#A19DC5'}}
            />
            <Text style={Styles.HeadinOnly}>Distance (radius)</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Slider
                style={{width: '95%', height: 40}}
                minimumValue={1}
                maximumValue={50}
                minimumTrackTintColor="#15096F"
                maximumTrackTintColor="#15096F"
                thumbTintColor="#15096F"
                // thumbImage={require('../../../../Assets/dp.png')

                // }

                // value={slideStartingCount}

                onSlidingStart={value => {
                  // console.log("value of slider", value)
                  setslideStartingValue(value);
                  setslideStartingCount(slideStartingValue + 0.5);
                }}
                onSlidingComplete={value => {
                  // console.log("value of slider", value)
                  setslideStartingValue(value);
                  setslideStartingCount(slideStartingValue + 0.5);
                }}
              />
              <Text>{parseInt(slideStartingValue)}</Text>
            </View>

            <Text style={Styles.HeadinOnly}>Experience</Text>
            <TextInput
              style={Styles.Input}
              placeholder="Enter Experience"
              value={experience}
              onChangeText={text => setExperience(text)}
              keyboardType="number-pad"
              maxLength={2}
            />
            <TouchableOpacity
              style={Styles.ModalBtn}
              onPress={FilterApiHandler}>
              <Image
                source={require('../../../../Assets/tick.png')}
                style={{height: 15, width: 15, top: 3, tintColor: 'white'}}
              />
              <Text style={Styles.ModalBtnTxt}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.ModalBtn, {marginTop: 10}]}
              onPress={() => {
                setRating(''),
                  setRadius(''),
                  setExperience(''),
                  setslideStartingCount(1);
                setslideStartingValue(1);
                setShowFilterModal(false);
              }}>
              <Text style={Styles.ModalBtnTxt}>Remove Filters</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );

  const search = () => {
    setEmptyErro('');
    setShowModal(true);
    SearchWorker({
      Auth: userData.userData.token,
      category: searcing,
    }).then(response => {
      console.log('response of searching ', JSON.stringify(response));
      if (response.status == 'Success') {
        setSearchResult(response.Workers);
        setCname(response.Category_Name);

        setShowModal(false);
        if (response.Workers == '') {
          setEmptyErro('No Related Category, Name or description found');
          setShowModal(false);
        } else {
          setEmptyErro('');
          setShowModal(false);
        }
      } else {
        setShowModal(false);
        Alert.alert('Something went wrong');
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[Styles.FlatListCard]}
        onPress={() =>
          navigation.navigate('WorkerProfileShow', {item, searcing})
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item.Image
                ? {uri: item.Image}
                : require('../../../../Assets/dp2.png')
            }
            style={Styles.SmallRoundPic}
          />
          <View style={{marginLeft: 10}}>
            <Text style={Styles.name}>{item.Name}</Text>
            <Text style={Styles.Regular}>{Cname}</Text>
          </View>
        </View>

        <View>
          <View style={{borderWidth: 0, width: 50, alignSelf: 'flex-end'}}>
            <StarRating
              disabled={false}
              // emptyStar={'ios-star-outline'}
              // fullStar={'ios-star'}
              // halfStar={'ios-star-half'}
              // iconSet={'Ionicons'}
              maxStars={5}
              emptyStarColor={'white'}
              rating={item.Total_rating}
              // rating={4}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={'#1C876A'}
              starSize={12}
            />
          </View>
          {/* <Text style={Styles.jobsDoneTxt}>10 jobs done</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ImageBackground
        source={require('../../../../Assets/bg.png')}
        style={{
          flex: 1,
          height: '50%',
          // paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
          // paddingBottom: Platform.OS == 'ios' ? bottom : 0,
        }}>
        <View style={[Styles.HeaderTopView, {marginTop: top - 10}]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}></TouchableOpacity>
          <Image
            source={require('../../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={Styles.BigText}>Search Worker</Text>
        <View style={Styles.inputView}>
          <TextInput
            // placeholder="Plumber Electrician"
            placeholderTextColor="#fff"
            style={Styles.input}
            value={searcing}
            onChangeText={text => setSearching(text)}
          />
          <TouchableOpacity style={Styles.SearchBtn} onPress={search}>
            <Person name="person-search" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: hp(5),
            width: wp(7),
            alignSelf: 'flex-end',
            borderWidth: 0,
            zIndex: 3,
            marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 17 : 38),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 20,
            top: 50,
          }}>
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Image
              source={require('../../../../Assets/filter.png')}
              style={{height: 22, width: 22, tintColor: '#15096F'}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 5 : 25),
            flex: 1,
          }}>
          {searchResult.length > 0 ? (
            <FlatList
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              data={searchResult}
            />
          ) : (
            <Text style={{alignSelf: 'center', marginTop: 100, color: 'red'}}>
              {emptyError}
            </Text>
          )}
        </View>
        {myModal()}
        {filterModal()}
      </ImageBackground>
    </>
  );
};

export default Index;
