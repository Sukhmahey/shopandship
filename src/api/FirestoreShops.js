import React, { useState } from "react";
import { Alert, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { getAsyncData } from "./AsyncData";

export const AddShop = async (shopId, shopData, navigation) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = firestore()
    .collection("users")
    .doc(uid)
    .collection("shops")
    .doc(shopId)
    .set({
      shopId: shopData.shopId,
      shopName: shopData.shopName,
      shopPhone: shopData.shopPhone,
      shopAddress: shopData.shopAddress,
      shopPhoto: shopData.shopPhoto,
      shopDescription: shopData.shopDescription,
    })
    .then(() => {
      console.log("Shop added!");
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

export const UpdateShop = async (shopId, shopData, navigation) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = await firestore()
    .collection("users")
    .doc(`${uid}`)
    .collection("shops")
    .doc(`${shopId}`)
    .update({
      shopName: shopData.shopName,
      shopPhone: shopData.shopPhone,
      shopAddress: shopData.shopAddress,
      shopPhoto: shopData.shopPhoto,
      shopDescription: shopData.shopDescription,
    })
    .then(() => {
      console.log("Shop Data Updated");
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

export const DeleteShop = async (shopId, navigation) => {
  const data = await getAsyncData();
  const uid = data.uid;
  const res = await firestore()
    .collection("users")
    .doc(`${uid}`)
    .collection("shops")
    .doc(`${shopId}`)
    .delete()
    .then((data) => {
      console.log("Shop Deleted");
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
