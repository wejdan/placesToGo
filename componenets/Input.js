import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import colors from '../constants/colors';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  error,
  onBlur,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, error != null && styles.inputInvalid]}
        autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={label}
        onBlur={onBlur}
      />
      {error != null && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },

  inputInvalid: {
    color: 'red',
    borderColor: 'red',
  },
  input: {
    fontSize: 14,

    height: 45,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
