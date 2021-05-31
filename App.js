import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import AuthReducer from "./src/store/reducers/AuthReducer";
import ShopReducer from "./src/store/reducers/ShopReducer";
import ProductReducer from "./src/store/reducers/ProductReducer";
import BuyShopReducer from "./src/store/reducers/BuyShopReducer";
import BuyCartReducer from "./src/store/reducers/BuyCartReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Shop: ShopReducer,
  Product: ProductReducer,
  BuyShop: BuyShopReducer,
  BuyCart: BuyCartReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};
