import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context } from './context/AuthContext';
import { Buttons } from './components/FormFields';

function HomeScreen(props) {
  const {
		signout
	} = useContext(Context);
    return (
      <>
        <View style={styles.container}>
          <Text>home Screen</Text>
          <Buttons titles="signout" buttonColor="red"
            action={() => signout(props)}
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

export default HomeScreen;