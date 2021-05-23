import React, { useCallback, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { StackActions } from "@react-navigation/native";

import { SignIn } from "../store/actions/AuthActions";
import { useSelector, useDispatch } from "react-redux";

const AuthScreen = ({ navigation }) => {
  const isSignedIn = useSelector((state) => state.Auth);

  const dispatch = useDispatch();
  const signIn = () => {
    dispatch(SignIn());
  };

  return (
    <View style={styles.screen}>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          signIn();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;
