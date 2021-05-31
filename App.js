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
import BuyPOrdersReducer from "./src/store/reducers/BuyPOrdersReducer";
import BuyAOrdersReducer from "./src/store/reducers/BuyAOrdersReducer";
import BuyDOrdersReducer from "./src/store/reducers/BuyDOrdersReducer";
import SellOrdersReducer from "./src/store/reducers/SellOrdersReducer";
import SellAOrdersReducer from "./src/store/reducers/SellAOrdersReducer ";
import SellDOrdersReducer from "./src/store/reducers/SellDOrdersReducer";
import MyShopIdReducer from "./src/store/reducers/MyShopIdReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Shop: ShopReducer,
  Product: ProductReducer,
  BuyShop: BuyShopReducer,
  BuyCart: BuyCartReducer,
  BuyPOrders: BuyPOrdersReducer,
  BuyAOrders: BuyAOrdersReducer,
  BuyDOrders: BuyDOrdersReducer,
  SellOrders: SellOrdersReducer,
  SellAOrders: SellAOrdersReducer,
  SellDOrders: SellDOrdersReducer,
  MyShopId: MyShopIdReducer,
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
