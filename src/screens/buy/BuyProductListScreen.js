import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { SearchBar } from "react-native-elements";

import ProductBuyCardComponent from "../../components/products/ProductBuyCardComponent";
import DrawerIconComponent from "../../components/DrawerIconComponent";
import PlusIconComponent from "../../components/PlusIconComponent";

import Color from "../../constants/Colors";

import { BuyGetAllShops } from "../../store/actions/BuyShopActions";
import { GetCartFromFirebase } from "../../store/actions/BuyCartActions";
import { useSelector, useDispatch } from "react-redux";

const BuyProductListScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(BuyGetAllShops());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(GetCartFromFirebase());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const all = useSelector((state) => state.BuyShop.allProducts);
  useEffect(() => {
    setFilteredDataSource(all);
    setMasterDataSource(all);
    searchFilterFunction("");
  }, [all]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Shop'N Ship",
      headerShown: true,
      headerTintColor: Color.PRIMARY_COLOR,
      headerLeft: () => <DrawerIconComponent navigation={navigation} />,
    });
  }, [navigation]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter((item) => {
        const itemData = item.productName
          ? item.productName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  return (
    <View style={styles.screen}>
      <View>
        <SearchBar
          round
          containerStyle={{
            backgroundColor: Color.PRIMARY_COLOR,

            marginVertical: 5,
          }}
          inputContainerStyle={styles.searchBarContainer}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          onEndEditing={() => {
            Keyboard.dismiss();
          }}
          placeholder="Type Here..."
          value={search}
        />
      </View>

      <FlatList
        keyExtractor={(product) => product.productId}
        data={filteredDataSource}
        renderItem={({ item }) => {
          return (
            <ProductBuyCardComponent
              name={item.productName}
              photo={item.productPhoto}
              price={item.productPrice}
              unit={item.productUnit}
              desc={item.productDescription}
              nav={navigation}
              productId={item.productId}
              shopId={item.shopId}
              shopUid={item.uid}
              shopName={item.shopName}
              shopPhone={item.shopPhone}
              shopAddress={item.shopAddress}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 5,
  },
  searchBarContainer: {
    backgroundColor: "white",
  },
});

export default BuyProductListScreen;
