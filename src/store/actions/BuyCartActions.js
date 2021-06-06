import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const BUY_GET_ALL_SHOPS = "buy_get_all_shops";
export const GET_CART_FROM_FIREBASE = "get_cart_from_firebase";
export const REMOVE_FROM_CART = "remove_from _cart";
export const UPDATE_CART_PRICE = "update_cart_price";
export const UPDATE_TOTAL_CART_PRICE = "update_total_cart_price";
export const CLEAR_CART = "clear_cart";

export const GetCartFromFirebase = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          console.log("From Firebase", element._data);
          dispatch({
            type: GET_CART_FROM_FIREBASE,
            payload: element._data,
          });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

export const AddToCart = (
  name,
  photo,
  price,
  unit,
  productId,
  shopId,
  shopUid,
  desc,
  shopName,
  shopPhone,
  shopAddress
) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .doc(productId)
        .set({
          shopUid: shopUid,
          shopId: shopId,
          productId: productId,
          productName: name,
          productPhoto: photo,
          productPrice: price,
          productUnit: unit,
          productDescription: desc,
          amount: price,
          shopName: shopName,
          shopPhone: shopPhone,
          shopAddress: shopAddress,
        })
        .then(() => {
          console.log("Added To Cart");
        })
        .catch((e) => {
          console.log("error adding to cart", e);
        });
    }
  };
};

export const RemoveFromCart = (productId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .doc(productId)
        .delete()
        .then(() => {
          dispatch({
            type: REMOVE_FROM_CART,
            productId: productId,
          });
          console.log("Removed From Cart here");
        })
        .catch((e) => {
          console.log("error removing from cart", e);
        });
    }
  };
};

export const UpdateCartAmount = (productId, amount) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cart")
        .doc(productId)
        .update({
          amount: amount,
        })
        .then(() => {
          dispatch({
            type: UPDATE_CART_PRICE,
            productId: productId,
            amount: amount,
          });
          console.log("Amount updated");
        })
        .catch((e) => {
          console.log("error updating amount", e);
        });
    }
  };
};

export const UpdateTotalCartPrice = (amount) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_TOTAL_CART_PRICE,
      amount: amount,
    });
  };
};

export const EmptyFirebaseCart = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
    }
  };
};

export const ClearCart = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
  };
};
