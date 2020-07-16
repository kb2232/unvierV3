import React, { Component } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Spacer from '../components/Spacer';

class ProfileScreen extends Component {
  static navigationOptions = (props) => {
    return {
      title: 'Profile',
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
  render() {
    const { container, bioText, locationStyle, containerSubLevel } = styles;
    return (
      <>
        <View style={container}>
          <Spacer>
            <View style={containerSubLevel}>
              <FontAwesome name="user" size={60} />
              <Text h4 style={bioText}>
                Welcome Kunle Babatunde
              </Text>
              <Text h5 style={locationStyle}>
                New York, NY
              </Text>
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
              onPress={() => this.props.navigation.navigate('settings')}
            />
          </Spacer>
        </View>
      </>
    );
  }
}

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
