import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import OkButtonComponent from "./OkButtonComponent";
import CardView from "react-native-cardview";
import Dimens from "../constants/Dimens";
import Color from "../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { GetMyShopId } from "../store/actions/MyShopIdActions";

const height = Dimens.height / 1.75 / 8;

const ShopSellCardComponent = ({
  name,
  phone,
  address,
  photo,
  shopId,
  desc,
  nav,
}) => {
  const dispatch = useDispatch();
  const TouchComponent =
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  const orders = () => {
    dispatch(GetMyShopId(shopId));
    nav.navigate("Orders", {
      screen: "Pending Orders",
      params: {
        screen: "SellPendingOrders",
        params: { shopId: shopId },
      },
    });
  };
  return (
    <View style={styles.screen}>
      <CardView
        cardElevation={6}
        cardMaxElevation={6}
        cornerRadius={6}
        style={{ flex: 1, padding: 5 }}
      >
        <View style={styles.imageContainer}>
          <CardView cardElevation={6} cardMaxElevation={6} cornerRadius={6}>
            <Image
              style={{ resizeMode: "center", height: "100%", width: "100%" }}
              source={{
                uri: photo,
              }}
            />
          </CardView>
        </View>
        <View style={styles.textContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.text}>Description: {desc}</Text>
            <Text style={styles.text}>Phone: {phone}</Text>
            <Text style={styles.text}>Address: {address}</Text>
          </View>
          <TouchableOpacity
            style={styles.behind}
            onPress={() => {
              nav.navigate("EditShop", {
                name,
                phone,
                address,
                photo,
                id,
                desc,
              });
            }}
          >
            <Entypo name="edit" size={30} color={Color.PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <OkButtonComponent
            text="Orders"
            style={{ width: "45%" }}
            onPress={() => {
              orders();
            }}
          />
          <OkButtonComponent
            text="Products"
            onPress={() => {
              nav.navigate("SellProductList", {
                shopId: shopId,
                address: address,
                phone,
                phone,
              });
            }}
            style={{
              width: "45%",
              backgroundColor: Color.ACCENT_COLOR,
            }}
          />
        </View>
      </CardView>
    </View>
  );
};

const styles = StyleSheet.create({
  behind: {
    borderRadius: 4,
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
    top: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  screen: {
    width: "100%",
    height: Dimens.height / 1.75,

    borderRadius: 6,
    padding: 5,
  },
  imageContainer: {
    flex: 6,
    marginVertical: 1,
  },
  textContainer: {
    flex: 4,
    padding: 10,
  },
  imageStyle: {
    width: "100%",
    height: height * 4,
    resizeMode: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "black",
    flex: 1,
  },
});
export default ShopSellCardComponent;
