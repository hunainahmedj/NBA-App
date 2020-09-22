import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const input = props => {
  let templete = null;

  switch (props.type) {
    case 'textinput':
      templete = (
        <TextInput {...props} style={[styles.input, props.override]} />
      );
      break;
    default:
      return templete;
  }
  return templete;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    fontSize: 16,
    marginTop: 10,
  },
});

export default input;
