import React, { useContext, useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Inputs, Buttons } from './components/FormFields';
import Spacer, { SmallSpacer } from './components/Spacer';
import { Context } from './context/AuthContext';

function LoginScreen(props) {
	const {
		signin,
		data: { errorMessages },
		clearErrorMessage,
		signInWithGoogle,
		fblogIn
	} = useContext(Context);
	useEffect(()=>{
    props.navigation.addListener('focus',()=>clearErrorMessage())
    props.navigation.addListener('blur',()=>clearErrorMessage())
  },[props.navigation])
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<KeyboardAwareScrollView style={styles.container}>
      <Spacer />
			<Spacer>
				<Text style={{ color: '#4C7450', fontWeight: '700', fontSize:30 }}>
					Login
				</Text>
			</Spacer>
			<Spacer>
				<Inputs
					labels="Email"
					values={email}
					onChangeValueInput={(text) => setEmail(text)}
				/>
				<Spacer />
				<Inputs
					labels="Password"
					values={password}
					onChangeValueInput={(text) => setPassword(text)}
					secureText={true}
				/>
			</Spacer>
			<Spacer>
				<Buttons
        titles="Log in"
        disabledButton={!email.includes("@")}
				action={() => signin(props,email, password)}
				/>
				<Text style={{ textAlign: 'center', color: 'red', marginTop: 5 }}>
					{errorMessages ? errorMessages : ''}
				</Text>
				<SmallSpacer />
				<SmallSpacer />
				<View style={styles.centerItem}>
					<Text>Can't login? </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('forgetpassword')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>Forget Password</Text>
					</TouchableOpacity>
				</View>
				<SmallSpacer />
				<View style={styles.centerItem}>
				<Text>Or </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('emailconfirm')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>create an account</Text>
					</TouchableOpacity>
				</View>
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
			</Spacer>

		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	iconstyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
	},
	imageIconStyle: {
    width: 50,
    height: 50,
  },
	centerItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default LoginScreen;
