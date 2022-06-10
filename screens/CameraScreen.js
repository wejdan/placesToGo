import {View, Text} from 'react-native';
import React from 'react';
const CamaraScreen = ({route}) => {
  const {setImage} = route.params;

  return (
    <View style={{flex: 1}}>
      <Text>Camera Screen</Text>
    </View>
  );
};

export default CamaraScreen;
