import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Color from "../constants/Colors";

const InputContainerComponent = (props) => {
  const [emptyText, setEmptyText] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const onEndEdit = () => {
    if (props.value.length === 0) {
      if (props.content === "text") {
        setErrMessage(`*Required ${props.placeholder}`);
      } else {
        setErrMessage("*Required Phone Number");
      }
      setEmptyText(true);
    } else if (
      props.content === "number" &&
      props.value.length < 10 &&
      props.value.length > 0
    ) {
      setErrMessage("Phone Number length is < 10");
      setEmptyText(true);
    } else {
      setEmptyText(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {props.iconLeft}
        <TextInput
          {...props}
          style={[styles.input, props.style]}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          enablesReturnKeyAutomatically={true}
          onEndEditing={() => {
            onEndEdit();
          }}
        />
        {props.iconRight}
      </View>
      {emptyText ? <Text style={styles.errorText}>{errMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginHorizontal: 5,
  },
  inputContainer: {
    minHeight: 50,
    width: "100%",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Color.PRIMARY_COLOR,
    borderRadius: 6,
    alignItems: "center",
    padding: 3,
    marginBottom: 3,
  },
  errorText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "red",
  },
});

export default InputContainerComponent;
