import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { getAsyncData } from "../../api/AsyncData";

export const BUY_GET_ALL_SHOPS = "buy_get_all_shops";
export const GET_CART_FROM_FIREBASE = "get_cart_from_firebase";
export const REMOVE_FROM_CART = "remove_from _cart";
export const UPDATE_CART_PRICE = "update_cart_price";
export const UPDATE_TOTAL_CART_PRICE = "update_total_cart_price";
export const CLEAR_SHOPS = "clear_shops";

const getAllShops = async (dispatch, uid) => {
  dispatch({
    type: CLEAR_SHOPS,
  });
  const onResult = (QuerySnapshot) => {
    QuerySnapshot.forEach((element) => {
      const onResult = (QuerySnapshot) => {
        QuerySnapshot.forEach((element) => {
          const productData = {
            productDescription: element._data.productDescription,
            productId: element._data.productId,
            productName: element._data.productName,
            productPhoto: element._data.productPhoto,
            productPrice: element._data.productPrice,
            productUnit: element._data.productUnit,
            shopName: element._data.shopName,
            shopPhone: element._data.shopPhone,
            shopAddress: element._data.shopAddress,
            shopId: element._data.shopId,
            uid: uid,
          };
          dispatch({
            type: BUY_GET_ALL_SHOPS,
            productData: productData,
          });
        });
      };

      const onError = (error) => {
        console.error(error);
      };

      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("shops")
        .doc(`${element.id}`)
        .collection("products")
        .onSnapshot(onResult, onError);
    });
  };

  const onError = (error) => {
    console.error(error);
  };

  firestore()
    .collection("users")
    .doc(`${uid}`)
    .collection("shops")
    .onSnapshot(onResult, onError);

  return onResult;
};

export const BuyGetAllShops = () => {
  return async (dispatch) => {
    firestore().collection("users").onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
      QuerySnapshot.forEach((element) => {
        getAllShops(dispatch, element.id);
      });
    }

    function onError(error) {
      console.error(error);
    }
  };
};
