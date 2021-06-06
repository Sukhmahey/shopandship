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
  console.log("Auth Sync");
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
export const authAsyncStorageUpdate = async (payload) => {
  console.log("Auth Sync");
  try {
    // const jsonValue = await AsyncStorage.getItem(ASYNC_AUTH_DATA);

    const value = JSON.stringify(payload);
    await AsyncStorage.setItem(ASYNC_AUTH_DATA, value);
    return value;
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
      console.log("User Data", data);
      dispatch(GetUserDataFromFirebase(data));
    });
};

export const UploadUserData = (dispatch, phoneNumber, address, data) => {
  return async (dispatch) => {
    const uid = auth().currentUser.uid;
    const payload = {
      uid: uid,
      name: data.user.displayName,
      email: data.user.email,
      phone: phoneNumber,
      address: address,
      photo: data.user.photoURL,
    };
    firestore()
      .collection("users")
      .doc(uid)
      .set({
        name: data.user.displayName,
        email: data.user.email,
        phone: phoneNumber,
        address: address,
        photo: data.user.photoURL,
      })
      .then(() => {});

    authAsyncStorage(payload);

    dispatch({
      type: SIGNIN,
      payload: payload,
    });
  };
};

const GetUserDataFromFirebase = (userData) => {
  return async (dispatch) => {
    const uid = auth().currentUser.uid;
    if (uid !== null) {
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .get()
        .then((data) => {
          console.log("userdata", data._data);
          if (data._data === undefined) {
            dispatch(
              UploadUserData(
                dispatch,
                "Not Available",
                "Not Available",
                userData
              )
            );
          } else if (
            (data._data.phoneNumber === "Not Available" ||
              data._data.phoneNumber === undefined ||
              data._data.phoneNumber === null) &&
            (data._data.address === "Not Available" ||
              data._data.address === undefined)
          ) {
            console.log("phone no data no");
            dispatch(
              UploadUserData(
                dispatch,
                "Not Available",
                "Not Available",
                userData
              )
            );
          } else if (
            (data._data.phoneNumber === "Not Available" ||
              data._data.phoneNumber === undefined ||
              data._data.phoneNumber === null) &&
            (data._data.address !== "Not Available" ||
              data._data.address !== undefined)
          ) {
            console.log("phone no data yes");
            dispatch(
              UploadUserData(
                dispatch,
                "Not Available",
                data._data.address,
                userData
              )
            );
          } else if (
            (data._data.phoneNumber !== "Not Available" ||
              data._data.phoneNumber !== undefined ||
              data._data.phoneNumber !== null) &&
            (data._data.address === "Not Available" ||
              data._data.phoneNumber === undefined)
          ) {
            console.log("phone yes data no");
            dispatch(
              UploadUserData(
                dispatch,
                data._data.phoneNumber,
                "Not Available",
                userData
              )
            );
          } else {
            console.log("phone no data no else");
            dispatch(
              UploadUserData(
                dispatch,
                data._data.phoneNumber,
                data._data.address,
                userData
              )
            );
          }
        });
    }
  };
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
