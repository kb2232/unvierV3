import React, { useState, useContext } from 'react';
import { Text, Input, Button } from 'react-native-elements';
import { Context } from './context/AuthContext';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer, { SmallSpacer } from './components/Spacer';

const SignupScreen = (props) => {
  const { bio:{email,name},signup,data:{errorMessages} } = useContext(Context);
  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [emails, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState('');
  return (
    <KeyboardAwareScrollView>
      <Spacer>
        <Text h3 style={{ color: '#4C7450', fontWeight: '700' }}>
          Register
        </Text>
        <Text style={{color:'red'}}>{errorMessages?errorMessages:""}</Text>
      </Spacer>
      <Spacer>
        <View style={styles.row}>
          <Input
            style={{ marginBottom: 50 }}
            label="First name"
            autoCapitalize="none"
            value={firstname}
            onChangeText={(text) => setFname(text)}
          />
          <SmallSpacer />
          <Input
            label="Last name"
            autoCapitalize="none"
            value={lastname}
            onChangeText={(text) => setLname(text)}
          />
        </View>
        <SmallSpacer />
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <SmallSpacer />
        <Input
          label="Email"
          autoCapitalize="none"
          value={email}
          disabled
          onChangeText={() => setEmail(email)}
        />
        <SmallSpacer />
        <Input
          label="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <SmallSpacer />
        <Input
          label="Mobile"
          autoCapitalize="none"
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          required
        />
        <SmallSpacer />
        <Button
          raised
          title="Register"
          disabled={
            !firstname || !lastname || !password || !username || !mobile || mobile.length!=10
          }
          buttonStyle={{
            borderRadius: '50%',
            backgroundColor: '#4C7450',
          }}
          onPress={() =>
            signup(`${firstname} ${lastname}`, email, username, password, mobile)
          }
        />
        <SmallSpacer />
        <Text>By clicking register, you agree to our</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('termscondition')}
        >
          <Text style={{ color: '#4C7450', fontWeight: '700' }}>
            terms and condition
          </Text>
        </TouchableOpacity>
        <Text>and that you have read our </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('privacypolicy')}
        >
          <Text style={{ color: '#4C7450', fontWeight: '700' }}>
            privacy policy
          </Text>
        </TouchableOpacity>
      </Spacer>
      <Spacer>
        <Text h4>Already have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('logins')}>
          <Text style={{ color: '#4C7450', fontWeight: '700' }} h4>
            Login
          </Text>
        </TouchableOpacity>
      </Spacer>
    </KeyboardAwareScrollView>
  );
};
SignupScreen.navigationOptions = () => {
	return {
		header: null,
	};
};
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxWidth: '50%',
  },
});
export default SignupScreen;
