import React, { useContext, useState } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from './components/Spacer';
import { Context } from './context/AuthContext';

function LoginScreen(props) {
  const {signin,data:{errorMessages},bio} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3 style={{ color: '#4C7450', fontWeight: '700' }}>
          Login
        </Text>
      </Spacer>
      <Spacer>
        <Input
          label="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={
            <Icon
              name="user"
              size={24}
              type="font-awesome"
              iconStyle={{ marginRight: 10 }}
              color="black"
            />
          }
        />
        <Spacer />
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
          leftIcon={
            <Icon
              name="lock"
              size={24}
              type="font-awesome"
              iconStyle={{ marginRight: 10 }}
              color="black"
            />
          }
        />
        <Spacer />
        <Button
          raised
          title="Log in"
          buttonStyle={{
            borderRadius: '50%',
            backgroundColor: '#4C7450',
          }}
          onPress={() => signin(email,password)}
        />
        <Text style={{textAlign:'center', color:'red',marginTop:5}}>{errorMessages?errorMessages:""}</Text>
      </Spacer>
      <View style={styles.forgetPass}>
        <Text>Can't login? </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('forgetPassword')}
        >
          <Text style={{ color: '#4C7450', fontWeight: '700' }}>
            Forget Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgetPass: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoginScreen;
