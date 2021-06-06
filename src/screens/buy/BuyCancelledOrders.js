import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import BuyCOrdersComponent from "../../components/orders/BuyCOrdersComponent";
import Color from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { GetCOrdersFromFirebase } from "../../store/actions/BuyCOrdersActions";

const BuyCancelledOrders = ({ navigation }) => {
  const cOrders = useSelector((state) => state.BuyCOrders.cancelledOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetCOrdersFromFirebase());
      console.log("Cancelled Orders", cOrders);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  if (cOrders.length < 1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textEmpty}>No Cancelled Orders</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={{ margin: 5 }}>
        <FlatList
          keyExtractor={(product) => product.productId}
          data={cOrders}
          renderItem={({ item }) => {
            return (
              <BuyCOrdersComponent
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

export default BuyCancelledOrders;
