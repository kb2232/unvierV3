import React, { useContext, useState } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native';
import {Inputs, Buttons} from '../components/FormFields'
import Spacer from '../components/Spacer';
import { Context } from '../context/AuthContext';

function verificationCode(props) {
	const info = useContext(Context);
	const [code, setCode] = useState('');

	return (
		<SafeAreaView style={styles.container}>
			<Spacer>
				<Text h3 style={(styles.center, { color: '#4C7450', fontWeight: '700' })}>
					Forget Password
				</Text>
			</Spacer>
			<Spacer>
				<Text style={{ fontWeight: '800' }}>Please enter verification code</Text>
				<Text>We have sent it to your email</Text>
			</Spacer>
			<Spacer>
			<Inputs 
					labels="Verification Code"
					values={code}
					onChangeValueInput={(text) => setCode(text)}
				/>
				<Spacer />
				<Buttons
				titles="Next"
				action={() => props.navigation.navigate('setNewPassword')}
				/>
				<Spacer />
				<View style={styles.centerRowItem}>
					<Text>Remember your password? Login </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('logins')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>here</Text>
					</TouchableOpacity>
				</View>
			</Spacer>
		</SafeAreaView>
	);
}
verificationCode.navigationOptions = (props) => {
	return {
		header: null,
	};
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	center: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	centerRowItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default verificationCode;
