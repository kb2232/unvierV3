import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Welcome from './screens/welcome';
import AuthScreen from './screens/authscreen';
import ProfileScreen from './screens/profiles/profile';
import HomeScreen from './screens/profiles/home';
import TermsCondition from './screens/policy/termsandcondition';
import PrivacyPolicy from './screens/policy/privacypolicy';
import forgetPassword from './screens/passwordRecovery/forgetPassword';
import verificationCode from './screens/passwordRecovery/verficationCode';
import createNewPass from './screens/passwordRecovery/createNewPassword';
import InboxScreen from './screens/profiles/inbox';
import SettingScreen from './screens/settings/settingscreen';
import LoginScreen from './screens/login';
import LoadingScreen from './screens/loadingScreen';
import SignupScreen from './screens/signup';
import { AuthProvider } from './screens/context/AuthContext';
import { setNavigator } from './screens/history';

const MainNav = createSwitchNavigator({
  ResolveAuth: LoadingScreen,
  welcomes: { screen: Welcome },
  authoriz: {
    screen: createStackNavigator({
      cancel: {screen:AuthScreen},
      logins: {screen:LoginScreen},
      signups: SignupScreen,
      forgetPassword: forgetPassword,
      verifycode: verificationCode,
      setNewPassword: createNewPass,
      termscondition: TermsCondition,
      privacypolicy: PrivacyPolicy,
    }),
  },
  mains: {
    screen: createBottomTabNavigator({
      PROFILE: {
        screen: createStackNavigator({
          profiles: ProfileScreen,
          settings: SettingScreen,
        }),
      },
      EXPLORE: HomeScreen,
      INBOX: InboxScreen,
    },{
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === 'PROFILE') {
            return (
              <Image
                source={
                  focused
                    ? require('./assets/profile.jpg')
                    : require('./assets/profile.jpg')
                }
                style={{
                  width: 40,
                  height: 30,
                }}
              />
            );
          } else if (routeName === 'EXPLORE') {
            return (
              <Image
                source={
                  focused
                    ? require('./assets/explore.jpg')
                    : require('./assets/explore.jpg')
                }
                style={{
                  width: 40,
                  height: 30
                }}
              />
            );
          } else if (routeName === 'INBOX') {
            return (
              <Image
                source={
                  focused
                  ? require('./assets/inbox.jpg')
                  : require('./assets/inbox.jpg')
                }
                style={{
                  width: 40,
                  height:30
                }}
              />
            );
          }
        },
      }),
      tabBarOptions: {
        activeTintColor: '#42f44b',
        inactiveTintColor: 'gray',
      },
    }),
  },
});
const App = createAppContainer(MainNav);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
