import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { getAsyncData } from "../../api/AsyncData";

export const SIGNIN = "signin";
export const SIGNOUT = "signout";
export const GET_CURRENT_USER = "currentUser";
export const ASYNC_AUTH_DATA = "auth_data";

export const authAsyncStorage = async (payload) => {
  try {
    const jsonValue = await AsyncStorage.getItem(ASYNC_AUTH_DATA);
    if (jsonValue === null) {
      const value = JSON.stringify(payload);
      await AsyncStorage.setItem(ASYNC_AUTH_DATA, value);
      return value;
    } else {
      const value = JSON.parse(jsonValue);
      return value;
    }
  } catch (e) {
    console.log("Async Error (AuthActions) ", e);
  }
};

const onGoogleButtonPress = async (dispatch) => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  const data = auth()
    .signInWithCredential(googleCredential)
    .then((data) => {
      const uid = auth().currentUser.uid;
      firestore()
        .collection("users")
        .doc(uid)
        .set({
          name: data.user.displayName,
          email: data.user.email,
          phone:
            data.user.phoneNumber === null
              ? "Not Available"
              : data.user.phoneNumber,
          photo: data.user.photoURL,
        });
      const payload = {
        uid: uid,
        name: data.user.displayName,
        email: data.user.email,
        phone:
          data.user.phoneNumber === null
            ? "Not Available"
            : data.user.phoneNumber,
        photo: data.user.photoURL,
      };
      authAsyncStorage(payload);
      dispatch({
        type: SIGNIN,
        payload: payload,
      });
    });
};

const getCurrentUser = async (dispatch) => {
  // const currentUser = await GoogleSignin.getCurrentUser().then((data) => {
  // const uid = auth().currentUser.uid;
  // const payload = {
  //   uid: uid,
  //   name: data.user.displayName,
  //   email: data.user.email,
  //   phone:
  //     data.user.phoneNumber === null
  //       ? "Not Available"
  //       : data.user.phoneNumber,
  //   photo: data.user.photoURL,
  // };
  // authAsyncStorage(payload);

  const data = getAsyncData();
  if (data !== null) {
    dispatch({
      type: SIGNIN,
    });
  }
};

export const SignIn = () => {
  return async (dispatch) => {
    onGoogleButtonPress(dispatch);
  };
};

export const SignOut = () => {
  return async (dispatch) => {
    const signOut = async () => {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem(ASYNC_AUTH_DATA);
    };
    signOut();
    dispatch({ type: SIGNOUT });
  };
};

export const CurrentUser = () => {
  return async (dispatch) => {
    getCurrentUser(dispatch);
  };
};
