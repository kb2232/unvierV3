import React, { useContext, useState } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native';
import {Inputs, Buttons} from '../components/FormFields'
import Spacer from '../components/Spacer';
import { Context } from '../context/AuthContext';

function setNewPassword(props) {
  const info = useContext(Context);
  const [password, setPassword] = useState('');
  const [passwordtwo, setPasswordTwo] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Spacer>
        <Text
          h3
          style={(styles.center, { color: '#4C7450', fontWeight: '700' })}
        >
          Forget Password
        </Text>
      </Spacer>
      <Spacer>
        <Text style={{ fontWeight: '800' }}>Please enter a new password</Text>
      </Spacer>
      <Spacer>
      <Inputs 
					labels="New Password"
					values={password}
          onChangeValueInput={(text) => setPassword(text)}
          secureText={true}
			/>
        <Spacer />
        <Inputs 
					labels="Re-enter Password"
					values={passwordtwo}
          onChangeValueInput={(text) => setPasswordTwo(text)}
          secureText={true}
			/>
        <Spacer />
        <Buttons
				titles="Change password"
				action={() => props.navigation.navigate('logins')}
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
setNewPassword.navigationOptions = () => {
	return {
		headerShown: false,
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
export default setNewPassword;
