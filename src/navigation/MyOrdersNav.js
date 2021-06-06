import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BuyPendingOrders from "../screens/buy/BuyPendingOrders";
import BuyAcceptedOrders from "../screens/buy/BuyAcceptedOrders";
import BuyDeliveredOrders from "../screens/buy/BuyDeliveredOrders";
import BuyCancelledOrders from "../screens/buy/BuyCancelledOrders";

import Color from "../constants/Colors";

const buyStack = createStackNavigator();
const toptab = createMaterialTopTabNavigator();

const buyPendingOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen name="Pending Orders" component={BuyPendingOrders} />
    </buyStack.Navigator>
  );
};

const buyAcceptedOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen name="BuyAcceptedOrders" component={BuyAcceptedOrders} />
    </buyStack.Navigator>
  );
};

const buyDeliveredOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen
        name="BuyDeliveredOrders"
        component={BuyDeliveredOrders}
      />
    </buyStack.Navigator>
  );
};
const buyCancelledOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen
        name="BuyCancelledOrders"
        component={BuyCancelledOrders}
      />
    </buyStack.Navigator>
  );
};
const MyOrdersNav = () => {
  return (
    <toptab.Navigator
      tabBarOptions={{
        activeTintColor: Color.PRIMARY_COLOR,
        labelStyle: { fontSize: 12 },
      }}
    >
      <toptab.Screen name="Pending Orders" component={buyPendingOrders} />
      <toptab.Screen name="Accepted Orders" component={buyAcceptedOrders} />
      <toptab.Screen name="Delivered Orders" component={buyDeliveredOrders} />
      <toptab.Screen name="Cancel Orders" component={buyCancelledOrders} />
    </toptab.Navigator>
  );
};

export default MyOrdersNav;
