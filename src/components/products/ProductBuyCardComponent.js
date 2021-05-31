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
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import OkButtonComponent from "../OkButtonComponent";
import CardView from "react-native-cardview";
import Dimens from "../../constants/Dimens";
import Color from "../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { AddToCart, RemoveFromCart } from "../../store/actions/BuyCartActions";
const height = Dimens.height / 1.75 / 8;

const ProductBuyCardComponent = ({
  name,
  price,
  unit,
  photo,
  productId,
  desc,
  nav,
  shopId,
  shopUid,
}) => {
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  const index = useSelector((state) =>
    state.BuyCart.cartProducts.findIndex((prod) => prod.productId === productId)
  );

  useEffect(() => {
    if (index >= 0) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [index]);

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
            <Text style={styles.text}>
              Price: {price} / {unit}
            </Text>
            <View>
              {inCart ? (
                <OkButtonComponent
                  text="Remove from Cart"
                  onPress={() => {
                    dispatch(RemoveFromCart(productId));
                  }}
                  style={{
                    width: "100%",
                    backgroundColor: Color.CANCEL_COLOR,
                  }}
                />
              ) : (
                <OkButtonComponent
                  text="Add to Cart"
                  onPress={() => {
                    dispatch(
                      AddToCart(
                        name,
                        photo,
                        price,
                        unit,
                        productId,
                        shopId,
                        shopUid
                      )
                    );
                  }}
                  style={{
                    width: "100%",
                    backgroundColor: Color.HIGHLIGHT_COLOR,
                  }}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.behind}
            onPress={() => {
              nav.navigate("EditProduct", {
                name,
                price,
                unit,
                photo,
                shopId,
                productId,
                desc,
              });
            }}
          ></TouchableOpacity>
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
export default ProductBuyCardComponent;
