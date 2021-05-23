import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { getAsyncData } from "../../api/AsyncData";

export const GET_ALL_PRODUCTS = "get_all_products";

const getAllProducts = async (dispatch, shopId) => {
  console.log(shopId);
  const data = await getAsyncData();
  let products = [];

  const onResult = (QuerySnapshot) => {
    products = [];
    QuerySnapshot.forEach((element) => {
      console.log(element._data);
      products.push(element._data);
    });
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: products,
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
      .doc(`${shopId}`)
      .collection("products")
      .onSnapshot(onResult, onError);
  }
  return onResult;
};

export const GetAllProducts = (shopId) => {
  return async (dispatch) => {
    getAllProducts(dispatch, shopId);
  };
};
