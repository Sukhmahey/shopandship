import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShopNav from "./ShopNav";
import SellShopListScreen from "../screens/sell/SellShopListScreen";

import Color from "../constants/Colors";

const sellStack = createStackNavigator();

const SellNav = () => {
  return (
    <sellStack.Navigator
      screenOptions={{
        headerTitle: "My Shops",
        headerShown: false,
        headerTintColor: Color.PRIMARY_COLOR,
      }}
    >
      <sellStack.Screen name="ShopNav" component={ShopNav} />
    </sellStack.Navigator>
  );
};

export default SellNav;
