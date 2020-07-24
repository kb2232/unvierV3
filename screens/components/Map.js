import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';

class MapScreen extends React.Component {
  state = {
    loaded:false,
    region:{
      latitude:40.615360,
        longitude:-73.914770,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    }
  }
  componentDidMount(){
    this.setState({loaded:true})
  }
  render() {
    if(!this.state.loaded){
      return <ActivityIndicator size={"large"} />
    }
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
        initialRegion={this.state.region}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height/2.5,
  },
});
export default MapScreen;
/**
 * initialRegion={{
              latitude:37.78825,
              longitude:-122.4324,
              latitudeDelta:0.0922,
              longitudeDelta:0.0421
            }}
 */