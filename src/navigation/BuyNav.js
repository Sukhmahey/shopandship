import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BuyProductListScreen from "../screens/buy/BuyProductListScreen";
import BuyCart from "../screens/buy/BuyCart";
import MyOrdersNav from "./MyOrdersNav";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

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
      tabBarOptions={{
        activeTintColor: "white",
        labelStyle: { fontSize: 12 },
        inactiveTintColor: Color.PRIMARY_COLOR,
        activeBackgroundColor: Color.PRIMARY_COLOR,
      }}
    >
      <buyBottomTab.Screen
        name="BuyProductList"
        component={buyProductList}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <buyBottomTab.Screen
        name="BuyCart"
        component={buyCart}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <buyBottomTab.Screen
        name="MyOrders"
        component={MyOrdersNav}
        options={{
          tabBarLabel: "My Orders",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shipping-fast" size={size} color={color} />
          ),
        }}
      />
    </buyBottomTab.Navigator>
  );
};

export default BuyNav;
