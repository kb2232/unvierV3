import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export const Inputs = ({ labels, values, onChangeValueInput, secureText=false,disabledInput=false }) => {
	return (
		<View>
			<Input
				secureTextEntry={secureText}
				inputContainerStyle={styles.container}
				label={labels}
				autoCapitalize="none"
				value={values}
        onChangeText={onChangeValueInput}
        disabled={disabledInput}
			/>
		</View>
	);
};
export const Buttons = ({ titles, action, disabledButton=false }) => {
	return (
		<View style={styles.buttonView}>
			<Button raised disabled={disabledButton} title={titles} buttonStyle={styles.buttonContainer} onPress={action} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		borderRadius: 30,
		borderColor: 'gray',
		borderStyle: 'solid',
		borderWidth: 1,
		paddingLeft: 10,
		paddingVertical: 5,
		backgroundColor: 'lightgray',
		marginTop: 10,
	},
	buttonContainer: {
		borderRadius: 30,
		backgroundColor: '#4C7450',
		width:320
	},
	buttonView:{
	 display:'flex',
	 alignItems:'center',
	 justifyContent:'center'
	}
});
export default Inputs;
