import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import Input from '../componenets/Input';
import {Button} from 'react-native-paper';
import {Surface} from 'react-native-paper';

import {register, setError} from '../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from '../theme/colors';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import LoadingOverlay from '../componenets/LoadingOverlay';
function RegisterScreen({navigation}) {
  const dispatch = useDispatch();
  const error = useSelector(store => store.user.error);
  const loading = useSelector(store => store.user.loading);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const emailRef = useRef(null);

  const [emailError, setEmailError] = React.useState(null);
  const [ConfirmEmailError, setConfirmEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [ConfirmPasswordError, setConfirmPasswordError] = React.useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  useEffect(() => {
    const email = enteredEmail.trim();
    const password = enteredPassword.trim();
    const confirmEmail = enteredConfirmEmail.trim();
    const confirmPassword = enteredConfirmPassword.trim();
    if (
      !email ||
      !password ||
      !confirmEmail ||
      !confirmPassword ||
      emailError ||
      passwordError ||
      ConfirmEmailError ||
      ConfirmPasswordError
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [emailError, passwordError, ConfirmEmailError, ConfirmPasswordError]);

  const checkEmail = value => {
    const email = value;
    if (email) {
      if (!email.includes('@')) {
        setEmailError('Please enter email');
      } else {
        setEmailError(null);
      }
    }
  };
  const checkPassword = val => {
    const password = val;
    if (password) {
      if (password.length < 6) {
        setPasswordError('Password must be longer than 6 chars');
      } else {
        setPasswordError(null);
      }
    }
  };
  const checkConfirmPassword = val => {
    const confirmPassword = val;
    const password = enteredPassword.trim();

    if (confirmPassword) {
      if (confirmPassword != password) {
        setConfirmPasswordError('passwords do not match');
      } else {
        setConfirmPasswordError(null);
      }
    }
  };
  const checkConfirmEmail = val => {
    const confirmEmail = val;
    const email = enteredEmail.trim();

    if (confirmEmail) {
      if (confirmEmail != email) {
        setConfirmEmailError('email do not match');
      } else {
        setConfirmEmailError(null);
      }
    }
  };

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        checkEmail(enteredValue.trim());

        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        checkConfirmEmail(enteredValue.trim());
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        checkPassword(enteredValue.trim());
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        checkConfirmPassword(enteredValue.trim());
        break;
    }
  }

  function submitHandler() {
    dispatch(
      register({
        email: enteredEmail.trim(),
        password: enteredPassword.trim(),
      }),
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals To Go</Text>
      <Surface style={styles.surface}>
        {error != null && <Text style={styles.error}>{error}</Text>}
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          error={emailError}
          onBlur={e => checkEmail(e.nativeEvent.text)}
        />

        <Input
          label="Confirm Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
          value={enteredConfirmEmail}
          keyboardType="email-address"
          error={ConfirmEmailError}
          onBlur={e => checkConfirmEmail(e.nativeEvent.text)}
        />

        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          error={passwordError}
          onBlur={e => checkPassword(e.nativeEvent.text)}
        />

        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'confirmPassword')}
          secure
          value={enteredConfirmPassword}
          error={ConfirmPasswordError}
          onBlur={e => checkConfirmPassword(e.nativeEvent.text)}
        />

        <View style={styles.buttons}>
          <Button
            color={colors.brand.primary}
            mode="contained"
            loading={loading}
            disabled={isButtonDisabled || loading}
            onPress={submitHandler}>
            Register
          </Button>
        </View>
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
}

export default RegisterScreen;

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
  buttons: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  text: {},
  link: {
    fontWeight: 'bold',
  },
  surface: {
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  bottomLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
});
