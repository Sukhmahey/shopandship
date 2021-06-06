import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { getAsyncData } from "../AsyncData";

export const UpdatePhone = async (phoneNumber) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = firestore()
    .collection("users")
    .doc(`${uid}`)
    .update({
      phone: phoneNumber,
    })
    .then(() => {
      console.log("Phone Number Updated");
    })
    .catch((e) => {
      console.log(e);
      Alert.alert(
        "Something went wrong",
        "Check network Connection and try again!",
        [{ text: "Ok", style: "ok" }]
      );
    });
};

export const UpdateAddress = async (address) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = firestore()
    .collection("users")
    .doc(`${uid}`)
    .update({
      address: address,
    })
    .then(() => {
      console.log("Address Updated");
    })
    .catch((e) => {
      console.log(e);
      Alert.alert(
        "Something went wrong",
        "Check network Connection and try again!",
        [{ text: "Ok", style: "ok" }]
      );
    });
};
