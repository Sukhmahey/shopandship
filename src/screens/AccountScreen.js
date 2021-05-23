import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SignOut } from "../store/actions/AuthActions";
import { useDispatch } from "react-redux";
import { StackActions } from "@react-navigation/native";

import DrawerIconComponent from "../components/DrawerIconComponent";
import OkButtonComponent from "../components/OkButtonComponent";
import Color from "../constants/Colors";

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Account",
      headerShown: true,
      headerLeft: () => <DrawerIconComponent navigation={navigation} />,
    });
  }, [navigation]);

  const signout = () => {
    dispatch(SignOut(navigation, StackActions));
  };

  return (
    <View>
      <Text>Account Screen</Text>
      <OkButtonComponent
        text="Log Out"
        style={{ backgroundColor: Color.HIGHLIGHT_COLOR }}
        onPress={() => {
          signout();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
