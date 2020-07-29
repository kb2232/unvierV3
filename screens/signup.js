import React, { useState, useContext } from 'react';
import { Text, Input, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Inputs, Buttons } from './components/FormFields';
import { Context } from './context/AuthContext';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer, { SmallSpacer } from './components/Spacer';

const SignupScreen = (props) => {
	const {
		signup,
		data: { errorMessages },
		clearErrorMessage,
	} = useContext(Context);
	const [firstname, setFname] = useState('');
	const [lastname, setLname] = useState('');
	const [emails, setEmails] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	return (
		<KeyboardAwareScrollView>
			<NavigationEvents
				onWillBlur={() => clearErrorMessage()}
				onDidBlur={() => clearErrorMessage()}
				onWillFocus={() => clearErrorMessage()}
				onDidFocus={() => clearErrorMessage()}
			/>
			<Spacer />
			<Spacer>
				<Text h3 style={{ color: '#4C7450', fontWeight: '700' }}>
					Register
				</Text>
				<Text style={{ color: 'red' }}>{errorMessages ? errorMessages : ''}</Text>
			</Spacer>
			<Spacer>
				<Inputs
					labels="First name"
					values={firstname}
					onChangeValueInput={(text) => setFname(text)}
				/>
				<SmallSpacer />
				<Inputs
					labels="Surname"
					values={lastname}
					onChangeValueInput={(text) => setLname(text)}
				/>
				<SmallSpacer />
				<Inputs
					labels="Password"
					values={password}
					onChangeValueInput={(text) => setPassword(text)}
					secureText={true}
				/>
				<SmallSpacer />
				<Inputs
					labels="Email"
					values={emails}
					onChangeValueInput={(text) => setEmails(text)}
				/>
				<SmallSpacer />
				<Inputs
					labels="Username"
					values={username}
					onChangeValueInput={(text) => setUsername(text)}
				/>
				<SmallSpacer />
				<Buttons
					titles="Register"
					disabledButton={
						!firstname ||
						!lastname ||
						!password ||
						!username ||
						!emails
					}
					action={() => signup(`${firstname} ${lastname}`, emails, username, password)}
				/>
				<SmallSpacer />
				<Text>By clicking register, you agree to our</Text>
				<TouchableOpacity onPress={() => props.navigation.navigate('termscondition')}>
					<Text style={{ color: '#4C7450', fontWeight: '700' }}>terms and condition</Text>
				</TouchableOpacity>
				<Text>and that you have read our </Text>
				<TouchableOpacity onPress={() => props.navigation.navigate('privacypolicy')}>
					<Text style={{ color: '#4C7450', fontWeight: '700' }}>privacy policy</Text>
				</TouchableOpacity>
			</Spacer>
			<Spacer>
				<Text h4>Already have an account? </Text>
				<TouchableOpacity onPress={() => props.navigation.navigate('logins')}>
					<Text style={{ color: '#4C7450', fontWeight: '700' }} h4>
						Login
					</Text>
				</TouchableOpacity>
			</Spacer>
		</KeyboardAwareScrollView>
	);
};
SignupScreen.navigationOptions = () => {
	return {
		header: null,
	};
};
const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		maxWidth: '50%',
	},
});
export default SignupScreen;
