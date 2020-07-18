import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>home Screen</Text>
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

export default HomeScreen;
