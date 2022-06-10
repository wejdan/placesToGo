import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import {colors} from '../theme/colors';

import {Surface} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {login, setError} from '../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import LoadingOverlay from '../componenets/LoadingOverlay';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const error = useSelector(store => store.user.error);
  const loading = useSelector(store => store.user.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!email.trim() || !password.trim()) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password]);

  function submitHandler() {
    dispatch(
      login({
        email: email.trim(),
        password: password.trim(),
      }),
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals To Go</Text>
      <Surface style={styles.surface}>
        {error != null && <Text style={styles.error}>{error}</Text>}

        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <Button
          icon="lock"
          mode="contained"
          disabled={isDisabled || loading}
          color={colors.brand.primary}
          style={styles.button}
          loading={loading}
          onPress={submitHandler}>
          LOGIN
        </Button>
      </Surface>
      <Button
        mode="contained"
        color={colors.brand.primary}
        style={{marginTop: 30}}
        onPress={() => {
          dispatch(setError(null));

          navigation.navigate('WelcomeScreen');
        }}>
        BACK
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'black',

    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',

    alignSelf: 'center',
  },
  input: {
    fontSize: 14,
    marginBottom: 12,
    height: 50,
  },
  surface: {
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  error: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
});
