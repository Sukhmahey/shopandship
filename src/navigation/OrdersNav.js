import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SellPendingOrders from "../screens/orders/SellPendingOrders";
import SellAcceptedOrders from "../screens/orders/SellAcceptedOrders";
import SellDeliveredOrders from "../screens/orders/SellDeliveredOrders";
import SellCancelledOrders from "../screens/orders/SellCancelledOrders";

import Color from "../constants/Colors";

const buyStack = createStackNavigator();
const toptab = createBottomTabNavigator();

const sellPendingOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen name="SellPendingOrders" component={SellPendingOrders} />
    </buyStack.Navigator>
  );
};

const sellAcceptedOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen
        name="SellAcceptedOrders"
        component={SellAcceptedOrders}
      />
    </buyStack.Navigator>
  );
};

const sellDeliveredOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen
        name="SellDeliveredOrders"
        component={SellDeliveredOrders}
      />
    </buyStack.Navigator>
  );
};
const sellCancelledOrders = () => {
  return (
    <buyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <buyStack.Screen
        name="SellCancelledOrders"
        component={SellCancelledOrders}
      />
    </buyStack.Navigator>
  );
};
const OrdersNav = () => {
  return (
    <toptab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <toptab.Screen name="Pending Orders" component={sellPendingOrders} />
      <toptab.Screen name="Accepted Orders" component={sellAcceptedOrders} />
      <toptab.Screen name="Delivered Orders" component={sellDeliveredOrders} />
      <toptab.Screen name="Cancelled Orders" component={sellCancelledOrders} />
    </toptab.Navigator>
  );
};

export default OrdersNav;
