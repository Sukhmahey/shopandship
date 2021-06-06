import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SellPendingOrders from "../screens/orders/SellPendingOrders";
import SellAcceptedOrders from "../screens/orders/SellAcceptedOrders";
import SellDeliveredOrders from "../screens/orders/SellDeliveredOrders";
import SellCancelledOrders from "../screens/orders/SellCancelledOrders";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
      tabBarOptions={{
        activeTintColor: "white",
        activeBackgroundColor: Color.PRIMARY_COLOR,
        inactiveTintColor: Color.PRIMARY_COLOR,
        labelStyle: { fontSize: 12 },
      }}
    >
      <toptab.Screen
        name="Pending Orders"
        component={sellPendingOrders}
        options={{
          tabBarLabel: "Pending Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox" size={size} color="orange" />
          ),
        }}
      />
      <toptab.Screen
        name="Accepted Orders"
        component={sellAcceptedOrders}
        options={{
          tabBarLabel: "Accepted Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox" size={size} color="green" />
          ),
        }}
      />
      <toptab.Screen
        name="Delivered Orders"
        component={sellDeliveredOrders}
        options={{
          tabBarLabel: "Delivered Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="checkbox"
              size={size}
              color={Color.HIGHLIGHT_COLOR}
            />
          ),
        }}
      />
      <toptab.Screen
        name="Cancelled Orders"
        component={sellCancelledOrders}
        options={{
          tabBarLabel: "Cancelled Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox" size={size} color="red" />
          ),
        }}
      />
    </toptab.Navigator>
  );
};

export default OrdersNav;
