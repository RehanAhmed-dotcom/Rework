import React, {useEffect, useLayoutEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
  Modal,
  Keyboard,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {recieverMsg, senderMsg} from '../../../lib/messageUtils';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import Back from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Message = props => {
  const {userData} = useSelector(({USER}) => USER);

  // console.log('user    Data      in        chat', userData);
  let isCurrentUser =
    props.sendBy === userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, '')
      ? true
      : false;

  return (
    <View style={styles.messageContainer}>
      {isCurrentUser ? (
        <View style={styles.inverted}>
          <View
            style={[
              styles.message,
              {
                borderBottomRightRadius: 0,
                marginRight: 10,
              },
            ]}>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 15,
                color: 'grey',
                fontFamily: 'Poppins-Medium',
              }}>
              {props.msg}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={{color: 'grey', fontSize: 12, marginRight: 5}}>
                {moment(props.date).format('DD/MM/YY HH:MM')}
              </Text>
            </View>
          </View>
          {userData.userdata.image ? (
            <Image
              source={{uri: userData.userdata.image}}
              style={styles.avatar}
            />
          ) : (
            <TouchableOpacity
            // onPress={() => console.log("userImage", userData)}
            >
              <Image
                source={require('../../../Assets/dp.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {props.guestImage ? (
            <TouchableOpacity>
              <Image source={{uri: props.guestImage}} style={styles.avatar} />
            </TouchableOpacity>
          ) : (
            <Image
              source={require('../../../Assets/dp.png')}
              style={styles.avatar}
            />
          )}
          <View
            style={[
              styles.message,
              {borderBottomLeftRadius: 0, marginLeft: 10, paddingLeft: 10},
            ]}>
            <Text
              style={{
                color: 'grey',
                fontSize: 15,
                color: 'grey',
                fontFamily: 'Poppins-Medium',
              }}>
              {props.msg}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={{color: 'grey', fontSize: 12, marginRight: 5}}>
                {moment(props.date).format('DD/MM/YY HH:MM')}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
export default function ChatScreen({navigation, route}) {
  const {item, searcing, fcm_token} = route.params;
  const dist = route.params.dist;
  const rating = route?.params?.rating;
  const emp = route?.params?.emp;
  console.log('distance of specific user', emp);
  // console.log('item in chat', item, fcm_token);
  const {userData} = useSelector(({USER}) => USER);
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
  const guestData = {
    Name: item.Name ? item.Name : item.name,
    email: item.email,
    fcm_token: fcm_token,
    Image: item.Image ? item.Image : item.image,
    profession: searcing ? searcing : null,
    total_rating: rating ? rating : item.total_rating,
    Distance: item.disatance
      ? item.disatance
      : item.Distance
      ? item.Distance
      : dist,
  };
  const userData2 = {
    Name: `${userData.userdata.name}`,
    email: userData.userdata.email,
    Image: userData.userdata.image,
    fcm_token: userData.userdata.fcm_token,
    profession: searcing ? searcing : null,
    total_rating: userData.userdata.total_rating,
    Distance: item.disatance
      ? item.disatance
      : item.Distance
      ? item.Distance
      : dist,
  };
  console.log('this is the distance i get', item);
  const Wrapper = Platform.OS == 'android' ? View : KeyboardAvoidingView;
  const _chatUsers = async () => {
    try {
      database()
        .ref('users/' + userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .set({
          latestMessage: messages,
          // timestamp: database.ServerValue.TIMESTAMP,
          // counter: 0,
          user: guestData,
        });

      database()
        .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          const counts = snapshot?.val()?.counter;
          database()
            .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .child(userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .set({
              latestMessage: messages,
              // timestamp: database.ServerValue.TIMESTAMP,
              // counter: counts ? counts + 1 : 1,
              user: userData2,
            });
        });
    } catch (error) {}
  };
  // console.log("userData in chat", userData.userdata.fcm_token)
  const {bottom, top} = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    _getMeesages();
  }, []);

  const handleSend = () => {
    setMessage('');

    if (message) {
      _handlePushNotification();
      // console.log('message is here', message);
      senderMsg(
        message,
        userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
      );
      _chatUsers()
        .then(res => {
          console.log('no error found in send', res);
        })
        .catch(err => {
          console.log('error inside sender', err);
        });

      recieverMsg(
        message,
        userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
        _chatUsers(),
      )
        .then(res => {
          console.log('no error found in rev', res);
        })
        .catch(err => {
          console.log('error inside receiver', err);
        });
    }
  };

  const _getMeesages = async () => {
    try {
      database()
        .ref('messeges')
        .child(userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              date: child.val().messege.date,
            });
            return undefined;
          });
          setMessages(msgs.reverse());

          // console.log('msssssssssssssggggggggggsssssssss', msgs);
        });
    } catch (error) {}
  };

  const _handlePushNotification = () => {
    // console.log('inside push notification function', guestData.fcm_token);
    const userData1 = {
      name: `${userData.userdata.name}`,
      email: userData.userdata.email,
      image: userData.userdata.image,
      fcm_token: userData.userdata.fcm_token,
    };
    const dataToSend = {
      notification: {
        id: `${userData1.email}`,
        title: `${userData1.name}`,
        body: message,
      },
      data: {
        guestData: guestData,
        item: userData2,
        fcm_token: userData2.fcm_token,
        type: 'message',
      },
      to: guestData.fcm_token,
    };
    const data = JSON.stringify(dataToSend);
    // console.log('data to send ', dataToSend);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAUz5xsL4:APA91bEd7I42yrBqFC0d9m1J9TWbJvAl3vpam_OiOF_IzL_e1f9iqD9UaMps9CLDwpAXEyGgILUhn3Lex4NPmcBtDscAXZhGtTQ1Lt195e9vLLHN9d_vFGwyDW1ZEcQw6pjnqQUX5adr',
      },
      body: data,
    })
      .then(res => res.json('response of push notification', res))
      .then(res => {
        // console.log('response of Api send messages , , , , , , ', res);
      })
      .catch(err => {});
  };
  const Count = 5;
  const [type, setType] = useState(false);
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{
          flex: 1,
          height: '42%',
          // backgroundColor: 'red',
          // backgroundColor: 'red',
          paddingTop: Platform.OS == 'ios' ? top - 10 : 0,
          marginBottom: Platform.OS == 'ios' ? bottom : 0,
        }}>
        <View style={styles.HeaderTopView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back name="left" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (emp) {
              navigation.navigate('WorkerProfileShow', {
                item,
                searcing,
                ratings: rating,
                emp,
              });
            } else {
              navigation.navigate('WorkerProfileShow', {
                item,
                searcing,
                ratings: rating,
              });
            }
          }}
          style={styles.ImageView}>
          <View style={styles.PickerView}>
            <Image
              style={styles.Picker}
              source={{
                uri: item.Image ? item.Image : item.image,
              }}
            />
          </View>
          <View
            style={{
              bottom: 0,
              borderWidth: 0,

              width: '80%',
              justifyContent: 'flex-start',
            }}>
            <Text style={styles.MediumText2}>
              {item.Name ? item.Name : item.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{borderWidth: 0, width: 70}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  emptyStarColor={'white'}
                  rating={
                    rating
                      ? rating
                      : item.Total_rating
                      ? item.Total_rating
                      : item.total_rating
                  }
                  fullStarColor={'white'}
                  starSize={12}
                />
              </View>
              <Text style={styles.StartCountTxt}>
                {rating
                  ? rating
                  : item.Total_rating
                  ? item.Total_rating
                  : item.total_rating}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={[
            styles.screen,
            {marginTop: keyboardStatus == 'Keyboard Shown' ? hp(0) : hp(19)},
          ]}>
          <FlatList
            inverted
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({item}) => (
              <Message
                msg={item.msg}
                sendBy={item.sendBy}
                guestImage={guestData.Image}
                date={item.date}
              />
            )}
            keyExtractor={(_, index) => `message-${index}`}
          />
        </View>
        <Wrapper
          behavior={'padding'}
          style={[
            styles.inputContainer,
            {
              marginBottom:
                Platform.OS == 'android'
                  ? 0
                  : keyboardStatus == 'Keyboard Shown'
                  ? 20
                  : 0,
            },
          ]}>
          <TextInput
            value={message}
            onChangeText={text => {
              setMessage(text), setType(true);
            }}
            style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              height: 45,
              color: 'black',
              alignItems: 'center',
              // width: '85%',
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 10,

              flexDirection: 'row',
            }}
            placeholder="Type your message here"
            placeholderTextColor={'grey'}
          />
          {/* <Pressable onPress={handleSend}>
          <Image
            source={require('../../../Assets/send.png')}
            style={[styles.send, { tintColor: message ? 'black' : 'gray' }]}
          />
        </Pressable> */}
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 45,
              justifyContent: 'center',
            }}
            onPress={handleSend}>
            <Text
              style={[
                styles.sendBtnTxt,
                {color: message.length > 1 ? '#15096F' : '#8983B6'},
              ]}>
              Send
            </Text>
          </TouchableOpacity>
        </Wrapper>
      </ImageBackground>
    </>
  );
}
