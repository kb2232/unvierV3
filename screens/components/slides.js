import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import Spacer from './Spacer';
const SCREEN_WIDTH = Dimensions.get('window').width; //gets you actual visible screen of device

class SlidesScreen extends Component {
  renderImageSlide(index) {
    if (index === 0) {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../images/logo.png')}
        />
      );
    } else return;
  }

  renderLastSlide(index) {
    if (index === 1) {
      return (
        <TouchableOpacity onPress={() => this.props.onComplete()}>
          <Image
            style={styles.nextArrowStyle}
            source={require('../images/nextArrow.png')}
          />
        </TouchableOpacity>
      );
    }
  }

  renderSlides() {
    return this.props.data.map(({ text }, index) => {
      const { header1, body1, Bcolor } = text;
      return (
        <View
          key={header1}
          style={[
            styles.container,
            {
              backgroundColor: '#D8D8DA',
              color: 'white',
            },
          ]}
        >
          {this.renderImageSlide(index)}
          <Spacer>
            <View
              style={{
                backgroundColor: index === 1 ? '#4C7450' : '#D8D8DA',
                height: index === 1 ? '95%' : '40%',
                padding: index === 1 ? '2%' : 0,
                borderRadius: index === 1 ? '50%' : 0,
                display: index === 1 ? 'flex' : 0,
                alignItems: index === 1 ? 'flex-start' : 0,
                justifyContent: index === 1 ? 'center' : 0,
              }}
            >
              <Text
                style={
                  (styles.textStyle, { color: index === 0 ? '#000' : '#fff' })
                }
                h3
              >
                {header1}
              </Text>
              <Spacer />
              <Text style={styles.textStyleBody}>{body1}</Text>
              {this.renderLastSlide(index)}
            </View>
          </Spacer>
        </View>
      );
    });
  }
  render() {
    return (
      <ScrollView horizontal pagingEnabled={true}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    color: '#fff',
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  textStyleBody: {
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 1,
    paddingHorizontal: 20,
  },
  imageStyle: {
    width: 300,
    height: 100,
  },
  nextArrowStyle: {
    width: 70,
    height: 60,
    position: 'relative',
    alignSelf: 'flex-end',
    left: '60%',
    top: '30%',
  },
});
export default SlidesScreen;
