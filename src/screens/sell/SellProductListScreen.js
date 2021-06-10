import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import ProductSellCardComponent from "../../components/products/ProductSellCardComponent";
import DrawerIconComponent from "../../components/DrawerIconComponent";
import PlusIconComponent from "../../components/PlusIconComponent";
import { GetAllProducts } from "../../store/actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";

import Color from "../../constants/Colors";

const SellProductListScreen = ({ navigation, route }) => {
  const { shopId, name, address, phone } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProducts(shopId));
  }, [navigation]);
  const allProducts = useSelector((state) => state.Product.allProducts);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "My Products",
      headerShown: true,

      headerRight: () => (
        <PlusIconComponent
          onPress={() => {
            navigation.navigate("CreateProduct", {
              shopId: shopId,
              name: name,
              address: address,
              phone: phone,
            });
          }}
        />
      ),
    });
  }, [navigation]);
  if (allProducts.length < 1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textEmpty}>Lets Add Your First product!</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(product) => product.productId}
        data={allProducts}
        renderItem={({ item }) => {
          return (
            <ProductSellCardComponent
              name={item.productName}
              photo={item.productPhoto}
              price={item.productPrice}
              unit={item.productUnit}
              desc={item.productDescription}
              nav={navigation}
              productId={item.productId}
              shopId={shopId}
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

export default SellProductListScreen;
