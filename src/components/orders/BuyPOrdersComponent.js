import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
  ColorPropType,
} from "react-native";

import CardView from "react-native-cardview";
import Dimens from "../../constants/Dimens";
import Color from "../../constants/Colors";
import OkButtonComponent from "../OkButtonComponent";
import { Entypo } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

const BuyOrdersComponent = ({
  photo,
  unit,
  name,
  price,
  desc,
  productId,
  shopId,
  shopUid,
  amount,
  color,
  shopName,
  shopPhone,
  shopAddress,
}) => {
  const [counter, setCounter] = useState(amount / price);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <CardView
        cardElevation={6}
        cardMaxElevation={6}
        cornerRadius={6}
        style={{ flex: 1, padding: 5, borderWidth: 3, borderColor: "orange" }}
      >
        <View style={styles.viewsContainer}>
          <View style={styles.imageContainer}>
            <CardView
              cardElevation={6}
              cardMaxElevation={6}
              cornerRadius={6}
              style={{
                padding: 1,
                borderWidth: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ resizeMode: "contain", height: "100%", width: "100%" }}
                source={{
                  uri: photo,
                }}
              />
            </CardView>
          </View>
          <View style={styles.textContainer}>
            <View style={{ flex: 2 }}>
              <Text style={styles.titleText}>{name}</Text>
              <Text style={styles.text}>
                Price : {price}/{unit}
              </Text>
              <Text style={styles.text}>Units purchased: {counter}</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.text}>Amount to be Paid: {amount} Rs</Text>

              <Text style={styles.text}>Shop name : {shopName}</Text>
              <Text style={styles.text}>Shop phone no. : {shopPhone}</Text>
              <Text style={styles.text}>Shop Address : {shopAddress}</Text>
            </View>
          </View>
        </View>
      </CardView>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    color: "black",
    fontSize: 18,
  },
  numberContainer: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: Color.PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 100,
  },
  screen: {
    width: "100%",
    height: Dimens.height / 2.2,
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 6,
    marginBottom: 10,
  },
  viewsContainer: {
    borderRadius: 6,
    padding: 5,
    flexDirection: "row",
  },
  textContainer: {
    flex: 6,
    padding: 10,
  },
  imageContainer: {
    flex: 4,
    marginVertical: 1,
  },
  titleText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    flex: 1,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
  },
});

export default BuyOrdersComponent;
