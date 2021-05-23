import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BuyProductListScreen from "../screens/buy/BuyProductListScreen";
import BuyCart from "../screens/buy/BuyCart";
import BuyOrders from "../screens/buy/BuyOrders";

import Color from "../constants/Colors";

const buyStack = createStackNavigator();
const buyBottomTab = createBottomTabNavigator();

const buyProductList = () => {
  return (
    <buyStack.Navigator>
      <buyStack.Screen name="BuyProductList" component={BuyProductListScreen} />
    </buyStack.Navigator>
  );
};
const buyCart = () => {
  return (
    <buyStack.Navigator>
      <buyStack.Screen name="BuyCart" component={BuyCart} />
    </buyStack.Navigator>
  );
};
const buyOrders = () => {
  return (
    <buyStack.Navigator>
      <buyStack.Screen name="BuyOrders" component={BuyOrders} />
    </buyStack.Navigator>
  );
};

const BuyNav = () => {
  return (
    <buyBottomTab.Navigator
      screenOptions={{
        headerTitle: "BuyNav",
        headerShown: false,
        headerTintColor: Color.PRIMARY_COLOR,
      }}
    >
      <buyBottomTab.Screen name="BuyProductList" component={buyProductList} />
      <buyBottomTab.Screen name="BuyCart" component={buyCart} />
      <buyBottomTab.Screen name="BuyOrders" component={buyOrders} />
    </buyBottomTab.Navigator>
  );
};

export default BuyNav;
