import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import Color from "../../constants/Colors";
import DrawerIconComponent from "../../components/DrawerIconComponent";

import { useSelector, useDispatch } from "react-redux";
import { GetSellAOrdersFromFirebase } from "../../store/actions/SellAOrdersActions";
import SellAOrdersComponent from "../../components/orders/SellAOrdersComponent";

const SellAcceptedOrders = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const aOrders = useSelector((state) => state.SellAOrders.sellAcceptedOrders);
  const shopId = useSelector((state) => state.MyShopId.myShopId);
  console.log("ShopIDD", shopId);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetSellAOrdersFromFirebase(shopId));
      console.log("Accepted Orders", aOrders);
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
              <SellAOrdersComponent
                name={item.productName}
                photo={item.productPhoto}
                price={item.productPrice}
                unit={item.productUnit}
                desc={item.productDescription}
                productId={item.productId}
                shopId={shopId}
                shopUid={item.uid}
                amount={item.amount}
                uid={item.uid}
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
export default SellAcceptedOrders;
