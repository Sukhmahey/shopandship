import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import AuthScreen from "../screens/AuthScreen";
import SplashScreen from "../screens/SplashScreen";

const authStack = createStackNavigator();

const AuthNav = () => {
  GoogleSignin.configure({
    webClientId:
      "230896801384-11p8k8g9khu129rh3qdogecd34els8lg.apps.googleusercontent.com",
  });
  return (
    <authStack.Navigator
      screenOptions={{ headerShown: false, headerTitle: "AuthNav" }}
    >
      <authStack.Screen name="SplashScreen" component={SplashScreen} />
      <authStack.Screen name="AuthScreen" component={AuthScreen} />
    </authStack.Navigator>
  );
};

export default AuthNav;
