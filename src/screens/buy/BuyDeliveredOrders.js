import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import BuyDOrdersComponent from "../../components/orders/BuyDOrdersComponent";
import Color from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { GetDOrdersFromFirebase } from "../../store/actions/BuyDOrdersActions";

const BuyDeliveredOrders = ({ navigation }) => {
  const dOrders = useSelector((state) => state.BuyDOrders.deliveredOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetDOrdersFromFirebase());
      console.log("Delivered Orders", dOrders);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  if (dOrders.length < 1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textEmpty}>No Delivered Orders Yet!</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={{ margin: 5 }}>
        <FlatList
          keyExtractor={(product) => product.productId}
          data={dOrders}
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

export default BuyDeliveredOrders;
