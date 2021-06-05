import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Color from "../constants/Colors";

const OkButtonComponent = (props) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>{props.text}</Text>
        <View>{props.icon}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.PRIMARY_COLOR,
    padding: 5,
    height: 35,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default OkButtonComponent;
