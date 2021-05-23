import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

const TextInputComponent = (props) => {
  const [text, setText] = useState();
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      value={text}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      enablesReturnKeyAutomatically={true}
      onChangeText={(val) => {
        setText(val);
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: "100%",
    width: "100%",
    fontSize: 14,
    padding: 5,
    color: "black",
    borderWidth: 1,
  },
});

export default TextInputComponent;
