import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { StackActions } from "@react-navigation/native";

import AnimatedSplash from "react-native-animated-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SignIn, CurrentUser } from "../store/actions/AuthActions";
import { useSelector, useDispatch } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (isSignedIn) {
      dispatch(CurrentUser());
    } else {
      navigation.dispatch(StackActions.replace("AuthScreen"));
    }

    return isSignedIn;
  };

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      isSignedIn();
    }, 2500);
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={true}
      logoImage={require("../assets/homeapp.png")}
      backgroundColor={"white"}
      logoHeight={200}
      logoWidth={200}
    ></AnimatedSplash>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
