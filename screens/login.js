import React, { useContext, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Inputs, Buttons } from './components/FormFields';
import Spacer, { SmallSpacer } from './components/Spacer';
import { Context } from './context/AuthContext';

function LoginScreen(props) {
	const {
		signin,
		data: { errorMessages },
		bio,
		clearErrorMessage,
		signInWithGoogle,
		fblogIn
	} = useContext(Context);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
			<NavigationEvents
				onWillBlur={() => clearErrorMessage()}
				onDidBlur={() => clearErrorMessage()}
				onWillFocus={() => clearErrorMessage()}
				onDidFocus={() => clearErrorMessage()}
			/>
			<Spacer>
				<Text h3 style={{ color: '#4C7450', fontWeight: '700' }}>
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
				action={() => signin(email, password)}
				/>
				<Text style={{ textAlign: 'center', color: 'red', marginTop: 5 }}>
					{errorMessages ? errorMessages : ''}
				</Text>
				<SmallSpacer />
				<SmallSpacer />
				<View style={styles.centerItem}>
					<Text>Can't login? </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('forgetPassword')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>Forget Password</Text>
					</TouchableOpacity>
				</View>
				<SmallSpacer />
				<View style={styles.centerItem}>
				<Text>Or </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('signups')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>create an account</Text>
					</TouchableOpacity>
				</View>
				<Spacer />
				<View style={styles.iconstyle}>
          <TouchableOpacity onPress={() => signInWithGoogle()}>
            <Image
              style={styles.imageIconStyle}
              source={require('./images/googleIcon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>fblogIn()}
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
			</Spacer>

		</SafeAreaView>
	);
}
LoginScreen.navigationOptions = () => {
	return {
		title:'Login',
		headerShown: true,
	};
};
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
