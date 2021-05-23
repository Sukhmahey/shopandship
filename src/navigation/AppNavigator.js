import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import AuthNav from "./AuthNav";
import BuyNav from "./BuyNav";
import SellNav from "./SellNav";
import AccountScreen from "../screens/AccountScreen";

import Color from "../constants/Colors";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Signin = () => {
  const isSignedIn = useSelector((state) => state.Auth.isSignedIn);
  return isSignedIn;
};

export default () => {
  return (
    <NavigationContainer>
      <OverflowMenuProvider>
        {Signin() ? (
          <Drawer.Navigator
            screenOptions={{
              headerTitle: "App WorkFlow",
              headerShown: false,
              headerTintColor: Color.PRIMARY_COLOR,
            }}
          >
            <Drawer.Screen name="BuyNav" component={BuyNav} />
            <Drawer.Screen name="SellNav" component={SellNav} />

            <Drawer.Screen name="Account" component={AccountScreen} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerTitle: "App Navigator",
              headerShown: false,
            }}
          >
            <Stack.Screen name="AuthNav" component={AuthNav} />
          </Stack.Navigator>
        )}
      </OverflowMenuProvider>
    </NavigationContainer>
  );
};
