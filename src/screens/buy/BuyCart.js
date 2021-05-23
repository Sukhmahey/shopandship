import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import ProductBuyCardComponent from "../../components/products/ProductBuyCardComponent";
import DrawerIconComponent from "../../components/DrawerIconComponent";
import PlusIconComponent from "../../components/PlusIconComponent";
import OkButtonComponent from "../../components/OkButtonComponent";
import BuyCartComponent from "../../components/cart/BuyCartComponent";
import LoadingScreenComponent from "../../components/LoadingScreenComponent";

import { useSelector, useDispatch } from "react-redux";

import Color from "../../constants/Colors";

const BuyCart = ({ navigation }) => {
  const [payableAmount, setPayableAmount] = useState(0);
  const allProducts = useSelector((state) => state.BuyShop.cartProducts);
  console.log("Cart Prods", allProducts);

  useEffect(() => {
    let amount = 0;
    allProducts.forEach((element) => {
      amount = parseInt(amount) + parseInt(element.amount);
    });
    setPayableAmount(amount);
  }, [allProducts]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Cart",
      headerShown: true,
      headerTintColor: Color.PRIMARY_COLOR,
      headerLeft: () => <DrawerIconComponent navigation={navigation} />,
    });
  }, [navigation]);

  if (payableAmount < 1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textEmpty}>Cart is Empty...</Text>
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
            <BuyCartComponent
              name={item.productName}
              photo={item.productPhoto}
              price={item.productPrice}
              unit={item.productUnit}
              desc={item.productDescription}
              nav={navigation}
              productId={item.productId}
              amount={item.amount}
            />
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Payable Amount</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <FontAwesome name="rupee" size={18} color={Color.PRIMARY_COLOR} />
            <Text style={styles.amountText}>{payableAmount}</Text>
          </View>
        </View>

        <OkButtonComponent
          text="Pay"
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flex: 1,
            backgroundColor: Color.PRIMARY_COLOR,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  emptyText: {
    fontSize: 20,
    color: Color.PRIMARY_COLOR,
  },
  emptyTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
  textEmpty: {
    color: Color.LIGHT_ACCENT_COLOR,
    fontSize: 20,
    margin: 10,
  },
  text: {
    color: "grey",
    fontSize: 16,
  },
  amountText: {
    color: "black",
    fontSize: 18,
    marginHorizontal: 6,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BuyCart;
