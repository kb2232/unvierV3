import React, { useContext, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Inputs, Buttons } from './components/FormFields';
import Spacer, { SmallSpacer } from './components/Spacer';
import { Context } from './context/AuthContext';

function LoginScreen(props) {
	const {
		signin,
		data: { errorMessages },
		bio,
		clearErrorMessage,
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
				<View style={styles.centerItem}>
					<TouchableOpacity onPress={() => props.navigation.navigate('auths')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>Sign up</Text>
					</TouchableOpacity>
				</View>
				<SmallSpacer />
				<SmallSpacer />
				<View style={styles.centerItem}>
					<Text>Can't login? </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('forgetPassword')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>Forget Password</Text>
					</TouchableOpacity>
				</View>
			</Spacer>
		</SafeAreaView>
	);
}
LoginScreen.navigationOptions = () => {
	return {
		headerShown: false,
	};
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centerItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default LoginScreen;
