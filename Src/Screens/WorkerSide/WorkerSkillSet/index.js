import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  // Platform,
} from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FlatList from 'react-native-swipeable-list';
import {DeleteSkill, SkillsList} from '../../../lib/api';
import {useSelector} from 'react-redux';
import {WaveIndicator} from 'react-native-indicators';
const Index = ({navigation, route}) => {
  const NavigateFrom = route.params;
  console.log('Navigate from in skill set', NavigateFrom);
  const [skills, setSkills] = useState([]);
  const userData = useSelector(({USER}) => USER);
  const [check, setCheck] = useState(false);
  const [list, setList] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [search, setSearch] = useState('');
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
    setShowModal(true);
    SkillsList({
      Auth: userData.userData.token,
      id: userData.userData.userdata.id,
    }).then(res => {
      console.log('Reponse of Skills list Api in Worker Skill Set', res);
      if (res.status == 'success') {
        setSkills(res.WorkerSkills);
        setList(res.WorkerSkills);
        setShowModal(false);
      }
    });
  }, [check]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowModal(true);
      SkillsList({
        Auth: userData.userData.token,
        id: userData.userData.userdata.id,
      }).then(res => {
        console.log('Reponse of Skills list Api in Worker Skill Set', res);
        if (res.status == 'success') {
          setSkills(res.WorkerSkills);
          setList(res.WorkerSkills);
          setShowModal(false);
        } else {
          setShowModal(false);
          Alert.alert('something Went Wrong');
        }
      });
    });
    return unsubscribe;
  }, [navigation]);
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

  const QuickActions = (index, item) => {
    return (
      <TouchableOpacity
        // onPress={() => console.log("item", item.skill_id)}
        onPress={() =>
          DeleteSkill({Auth: userData.userData.token, id: item.skill_id}).then(
            res => {
              console.log('response of delete skill api', res);
              if (res.status == 'success') {
                setCheck(!check);
              }
            },
          )
        }>
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
                color: 'red',
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
              }}>
              Delete
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const SwipableRender = ({item}) => (
    <TouchableOpacity
      style={[Styles.ActiveCardView, {backgroundColor: '#fff'}]}
      onPress={() => navigation.navigate('SkillDetails', item)}>
      <Text style={Styles.CardTxt}>{item.category_name}</Text>
      <Image
        source={require('../../../Assets/greentick.png')}
        style={{height: 15, width: 15, tintColor: '#15096F'}}
      />
    </TouchableOpacity>
  );
  const searchText = e => {
    let filteredName = [];
    // if (e) {
    filteredName = skills.filter(item => {
      // console.log(item);
      return item.category_name.toLowerCase().includes(`${e.toLowerCase()}`);
      // item.location.toLowerCase().includes(`${e.toLowerCase()}`)
    });
    setList(filteredName);
    // filteredName = [];
    // }
  };
  const {bottom, top} = useSafeAreaInsets();
  console.log('sl', skills);
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{
          paddingTop: Platform.OS == 'ios' ? top : 0,
          flex: 1,
          height: '45%',
          paddingBottom: Platform.OS == 'ios' ? bottom : 0,
        }}>
        <View style={Styles.HeaderTopView}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Icon name="left" color="white" size={20} />
          </TouchableOpacity>
          <Image
            source={require('../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={Styles.BigText}>Skill Set</Text>

        <Text style={Styles.Subheaing}>
          select your skills and after that enter proper detail
        </Text>
        <TextInput
          style={Styles.input}
          value={search}
          onChangeText={text => {
            setSearch(text);
            searchText(text);
          }}
          placeholder="Search skill"
          placeholderTextColor="#FFF0F5"
        />

        <Wrapper
          style={{
            marginTop: keyboardStatus == 'Keyboard Shown' ? 20 : 120,
            flex: 1,
          }}>
          {skills.length > 0 ? (
            <FlatList
              data={list}
              renderItem={SwipableRender}
              keyExtractor={item => item.id}
              maxSwipeDistance={100}
              renderQuickActions={({index, item}) => QuickActions(index, item)}
            />
          ) : (
            <View style={{flex: 1}}>
              <Text style={Styles.Empty}>Add Skills to find Releted jobs</Text>
            </View>
          )}
          <TouchableOpacity
            style={Styles.Btn}
            onPress={() => navigation.navigate('WorkerAddSkill', NavigateFrom)}>
            <Text style={Styles.BtnTxt}>Add skills</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Styles.BtnSave}
            onPress={() => navigation.navigate('WorkerTabNavigator')}>
            <Text style={Styles.BtnTxtSave}>Save</Text>
          </TouchableOpacity>
        </Wrapper>

        {myModal()}
      </ImageBackground>
      {/* </SafeAreaView> */}
    </>
  );
};

export default Index;
