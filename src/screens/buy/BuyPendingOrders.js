import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import BuyPOrdersComponent from "../../components/orders/BuyPOrdersComponent";
import Color from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { GetPOrdersFromFirebase } from "../../store/actions/BuyPOrdersActions";

const BuyPendingOrders = ({ navigation }) => {
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
  if (pOrders.length < 1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textEmpty}>No Pending Orders</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={{ margin: 5 }}>
        <FlatList
          keyExtractor={(product) => product.productId}
          data={pOrders}
          renderItem={({ item }) => {
            return (
              <BuyPOrdersComponent
                name={item.productName}
                photo={item.productPhoto}
                price={item.productPrice}
                unit={item.productUnit}
                desc={item.productDescription}
                productId={item.productId}
                shopId={item.shopId}
                shopUid={item.uid}
                amount={item.amount}
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

export default BuyPendingOrders;
