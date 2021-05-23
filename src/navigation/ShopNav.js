import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SellShopListScreen from "../screens/sell/SellShopListScreen";
import CreateShopScreen from "../screens/sell/CreateShopScreen";
import EditShopScreen from "../screens/sell/EditShopScreen";

import SellProductListScreen from "../screens/sell/SellProductListScreen";
import CreateProductScreen from "../screens/sell/CreateProductScreen";
import EditProductScreen from "../screens/sell/EditProductScreen";

import Color from "../constants/Colors";

const shopStack = createStackNavigator();

const ShopNav = () => {
  return (
    <shopStack.Navigator
      screenOptions={{
        headerTitle: "ShopNav",
        headerShown: false,
        headerTintColor: Color.PRIMARY_COLOR,
      }}
    >
      <shopStack.Screen name="SellShopList" component={SellShopListScreen} />
      <shopStack.Screen name="CreateShop" component={CreateShopScreen} />
      <shopStack.Screen name="EditShop" component={EditShopScreen} />

      <shopStack.Screen
        name="SellProductList"
        component={SellProductListScreen}
      />
      <shopStack.Screen name="CreateProduct" component={CreateProductScreen} />
      <shopStack.Screen name="EditProduct" component={EditProductScreen} />
    </shopStack.Navigator>
  );
};

export default ShopNav;
