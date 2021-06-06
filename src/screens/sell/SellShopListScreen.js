import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import ShopSellCardComponent from "../../components/ShopSellCardComponent";
import DrawerIconComponent from "../../components/DrawerIconComponent";
import PlusIconComponent from "../../components/PlusIconComponent";
import { GetAllShops } from "../../store/actions/ShopActions";
import { getAsyncData } from "../../api/AsyncData";
import { useSelector, useDispatch } from "react-redux";

const SellShopListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllShops());
  }, [navigation]);
  const allShops = useSelector((state) => state.Shop.allShops);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "My Shops",
      headerShown: true,
      headerLeft: () => <DrawerIconComponent navigation={navigation} />,
      headerRight: () => (
        <PlusIconComponent
          onPress={() => {
            navigation.navigate("CreateShop");
          }}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(shop) => shop.shopId}
        data={allShops}
        renderItem={({ item }) => {
          return (
            <ShopSellCardComponent
              name={item.shopName}
              address={item.shopAddress}
              phone={item.shopPhone}
              photo={item.shopPhoto}
              desc={item.shopDescription}
              nav={navigation}
              shopId={item.shopId}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default SellShopListScreen;
