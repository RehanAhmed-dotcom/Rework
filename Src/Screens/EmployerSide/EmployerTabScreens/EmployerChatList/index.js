import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
  Keyboard,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Styles from './styles';
import {getUser} from '../../../../lib/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
const Index = ({navigation}) => {
  const [list, setList] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const [Categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _usersList();
    });
    return unsubscribe;
  }, [navigation]);
  const _usersList = useCallback(async () => {
    try {
      database()
        .ref('users/' + userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .orderByChild('timestamp')
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push(child.val());
          });

          setList(users.reverse());
          setCategories(users.reverse());
          // console.log('user list in chat list ', users);
        });
    } catch (error) {}
  }, []);
  const searchText = e => {
    let filteredName = [];
    // if (e) {
    filteredName = Categories.filter(item => {
      // console.log(item);
      return item.user.Name.toLowerCase().includes(`${e.toLowerCase()}`);
    });
    setList(filteredName);
    // filteredName = [];
    // }
  };
  const renderitem = ({item}) => {
    return (
      <TouchableOpacity
        style={Styles.smallCard}
        onPress={() => {
          getUser({Auth: userData.token, email: item.user.email}).then(res => {
            console.log('res', res);
            navigation.navigate('Chat', {
              item: item.user,
              fcm_token: res.data.fcm_token,
              rating: res.data.total_rating,
              emp: 'employer',
            });
          });
        }}>
        <Image source={{uri: item.user.Image}} style={Styles.SmallRoundPic} />

        <View>
          <Text style={[Styles.name, {left: 10}]}>{item.user.Name}</Text>
          <View
            style={{
              height: 20,
              left: 10,
              width: '65%',
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor: 'red',
              justifyContent: 'space-between',
            }}>
            <Text style={Styles.Profession}>{item.user.profession}</Text>
            <Text style={Styles.Profession}>
              {item.user.Distance
                ? Math.round(parseFloat(item.user.Distance))
                : 0}{' '}
              km
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const {bottom, top} = useSafeAreaInsets();
  return (
    <ImageBackground
      style={Styles.bg}
      source={require('../../../../Assets/bg.png')}>
      <View
        style={[
          Styles.HeaderTopView,
          {marginTop: Platform.OS == 'ios' ? top - 10 : 0},
        ]}>
        <Text></Text>
        <Image
          source={require('../../../../Assets/LogoWhite.png')}
          style={[Styles.smallLogo, {}]}
          resizeMode="contain"
        />
      </View>
      <Text style={Styles.BigText}>Chat</Text>
      <TextInput
        style={Styles.input}
        placeholder="Search"
        placeholderTextColor="white"
        value={search}
        onChangeText={text => {
          setSearch(text);
          searchText(text);
        }}
      />
      <View
        style={{
          flex: 1,
          marginTop: hp(keyboardStatus == 'Keyboard Shown' ? 1 : 23),
        }}>
        {list.length > 0 ? (
          <FlatList
            data={list}
            renderItem={renderitem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={{alignSelf: 'center', marginTop: 100, color: 'red'}}>
            You have not sent any message yet !
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default Index;
