import React, { useContext, useState } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Spacer, { SmallSpacer } from '../components/Spacer';
import { Context } from '../context/AuthContext';

function ForgetPasswordOne(props) {
	const info = useContext(Context);
	const [email, setEmail] = useState('');

	return (
		<View style={styles.container}>
			<Spacer>
				<Text h3 style={(styles.center, { color: '#4C7450', fontWeight: '700' })}>
					Forget Password
				</Text>
			</Spacer>
			<Spacer>
				<Text style={{ fontWeight: '800' }}>Please enter your registered email ID</Text>
				<Text>We will send you a verification code to your email</Text>
			</Spacer>
			<Spacer>
				<Input
					label="Email :"
					autoCapitalize="none"
					value={email}
					onChangeText={(text) => setEmail(text)}
					leftIcon={
						<Icon name="user" size={24} type="font-awesome" iconStyle={{ marginRight: 10 }} color="black" />
					}
				/>
				<Spacer />
				<Button
					raised
					title="Next"
					buttonStyle={{
						borderRadius: '50%',
						backgroundColor: '#4C7450',
					}}
					onPress={() => props.navigation.navigate('verifycode')}
				/>
				<Spacer />
				<View style={styles.centerRowItem}>
					<Text>Remember your password? Login </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('logins')}>
						<Text style={{ color: '#4C7450', fontWeight: '700' }}>here</Text>
					</TouchableOpacity>
				</View>
			</Spacer>
		</View>
	);
}
ForgetPasswordOne.navigationOptions = (props) => {
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
export default ForgetPasswordOne;
