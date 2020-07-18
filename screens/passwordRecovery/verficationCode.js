import React, { useContext, useState } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import Spacer from '../components/Spacer';
import { Context } from '../context/AuthContext';

function verificationCode(props) {
  const info = useContext(Context);
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <Spacer>
        <Text
          h3
          style={(styles.center, { color: '#4C7450', fontWeight: '700' })}
        >
          Forget Password
        </Text>
      </Spacer>
      <Spacer>
        <Text style={{ fontWeight: '800' }}>
          Please enter verification code
        </Text>
        <Text>We have sent it to your email</Text>
      </Spacer>
      <Spacer>
        <Input
          label="verification code :"
          autoCapitalize="none"
          value={code}
          onChangeText={(text) => setCode(text)}
        />
        <Spacer />
        <Button
          raised
          title="Next"
          buttonStyle={{
            borderRadius: '50%',
            backgroundColor: '#4C7450',
          }}
          onPress={() => props.navigation.navigate('setNewPassword')}
        />
      </Spacer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default verificationCode;
