import React, { useContext, useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text } from 'react-native';
import { Inputs, Buttons } from './components/FormFields';
import Spacer, { SmallSpacer } from './components/Spacer';
import { Context } from './context/AuthContext';

function ConfirmEmailScreen(props) {
  useEffect(()=>{
    props.navigation.addListener('focus',()=>clearErrorMessage())
    props.navigation.addListener('blur',()=>clearErrorMessage())
  },[props.navigation])
	const {
		data: { errorMessages },
		clearErrorMessage,
		EmailConfirmationProcess
	} = useContext(Context);
	const [email, setEmail] = useState('');
	return (
		<KeyboardAwareScrollView style={styles.container}>
      <Spacer />
			<Spacer>
				<Text style={{ color: '#4C7450', fontWeight: '700', fontSize:30 }}>
					Email Confirmation
				</Text>
        <SmallSpacer />
        <Text>Please check your email to set up your account password</Text>
			</Spacer>
			<Spacer>
				<Inputs
					labels="Email"
					values={email}
					onChangeValueInput={(text) => setEmail(text)}
				/>
      </Spacer>
			<Spacer>
				<Buttons
        titles="Next"
        disabledButton={!email.includes("@")}
				action={() => EmailConfirmationProcess(props,email)}
				/>
				<Text style={{ textAlign: 'center', color: 'red', marginTop: 5 }}>
					{errorMessages ? errorMessages : ''}
				</Text>
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
export default ConfirmEmailScreen;
