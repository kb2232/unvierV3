import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Context } from './context/AuthContext';
import { Inputs, Buttons } from './components/FormFields';
import Spacer, { SmallSpacer } from './components/Spacer';

const SignupScreen = (props) => {
  useEffect(()=>{
    props.navigation.addListener('focus',()=>clearErrorMessage())
    props.navigation.addListener('blur',()=>clearErrorMessage())
  },[props.navigation])
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
			<Spacer />
			<Spacer>
				<Text style={{ color: '#4C7450', fontWeight: '700', fontSize:30 }}>
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
				<Spacer />
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
				<TouchableOpacity onPress={() => props.navigation.navigate('Logins')}>
					<Text style={{ color: '#4C7450', fontWeight: '700' }} h4>
						Login
					</Text>
				</TouchableOpacity>
			</Spacer>
		</KeyboardAwareScrollView>
	);
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
