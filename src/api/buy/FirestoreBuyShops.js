import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { getAsyncData } from "../../api/AsyncData";

export const getAllShops = async () => {
  function onResult(QuerySnapshot) {
    QuerySnapshot.forEach((element) => {
      console.log(element.id);
    });
  }

  function onError(error) {
    console.error(error);
  }

  firestore().collection("users").onSnapshot(onResult, onError);
};
