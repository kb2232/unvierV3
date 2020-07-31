import React, { useContext } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Image, TouchableOpacity,Text, Button } from 'react-native';
import { Context } from './context/AuthContext';
import {Buttons} from './components/FormFields'
import { FontAwesome } from '@expo/vector-icons';
import Spacer, {SmallSpacer} from './components/Spacer';

function AuthScreen(props) {
  const { signInWithGoogle,fblogIn } = useContext(Context);
  const renderLogo = () => {
    return (
      <Image style={styles.imageStyle} source={require('../assets/logo.png')} />
    );
  };
  
  const renderLogin = () => {
    props.navigation.navigate('Logins');
  };
  const renderSignup = () => {
    props.navigation.navigate('signups');
  };
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        {renderLogo()}
        <Spacer />
        <Spacer>
          <Buttons
            titles="Log-in"
            action={renderLogin}
          />
          <SmallSpacer />
          <Buttons
            titles="Sign up"
            buttonColor='#000'
            action={renderSignup}
          />
        </Spacer>
        <Text style={{fontWeight: '800' }}>
          or connect using 
        </Text>
        <Spacer />
        <View style={styles.iconstyle}>
          <TouchableOpacity onPress={() => signInWithGoogle(props)}>
            <Image
              style={styles.imageIconStyle}
              source={require('../assets/googleIcon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>fblogIn(props)}
          >
            <Image
              style={styles.imageIconStyle}
              source={require('../assets/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('twitter sign-in pressed')}
          >
            <FontAwesome
              name="twitter"
              style={{ color: '#38A1F3' }}
              size={50}
            />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E4E4',
  },
  imageStyle: {
    width: 300,
    height: 100,
  },
  imageIconStyle: {
    width: 50,
    height: 50,
  },
  iconstyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 200,
  },
});

export default AuthScreen;
