import React, { useContext,useEffect } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {Context} from '../context/AuthContext'
import { FontAwesome } from '@expo/vector-icons';
import Spacer, {SmallSpacer} from '../components/Spacer';

function ProfileScreen(props){
  const {data:{errorMessages},bio,getUserProfile} = useContext(Context);
  useEffect(()=>{
    getUserProfile()
  },[]);
  const {container,containerSubLevel,bioText,locationStyle} = styles;
  return (
    <>
      <View style={container}>
        <Spacer>
          <View style={containerSubLevel}>
            <FontAwesome name="user" size={60} />
            <Text h4 style={bioText}>
              Welcome
            </Text>
            <Text h5 style={locationStyle}>
            {(bio?.email)?bio.name:bio.storageEmail}
            </Text>
            <Text h5 style={locationStyle}>
            {(bio?.username)?`@${bio.username}`:bio.storageEmail}
            </Text>
            <SmallSpacer />
            <Text>{errorMessages?errorMessages:""}</Text>
          </View>
        </Spacer>
        <Spacer>
          <Button
            title="Edit Profile"
            buttonStyle={{
              backgroundColor: '#517754',
              width: 250,
              borderRadius: '50%',
            }}
            onPress={() => props.navigation.navigate('settings')}
          />
        </Spacer>
      </View>
    </>
  );
}

ProfileScreen.navigationOptions = (props) => {
  return {
    title: 'profile',
    headerRight: (
      <TouchableOpacity
        style={styles.settings}
        onPress={() => props.navigation.navigate('settings')}
      >
        <FontAwesome name="cog" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
