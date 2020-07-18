import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

class InboxScreen extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>Inbox Screen</Text>
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

export default InboxScreen;
