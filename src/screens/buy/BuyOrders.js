import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { GetPOrdersFromFirebase } from "../../store/actions/BuyPOrdersActions";

const BuyOrders = ({ navigation }) => {
  const pOrders = useSelector((state) => state.BuyPOrders.pendingOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetPOrdersFromFirebase());
      console.log("Pending Orders", pOrders);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      <Text>Buy Orders</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BuyOrders;
