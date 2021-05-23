import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Color from "../constants/Colors";

const PlusIconComponent = (props) => {
  return (
    <HeaderButtons>
      <TouchableOpacity {...props}>
        <Feather name="plus" size={28} style={styles.icon} />
      </TouchableOpacity>
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: Color.PRIMARY_COLOR,
  },
});

export default PlusIconComponent;
