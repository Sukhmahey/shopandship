import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import Color from "../../constants/Colors";
import DrawerIconComponent from "../../components/DrawerIconComponent";

import { useSelector, useDispatch } from "react-redux";
import { GetSellCOrdersFromFirebase } from "../../store/actions/SellCOrdersActions";
import SellCOrdersComponent from "../../components/orders/SellCOrdersComponent";

const SellCancelledOrders = ({ navigation }) => {
  const dispatch = useDispatch();

  const cOrders = useSelector((state) => state.SellCOrders.sellCancelledOrders);
  const shopId = useSelector((state) => state.MyShopId.myShopId);
  console.log("ShopIDD", shopId);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetSellCOrdersFromFirebase(shopId));
      console.log("Delivered Orders", cOrders);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Cancelled Orders",
      headerShown: true,
      headerTintColor: Color.PRIMARY_COLOR,
    });
  }, [navigation]);

  if (cOrders.length < 1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textEmpty}>No Cancelled Orders </Text>
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
              <SellCOrdersComponent
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
                buyersPhone={item.buyersPhone}
                buyersAddress={item.buyersAddress}
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

export default SellCancelledOrders;
