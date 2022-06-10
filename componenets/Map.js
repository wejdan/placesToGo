import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions} from 'react-native';
let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 5; //Increase or decrease the zoom level dynamically
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Map = ({location}) => {
  const region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.015 * 1,
    longitudeDelta: 0.0121 * 1,
  };

  return (
    <View style={styles.body}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015 * 1,
          longitudeDelta: 0.0121 * 1,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="this is a marker"
          description="this is a marker example"
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
