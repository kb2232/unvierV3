import React, { Component } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

class SettingScreen extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>setting Screen</Text>
          <Button
            title="Sign out"
            onPress={() => this.props.navigation.navigate('logins')}
          />
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
});

export default SettingScreen;
