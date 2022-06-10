import {View, Text, Animated} from 'react-native';
import React, {useRef, useContext, useEffect} from 'react';

const FadeInView = ({duration = 1500, ...props}) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation, duration]);
  return (
    <Animated.View style={{...props.style, opacity: fadeAnimation}}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
