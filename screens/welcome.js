import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Slides from './components/slides';
import IMGFILE from './images/logo.png';
/**
 * TODO: move the slide data somewhere else
 */
const SLIDE_DATA = [
  {
    text: {
      header1: 'your night life guide',
      Bcolor: '#D8D8DA',
    },
  },
  {
    text: {
      header1: 'Welcome to Unvier',
      body1: `\nUnvier is an app to guide you through your night life event.\n\nOur mission is deliver real and update information about night events.\n\nWe form a partnership with our users and they have entrusted us with delivering accurate data from their respective favorite locaitons.`,
      Bcolor: '#4C7450',
    },
  },
];

class WelcomScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auths');
  };
  render() {
    return (
      <>
        <View style={styles.container}>
          <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
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
export default WelcomScreen;
