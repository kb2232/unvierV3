import React, { useContext } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Context } from './context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import Spacer from './components/Spacer';

function AuthScreen(props) {
  const { signInWithGoogle } = useContext(Context);
  const renderLogo = () => {
    return (
      <Image style={styles.imageStyle} source={require('./images/logo.png')} />
    );
  };
  const renderLogin = () => {
    props.navigation.navigate('logins');
  };
  const renderSignup = () => {
    props.navigation.navigate('signups');
  };
  return (
    <>
      <View style={styles.container}>
        {renderLogo()}
        <Spacer>
          <Button
            title="Log in"
            buttonStyle={{
              width: 250,
              borderRadius: '50%',
              backgroundColor: '#4C7450',
            }}
            onPress={renderLogin}
          />
        </Spacer>
        <Text style={{ color: '#4C7450', fontWeight: '800' }}>
          Please signup using
        </Text>
        <Spacer />
        <View style={styles.iconstyle}>
          <TouchableOpacity onPress={() => signInWithGoogle()}>
            <Image
              style={styles.imageIconStyle}
              source={require('./images/googleIcon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('facebook sign-in pressed')}
          >
            <Image
              style={styles.imageIconStyle}
              source={require('./images/facebook.png')}
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
      </View>
    </>
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
