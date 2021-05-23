import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export const getAsyncData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("auth_data");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return e;
  }
};
