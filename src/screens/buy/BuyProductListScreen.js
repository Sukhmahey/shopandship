import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import ProductBuyCardComponent from "../../components/products/ProductBuyCardComponent";
import DrawerIconComponent from "../../components/DrawerIconComponent";
import PlusIconComponent from "../../components/PlusIconComponent";

import Color from "../../constants/Colors";

import {
  BuyGetAllShops,
  GetCartFromFirebase,
} from "../../store/actions/BuyShopActions";
import { useSelector, useDispatch } from "react-redux";

const BuyProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(BuyGetAllShops());
  }, [navigation]);

  useEffect(() => {
    dispatch(GetCartFromFirebase());
  }, [navigation]);
  const allProducts = useSelector((state) => state.BuyShop.allProducts);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Shop'N Ship",
      headerShown: true,
      headerTintColor: Color.PRIMARY_COLOR,
      headerLeft: () => <DrawerIconComponent navigation={navigation} />,
    });
  }, [navigation]);
  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(product) => product.productId}
        data={allProducts}
        renderItem={({ item }) => {
          return (
            <ProductBuyCardComponent
              name={item.productName}
              photo={item.productPhoto}
              price={item.productPrice}
              unit={item.productUnit}
              desc={item.productDescription}
              nav={navigation}
              productId={item.productId}
              shopId={item.shopId}
              shopUid={item.uid}
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

export default BuyProductListScreen;
