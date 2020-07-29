import React, { useContext, useEffect } from 'react';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Platform } from 'react-native';
import { Context } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import Spacer, { SmallSpacer } from '../components/Spacer';

function ProfileScreen(props) {
	const {
		data: { errorMessages },
		bio,
		getUserProfile,
	} = useContext(Context);
	useEffect(() => {
		getUserProfile();
	}, []);
	const { container, containerSubLevel, bioText, locationStyle } = styles;
	return (
			<View style={container}>
        <SmallSpacer>
						<FontAwesome name="user" size={60} />
        </SmallSpacer>
				<Spacer>
					<View style={containerSubLevel}>
						<Text h4 style={bioText}>
            {bio?.email ? bio.name : bio.storageEmail}
						</Text>
						<Text h5 style={locationStyle}>
							{bio?.username ? `@${bio.username}` : bio.storageEmail}
						</Text>
					</View>
				</Spacer>
				<SmallSpacer>
					<Text>{bio?.biography ? bio.biography : 'Please edit your description in settings menu'}</Text>
				</SmallSpacer>
				<SmallSpacer>
					<Button
						title="Edit Profile"
						buttonStyle={{
							backgroundColor: '#517754',
							width: 250,
							borderRadius: 30,
						}}
						icon={<Icon name="cog" size={25} color="white" />}
						titleStyle={{ color: 'white', right: 10, fontWeight: 'bold' }}
						iconRight
						onPress={() => props.navigation.navigate('settings')}
					/>
				</SmallSpacer>
			</View>
	);
}

ProfileScreen.navigationOptions = () => {
	return {
		headerShown: null,
	};
};

const styles = StyleSheet.create({
	container: {
    flex: 1,
    flexDirection:'column',
		justifyContent: 'center',
    alignItems: 'center',
    top:30
	},
	containerSubLevel: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bioText: {
		color: '#4A4A4A',
	},
	locationStyle: {
		color: '#999999',
	},
	settings: {
		marginRight: 10,
	},
	style: Platform.OS === 'android' ? 24 : 0,
});

export default ProfileScreen;
