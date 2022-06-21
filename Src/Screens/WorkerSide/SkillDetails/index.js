import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import Styles from './Styles';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
const Index = ({navigation, route}) => {
  const {bottom, top} = useSafeAreaInsets();
  const item = route.params;
  return (
    <>
      <ImageBackground
        source={require('../../../Assets/bg.png')}
        style={{
          paddingTop: Platform.OS == 'ios' ? 30 : 0,
          flex: 1,
          height: '35%',
        }}
        resizeMode="stretch">
        <View style={Styles.HeaderTopView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color="white" />
          </TouchableOpacity>
          <Image
            source={require('../../../Assets/LogoWhite.png')}
            style={Styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={Styles.BigText}>Skill detail</Text>
        <ScrollView>
          <View>
            <View style={Styles.ModalView}>
              <Text style={Styles.ModalHeadingTxt}>{item.category_name}</Text>
              <TextInput
                style={Styles.ModalInput}
                value={item.experience + ' years'}
                editable={false}
              />
              <TextInput
                style={Styles.ModalInput}
                value={item.location}
                editable={false}
              />

              <TextInput
                style={[Styles.ModalInput, {height: 120}]}
                textAlignVertical="top"
                placeholder="Contact No"
                placeholderTextColor="lightgray"
                value={item.description}
                editable={false}
                multiline
              />
            </View>

            <TouchableOpacity
              style={Styles.ModalBtn}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../Assets/tick.png')}
                style={{height: 15, width: 15, top: 3, tintColor: '#fff'}}
              />
              <Text style={Styles.ModalBtnTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Index;
