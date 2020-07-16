import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
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
  //ResolveAuth: LoadingScreen,
  welcomes: { screen: Welcome },
  auths: {
    screen: createStackNavigator({
      auths: AuthScreen,
      logins: LoginScreen,
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
      profiles: {
        screen: createStackNavigator({
          profiles: ProfileScreen,
          settings: SettingScreen,
        }),
      },
      homes: HomeScreen,
      inboxs: InboxScreen,
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
