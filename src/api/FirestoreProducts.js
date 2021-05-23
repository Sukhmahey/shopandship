import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { getAsyncData } from "./AsyncData";

export const AddProduct = async (
  shopId,
  productId,
  productData,
  navigation
) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = firestore()
    .collection("users")
    .doc(uid)
    .collection("shops")
    .doc(shopId)
    .collection("products")
    .doc(productId)
    .set({
      shopId: productData.shopId,
      productId: productData.productId,
      productName: productData.productName,
      productPhoto: productData.productPhoto,
      productPrice: productData.productPrice,
      productUnit: productData.productUnit,
      productDescription: productData.productDescription,
    })
    .then(() => {
      console.log("product added!");
      navigation.goBack();
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

export const UpdateProduct = async (
  shopId,
  productId,
  productData,
  navigation
) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = firestore()
    .collection("users")
    .doc(`${uid}`)
    .collection("shops")
    .doc(`${shopId}`)
    .collection("products")
    .doc(`${productId}`)
    .update({
      shopId: productData.shopId,
      productId: productData.productId,
      productName: productData.productName,
      productPhoto: productData.productPhoto,
      productPrice: productData.productPrice,
      productUnit: productData.productUnit,
      productDescription: productData.productDescription,
    })
    .then(() => {
      console.log("product updated");
      navigation.goBack();
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

export const DeleteProduct = async (shopId, productId, navigation) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = firestore()
    .collection("users")
    .doc(uid)
    .collection("shops")
    .doc(shopId)
    .collection("products")
    .doc(productId)
    .delete()
    .then(() => {
      console.log("product Deleted");
      navigation.goBack();
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
