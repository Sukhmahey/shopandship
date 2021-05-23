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

const getAllShops = async (dispatch, uid) => {
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

export const GetCartFromFirebase = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          console.log("From Firebase", element._data);
          dispatch({
            type: GET_CART_FROM_FIREBASE,
            payload: element._data,
          });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

export const AddToCart = (
  name,
  photo,
  price,
  unit,
  productId,
  shopId,
  shopUid
) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .doc(productId)
        .set({
          shopUid: shopUid,
          shopId: shopId,
          productId: productId,
          productName: name,
          productPhoto: photo,
          productPrice: price,
          productUnit: unit,
          amount: price,
        })
        .then(() => {
          console.log("Added To Cart");
        })
        .catch((e) => {
          console.log("error adding to cart", e);
        });
    }
  };
};

export const RemoveFromCart = (productId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .doc(productId)
        .delete()
        .then(() => {
          dispatch({
            type: REMOVE_FROM_CART,
            productId: productId,
          });
          console.log("Removed From Cart");
        })
        .catch((e) => {
          console.log("error removing from cart", e);
        });
    }
  };
};

export const UpdateCartAmount = (productId, amount) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .doc(productId)
        .update({
          amount: amount,
        })
        .then(() => {
          dispatch({
            type: UPDATE_CART_PRICE,
            productId: productId,
            amount: amount,
          });
          console.log("Amount updated");
        })
        .catch((e) => {
          console.log("error updating amount", e);
        });
    }
  };
};

export const UpdateTotalCartPrice = (amount) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_TOTAL_CART_PRICE,
      amount: amount,
    });
  };
};
