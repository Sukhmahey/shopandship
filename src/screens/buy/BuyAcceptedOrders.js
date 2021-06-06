import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import BuyAOrdersComponent from "../../components/orders/BuyAOrdersComponent";
import Color from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { GetAOrdersFromFirebase } from "../../store/actions/BuyAOrdersActions";

const BuyAcceptedOrders = ({ navigation }) => {
  const aOrders = useSelector((state) => state.BuyAOrders.acceptedOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetAOrdersFromFirebase());
      console.log("Acepted Orders", aOrders);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  if (aOrders.length < 1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textEmpty}>No Accepted Orders</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={{ margin: 5 }}>
        <FlatList
          keyExtractor={(product) => product.productId}
          data={aOrders}
          renderItem={({ item }) => {
            return (
              <BuyAOrdersComponent
                name={item.productName}
                photo={item.productPhoto}
                price={item.productPrice}
                unit={item.productUnit}
                desc={item.productDescription}
                productId={item.productId}
                shopId={item.shopId}
                shopUid={item.uid}
                amount={item.amount}
                shopName={item.shopName}
                shopPhone={item.shopPhone}
                shopAddress={item.shopAddress}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textEmpty: {
    color: Color.PRIMARY_COLOR,
    fontSize: 20,
    margin: 10,
  },
});

export default BuyAcceptedOrders;
