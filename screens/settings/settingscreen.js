import React, { useContext } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { Context } from '../context/AuthContext';

function SettingScreen(){
  const {signout} = useContext(Context)
  return (
    <>
      <View style={styles.container}>
        <Text>setting Screen</Text>
        <Button
          title="Sign out"
          onPress={() => signout()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingScreen;
