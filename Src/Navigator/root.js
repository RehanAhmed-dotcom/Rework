import * as React from 'react';
import {Image, View, Platform, Dimensions, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../Screens/CombinedScreens/AuthScreens/Login/index.js';
import Signup from '../Screens/CombinedScreens/AuthScreens/Signup/index.js';
import PassCode from '../Screens/CombinedScreens/AuthScreens/PassCode/index.js';
import StartScreen from '../Screens/CombinedScreens/StartScreen/index.js';
// import ConfirmCode from '../Screens/CombinedScreens/AuthScreens/ConfirmCodeBySms/index.js'
import WellcomeScreen from '../Screens/CombinedScreens/WellcomeScreen/index.js';
import EmployerSearch from '../Screens/EmployerSide/EmployerTabScreens/EmployerSearch/index';
import EmployerChatList from '../Screens/EmployerSide/EmployerTabScreens/EmployerChatList/index';
import EmployerProfile from '../Screens/EmployerSide/EmployerTabScreens/EmployerProfile/index';
import About from '../Screens/CombinedScreens/About/index.js';
import Privacy from '../Screens/CombinedScreens/Privacy/index.js';
import Terms from '../Screens/CombinedScreens/Terms/index';
import EmplyeProfile from '../Screens/EmployerSide/EmployeProfile/index';
import EmployeEditProfile from '../Screens/EmployerSide/EmployeEditProfile/index';
import Chat from '../Screens/CombinedScreens/Chat/index';
import Settings from '../Screens/CombinedScreens/Settings/index';
import {navigationRef} from '../config/NavigationService';
import WorkerHome from '../Screens/WorkerSide/WorkerTabScreens/WorkerHome/index';
import WorkerChatList from '../Screens/WorkerSide/WorkerTabScreens/WorkerChatList/index';
import WorkerProfile from '../Screens/WorkerSide/WorkerTabScreens/WorkerProfile/index';
import SkillDetails from '../Screens/WorkerSide/SkillDetails/index';
import Splash from '../Screens/CombinedScreens/AuthScreens/Splash';
import EmployerHome from '../Screens/EmployerSide/EmployerTabScreens/EmployerHome/index';
import WorkerProfileShow from '../Screens/CombinedScreens/WorkerProfileShow/index';
import ChangePassword from '../Screens/CombinedScreens/AuthScreens/ChangePassword/index';
import EmployerCreateOffer from '../Screens/EmployerSide/EmployerCreateOffer/index';
import WorkerSkillSet from '../Screens/WorkerSide/WorkerSkillSet/index';
import WorkeEditProfile from '../Screens/WorkerSide/WorkerEditProfile/index';
import Ratings from '../Screens/CombinedScreens/Ratings/index';
// import Ratings from '../Screens/EmployerSide/EmployerTabScreens/';
import AllReviews from '../Screens/CombinedScreens/AllReviews/index';
import ForgotPassword from '../Screens/CombinedScreens/AuthScreens/ForgotPassword/index';
import NewPassword from '../Screens/CombinedScreens/AuthScreens/NewPassword/index';
import WorkerAddSkill from '../Screens/WorkerSide/WorkerAddSkill/index';
import Bell from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkerJobDetails from '../Screens/WorkerSide/WorkerJobDetails/index';
import EmployerProfielShow from '../Screens/EmployerSide/EmployerProfileShow/index';
import EmployerJobDetails from '../Screens/EmployerSide/EmployerJobDetails/index';
import {useSelector} from 'react-redux';
import {Rating} from 'react-native-ratings';
import GooglePlaces from '../Screens/CombinedScreens/GooglePlaces';
import SeprateChat from '../Screens/EmployerSide/SeprateChat/index.js';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const windowHeight = Dimensions.get('window').height;
// console.log('height', windowHeight);
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        labelStyle: {fontSize: 12, fontFamily: 'Segoe UI SemiBold'},
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS == 'ios' ? (windowHeight < 820 ? 60 : 80) : 50,
          width: '100%',
          margin: 0,
          // position: 'absolute',
          // borderRadius: 20,
          backgroundColor: '#fff',
          alignSelf: 'center',
          alignContent: 'center',
        },
      }}>
      <Tab.Screen
        name="EmployerHome"
        component={EmployerHome}
        options={{
          // tabBarLabel: 'Home',
          // tabBarLabel: ({focused}) => (

          // ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../Assets/handshake.png')}
                style={{
                  height: 25,
                  width: 25,
                  // top: 5,
                  opacity: focused ? 10 : 0.3,
                }}
              />
              <Text
                style={{
                  color: focused ? '#15096F' : 'gray',
                  fontSize: 10,
                  fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
                }}>
                Home
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="EmployerSearch"
        component={EmployerSearch}
        options={{
          // tabBarLabel: ({focused}) => (
          //
          // ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../Assets/search.png')}
                style={{
                  height: 25,
                  width: 25,
                  // top: 5,
                  opacity: focused ? 10 : 0.3,
                }}
              />
              <Text
                style={{
                  color: focused ? '#15096F' : 'gray',
                  fontSize: 10,
                  fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
                }}>
                Search
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="EmployerChatList"
        component={EmployerChatList}
        options={{
          // tabBarLabel: ({focused}) => (
          //   <Text
          //     style={{
          //       color: focused ? '#15096F' : 'gray',
          //       fontSize: 10,
          //       fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
          //     }}>
          //     Chat
          //   </Text>
          // ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../Assets/conversation.png')}
                style={{
                  height: 24,
                  width: 24,
                  // top: 5,
                  opacity: focused ? 10 : 0.4,
                }}
              />
              <Text
                style={{
                  color: focused ? '#15096F' : 'gray',
                  fontSize: 10,
                  fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
                }}>
                Chat
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="EmployerProfile"
        component={EmployerProfile}
        options={{
          // tabBarLabel: 'Profile',
          // tabBarLabel: ({focused}) => (
          //   <Text
          //     style={{
          //       color: focused ? '#15096F' : 'gray',
          //       fontSize: 10,
          //       fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
          //     }}>
          //     Profile
          //   </Text>
          // ),
          tabBarIcon: ({focused}) => (
            // <Image
            //   resizeMode="contain"
            //   source={
            //     require('../Assets/person.png')
            //   }
            //   style={{ height: 22, width: 22, top: 5, opacity: focused ? 10 : 0.3 }}
            // />
            <View
              style={{
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Bell
                name="account-outline"
                size={25}
                color={focused ? '#15096F' : 'black'}
                // style={{top: 5}}
              />
              <Text
                style={{
                  color: focused ? '#15096F' : 'gray',
                  fontSize: 10,
                  fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
                }}>
                Profile
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const WorkerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        labelStyle: {fontSize: 12, fontFamily: 'Segoe UI SemiBold'},
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? (windowHeight < 820 ? 60 : 80) : 50,
          width: '100%',
          margin: 0,
          // borderRadius: 20,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          // alignSelf: 'center',
        },
      }}>
      <Tab.Screen
        name="WorkerHome"
        component={WorkerHome}
        options={{
          // tabBarLabel: 'Home',
          // tabBarLabel: ({focused}) => (
          //   <Text style={{color: focused ? '#15096F' : 'gray', fontSize: 10}}>
          //     Home
          //   </Text>
          // ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../Assets/handshake.png')}
                style={{
                  height: 25,
                  width: 25,
                  // top: 5,
                  opacity: focused ? 10 : 0.3,
                }}
              />
              <Text
                style={{
                  color: focused ? '#15096F' : 'gray',
                  // marginTop: 5,
                  fontSize: 10,
                }}>
                Home
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="WorkerChatList"
        component={WorkerChatList}
        options={{
          // tabBarLabel: 'Chat',
          // tabBarLabel: ({focused}) => (

          // ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../Assets/chat.png')}
                style={{
                  height: 24,
                  width: 24,
                  // top: 5,
                  opacity: focused ? 10 : 0.3,
                  tintColor: '#15096Fff',
                }}
              />
              <Text
                style={{
                  color: focused ? '#15096F' : 'gray',
                  // marginTop: 5,
                  fontSize: 10,
                }}>
                Chat
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="WorkerProfile"
        component={WorkerProfile}
        options={{
          // tabBarLabel: 'Profile',
          // tabBarLabel: ({focused}) => (

          // ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../Assets/person.png')}
                style={{
                  height: 22,
                  width: 22,
                  // top: 5,
                  opacity: focused ? 10 : 0.3,
                }}
              />
              <Text style={{color: focused ? '#15096F' : 'gray', fontSize: 10}}>
                Profile
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
const Root = () => {
  const {isLoggedIn} = useSelector(({USER}) => USER);
  const {userData} = useSelector(({USER}) => USER);
  // console.log("userData === ", userData.userdata.type)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <>
              {userData.userdata.type == 'Employer' ? (
                <Stack.Screen
                  name="TabNavigator"
                  component={TabNavigator}
                  options={{headerShown: false}}
                />
              ) : (
                <Stack.Screen
                  name="WorkerTabNavigator"
                  component={WorkerTabNavigator}
                  options={{headerShown: false}}
                />
              )}
            </>

            <Stack.Screen
              name="WorkerProfileShow"
              component={WorkerProfileShow}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="EmplyeProfile"
              component={EmplyeProfile}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="EmployeEditProfile"
              component={EmployeEditProfile}
              options={({title: ''}, {headerShown: false})}
            />

            <Stack.Screen
              name="Chat"
              component={Chat}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="SeprateChat"
              component={SeprateChat}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="SkillDetails"
              component={SkillDetails}
              options={({title: ''}, {headerShown: false})}
            />

            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="WorkerJobDetails"
              component={WorkerJobDetails}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="EmployerProfielShow"
              component={EmployerProfielShow}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="EmployerCreateOffer"
              component={EmployerCreateOffer}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="GooglePlaces"
              component={GooglePlaces}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="EmployerJobDetails"
              component={EmployerJobDetails}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="WorkerSkillSet"
              component={WorkerSkillSet}
              options={({title: ''}, {headerShown: false})}
            />

            <Stack.Screen
              name="WorkeEditProfile"
              component={WorkeEditProfile}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="Ratings"
              component={Ratings}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="AllReviews"
              component={AllReviews}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="WorkerAddSkill"
              component={WorkerAddSkill}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: '', headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="WellcomeScreen"
              component={WellcomeScreen}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="GooglePlaces"
              component={GooglePlaces}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="PassCode"
              component={PassCode}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="Privacy"
              component={Privacy}
              options={({title: ''}, {headerShown: false})}
            />
            <Stack.Screen
              name="Terms"
              component={Terms}
              options={({title: ''}, {headerShown: false})}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
