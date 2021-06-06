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

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
            drawerContentOptions={{
              activeTintColor: "white",
              inactiveTintColor: Color.PRIMARY_COLOR,
              activeBackgroundColor: Color.PRIMARY_COLOR,
              itemStyle: { marginVertical: 5 },
            }}
          >
            <Drawer.Screen
              name="BuyNav"
              component={BuyNav}
              options={{
                drawerLabel: "Buy",
                headerTintColor: Color.PRIMARY_COLOR,
                drawerIcon: ({ color, size }) => (
                  <Entypo name="shopping-bag" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="SellNav"
              component={SellNav}
              options={{
                drawerLabel: "Sell",
                headerTintColor: Color.PRIMARY_COLOR,
                drawerIcon: ({ color, size }) => (
                  <Entypo name="shop" size={size} color={color} />
                ),
              }}
            />

            <Drawer.Screen
              name="Account"
              component={AccountScreen}
              options={{
                drawerLabel: "Account",
                headerTintColor: Color.PRIMARY_COLOR,
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="person" size={size} color={color} />
                ),
              }}
            />
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
