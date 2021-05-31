import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import { useSelector, useDispatch } from "react-redux";

const SellDeliveredOrders = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      <Text>Delivered Orders</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SellDeliveredOrders;