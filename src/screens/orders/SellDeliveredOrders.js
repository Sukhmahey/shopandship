import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import Color from "../../constants/Colors";
import DrawerIconComponent from "../../components/DrawerIconComponent";

import { useSelector, useDispatch } from "react-redux";
import { GetSellDOrdersFromFirebase } from "../../store/actions/SellDOrdersActions";
import SellDOrdersComponent from "../../components/orders/SellDOrdersComponent";

const SellDeliveredOrders = ({ navigation }) => {
  const dispatch = useDispatch();

  const dOrders = useSelector((state) => state.SellDOrders.sellDeliveredOrders);
  const shopId = useSelector((state) => state.MyShopId.myShopId);
  console.log("ShopIDD", shopId);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetSellDOrdersFromFirebase(shopId));
      console.log("Delivered Orders", dOrders);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Delivered Orders",
      headerShown: true,
      headerTintColor: Color.PRIMARY_COLOR,
    });
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
              <SellDOrdersComponent
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

export default SellDeliveredOrders;
