import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {colors} from '../theme/colors';
import {Surface} from 'react-native-paper';
import LottieView from 'lottie-react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: `absolute`,
          height: '40%',
          width: '100%',
          top: 30,
        }}>
        <LottieView
          source={require('../assets/watermelon.json')}
          autoPlay
          loop
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>Meals To Go</Text>
      <Surface style={styles.surface}>
        <Button
          icon="lock"
          mode="contained"
          color={colors.brand.primary}
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          LOGIN
        </Button>
        <Button
          icon="email"
          mode="contained"
          style={styles.button}
          color={colors.brand.primary}
          onPress={() => navigation.navigate('RegisterScreen')}>
          REGISTER
        </Button>
      </Surface>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',

    fontSize: 24,
  },
  button: {
    width: 130,
    marginVertical: 8,
  },
  surface: {
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
