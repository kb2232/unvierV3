import React from 'react';
import { View, StyleSheet,TextInput, TouchableOpacity, Text  } from 'react-native';

export const Inputs = ({ labels, values, onChangeValueInput, secureText=false,disabledInput=false }) => {
	return (
		<View style={styles.buttonView}>
      <View style={{alignSelf:'flex-start'}}>
			<Text style={{fontSize:20}}>{labels}</Text>
			</View>
			<TextInput
				secureTextEntry={secureText}
				style={styles.container}
				autoCapitalize="none"
				value={values}
        onChangeText={onChangeValueInput}
        disabled={disabledInput}
			/>
		</View>
	);
};
export const Buttons = ({ titles, action, disabledButton=false, buttonColor='#4C7450'}) => {
	return (
		<View style={styles.buttonView}>
			<TouchableOpacity disabled={disabledButton} style={[styles.buttonContainer,{backgroundColor:buttonColor}]} onPress={action}>
        <Text style={styles.buttonText}>{titles}</Text>
      </TouchableOpacity>

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
		height: 40,
		width:300
	},
	buttonContainer: {
    borderRadius: 30,
    borderStyle:'solid',
    borderColor:'#D8D8DA',
    height:45,
    width:300
  },
  buttonText:{
    textAlign:'center',
    lineHeight:40,
    fontWeight:"700",
    fontSize:20,
    color:'#fff'
	},
	InputTextContainer:{

	},
	buttonView:{
	 display:'flex',
	 alignItems:'center',
	 justifyContent:'center'
	}
});
export default Inputs;
