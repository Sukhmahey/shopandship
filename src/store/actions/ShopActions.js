import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { getAsyncData } from "../../api/AsyncData";

export const GET_ALL_SHOPS = "get_all_shops";

const getAllShops = async (dispatch) => {
  const data = await getAsyncData();
  let shops = [];

  const onResult = (QuerySnapshot) => {
    shops = [];
    QuerySnapshot.forEach((element) => {
      shops.push(element._data);
    });
    dispatch({
      type: GET_ALL_SHOPS,
      payload: shops,
    });
  };

  const onError = (error) => {
    console.error(error);
  };

  if (data !== null) {
    const uid = data.uid;
    firestore()
      .collection("users")
      .doc(`${uid}`)
      .collection("shops")
      .onSnapshot(onResult, onError);
  }
  return onResult;
};

export const GetAllShops = () => {
  return async (dispatch) => {
    getAllShops(dispatch);
  };
};
