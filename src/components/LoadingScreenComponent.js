import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import Color from "../constants/Colors";

const LoadingScreenComponent = (props) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{props.title}</Text>
        <ActivityIndicator size="large" color={Color.PRIMARY_COLOR} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: Color.PRIMARY_COLOR,
    fontSize: 18,
    margin: 10,
  },
});

export default LoadingScreenComponent;
