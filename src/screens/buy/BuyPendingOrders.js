import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import BuyPOrdersComponent from "../../components/orders/BuyPOrdersComponent";
import Color from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import {
  GetPOrdersFromFirebase,
  ClearPOrders,
} from "../../store/actions/BuyPOrdersActions";

const BuyPendingOrders = ({ navigation }) => {
  const pOrders = useSelector((state) => state.BuyPOrders.pendingOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(ClearPOrders());
      console.log("Pending Orders", pOrders);
    });
    return unsubscribe;
  }, [navigation, pOrders]);

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

export default BuyPendingOrders;
