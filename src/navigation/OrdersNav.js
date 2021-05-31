import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SellPendingOrders from "../screens/orders/SellPendingOrders";
import SellAcceptedOrders from "../screens/orders/SellAcceptedOrders";
import SellDeliveredOrders from "../screens/orders/SellDeliveredOrders";

import Color from "../constants/Colors";

const buyStack = createStackNavigator();
const toptab = createMaterialTopTabNavigator();

// const sellPendingOrders = () => {
//   return (
//     <buyStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <buyStack.Screen name="SellPendingOrders" component={SellPendingOrders} />
//     </buyStack.Navigator>
//   );
// };

// const sellAcceptedOrders = () => {
//   return (
//     <buyStack.Navigator>
//       <buyStack.Screen
//         name="SellAcceptedOrders"
//         component={SellAcceptedOrders}
//       />
//     </buyStack.Navigator>
//   );
// };

// const sellDeliveredOrders = () => {
//   return (
//     <buyStack.Navigator>
//       <buyStack.Screen
//         name="SellDeliveredOrders"
//         component={SellDeliveredOrders}
//       />
//     </buyStack.Navigator>
//   );
// };
const OrdersNav = () => {
  return (
    <toptab.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: Color.PRIMARY_COLOR,
      }}
    >
      <toptab.Screen name="Pending Orders" component={SellPendingOrders} />
      <toptab.Screen name="Accepted Orders" component={SellAcceptedOrders} />
      <toptab.Screen name="Delivered Orders" component={SellDeliveredOrders} />
    </toptab.Navigator>
  );
};

export default OrdersNav;
