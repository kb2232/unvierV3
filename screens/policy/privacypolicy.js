import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import Spacer, { SmallSpacer } from '../components/Spacer';

class PrivacyPolicy extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Spacer>
            <View style={styles.main}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  textAlign: 'center',
                }}
                h4
              >
                Privacy Policy
              </Text>
              <SmallSpacer />
              <Text style={styles.textStyle}>
                A Terms and Conditions acts as a legally binding contract
                between you and your users. This is the agreement that sets the
                rules and guidelines that users must agree to and follow in
                order to use and access your website or mobile app. In this
                agreement, you can include the necessary sections to inform
                users of the guidelines of using your website or mobile app,
                what happens if users are abusing your website or mobile app,
                and so on. Examples of actions of abusive users can include
                spamming other users, posting defamatory content or attempting
                to infect the website or app with malware. If your website or
                mobile app hosts content that is generated by users, you can
                include a clause in the Terms and Conditions to inform users
                that harmful language won't be tolerated, as well as spamming
                other users (depending on the function of your website: via
                public or private messages).
              </Text>
            </View>
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
  textStyle: {
    color: 'white',
  },
  main: {
    backgroundColor: '#4C7450',
    padding: 15,
    borderRadius: 50,
  },
});

export default PrivacyPolicy;
