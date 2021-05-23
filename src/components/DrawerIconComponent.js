import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Color from "../constants/Colors";

const DrawerIconComponent = ({ navigation }) => {
  return (
    <HeaderButtons>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Ionicons name="menu" size={24} style={styles.icon} />
      </TouchableOpacity>
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: Color.PRIMARY_COLOR,
  },
});

export default DrawerIconComponent;
