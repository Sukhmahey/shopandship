import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BuyPendingOrders from "../screens/buy/BuyPendingOrders";
import BuyAcceptedOrders from "../screens/buy/BuyAcceptedOrders";
import BuyDeliveredOrders from "../screens/buy/BuyDeliveredOrders";

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
    <buyStack.Navigator>
      <buyStack.Screen name="BuyAcceptedOrders" component={BuyAcceptedOrders} />
    </buyStack.Navigator>
  );
};

const buyDeliveredOrders = () => {
  return (
    <buyStack.Navigator>
      <buyStack.Screen
        name="BuyDeliveredOrders"
        component={BuyDeliveredOrders}
      />
    </buyStack.Navigator>
  );
};
const MyOrdersNav = () => {
  return (
    <toptab.Navigator
      screenOptions={{
        headerTitle: "BuyNav",
        headerShown: false,
        headerTintColor: Color.PRIMARY_COLOR,
      }}
    >
      <toptab.Screen name="Pending Orders" component={buyPendingOrders} />
      <toptab.Screen name="Accepted Orders" component={buyAcceptedOrders} />
      <toptab.Screen name="Delivered Orders" component={buyDeliveredOrders} />
    </toptab.Navigator>
  );
};

export default MyOrdersNav;
