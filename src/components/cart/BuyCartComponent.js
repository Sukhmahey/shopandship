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
import {
  UpdateCartAmount,
  RemoveFromCart,
  UpdateTotalCartPrice,
} from "../../store/actions/BuyCartActions";

const BuyCartComponent = ({
  photo,
  unit,
  name,
  price,
  productId,
  nav,
  amount,
}) => {
  const [counter, setCounter] = useState(amount / price);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.BuyCart.cartProducts);

  useEffect(() => {
    if (counter > 0) {
      dispatch(UpdateCartAmount(productId, counter * price));
    }
  }, [counter]);

  useEffect(() => {
    if (counter < 1) {
      dispatch(RemoveFromCart(productId));
    }
  }, [counter]);

  return (
    <View style={styles.screen}>
      <CardView
        cardElevation={6}
        cardMaxElevation={6}
        cornerRadius={6}
        style={{ flex: 1, padding: 5 }}
      >
        <View style={styles.viewsContainer}>
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
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.text}>
              Price : {price}/{unit}
            </Text>

            <View style={styles.counterContainer}>
              <Entypo
                name="circle-with-minus"
                size={30}
                color={Color.PRIMARY_COLOR}
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  setCounter(counter - 1);
                }}
              />
              <View style={styles.numberContainer}>
                <Text style={styles.counterText}>{counter}</Text>
              </View>
              <Entypo
                name="circle-with-plus"
                size={30}
                color={Color.PRIMARY_COLOR}
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  setCounter(counter + 1);
                }}
              />
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
    height: Dimens.height / 5,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
  },
});

export default BuyCartComponent;
