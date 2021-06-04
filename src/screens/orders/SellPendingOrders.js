import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import Color from "../../constants/Colors";
import DrawerIconComponent from "../../components/DrawerIconComponent";

import { useSelector, useDispatch } from "react-redux";
import { GetSellPOrdersFromFirebase } from "../../store/actions/SellOrdersActions";
import SellPOrdersComponent from "../../components/orders/SellPOrdersComponent";

const SellPendingOrders = ({ navigation, route }) => {
  const { shopId } = route.params;

  const pOrders = useSelector((state) => state.SellOrders.sellPendingOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetSellPOrdersFromFirebase(shopId));
      console.log("Pending Orders", pOrders);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Pending Orders",
      headerShown: true,
      headerTintColor: Color.PRIMARY_COLOR,
    });
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
              <SellPOrdersComponent
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

export default SellPendingOrders;
