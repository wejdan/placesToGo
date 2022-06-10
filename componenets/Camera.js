import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Camara = ({setImage}) => {
  const navigation = useNavigation();

  const [{cameraRef}, {takePicture}] = useCamera(null);
  const captureHandle = async () => {
    try {
      const data = await takePicture();
      setImage(data.uri);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  };
  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.back}
        style={styles.preview}>
        <TouchableOpacity
          onPress={() => {
            captureHandle();
          }}
          style={styles.capture}>
          <Icon name="camera" size={30} color="black" />
        </TouchableOpacity>
      </RNCamera>
    </View>
  );
};

export default Camara;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
