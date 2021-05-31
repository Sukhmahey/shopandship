import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const Get_P_ORDERS = "get_p_orders";

export const AddToBuyersPOrders = () => {
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
          console.log("ShopUid", element._data.shopUid);
          dispatch(AddToSellersPOrders(element._data));

          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("pendingOrders")
            .doc(element.id)
            .set({
              uid: uid,
              shopUid: element._data.shopUid,
              shopId: element._data.shopId,
              productDescription: element._data.productDescription,
              productId: element._data.productId,
              productName: element._data.productName,
              productPhoto: element._data.productPhoto,
              productPrice: element._data.productPrice,
              productUnit: element._data.productUnit,
              amount: element._data.amount,
            })
            .then(() => {})
            .catch((e) => {
              console.log("error removing from cart", e);
            });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

const AddToSellersPOrders = (Pdata) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;

      firestore()
        .collection("users")
        .doc(Pdata.shopUid)
        .collection("shops")
        .doc(Pdata.shopId)
        .collection("pendingOrders")
        .doc(Pdata.productId)
        .set({
          shopUid: Pdata.shopUid,
          shopId: Pdata.shopId,
          productId: Pdata.productId,
          productName: Pdata.productName,
          productPhoto: Pdata.productPhoto,
          productPrice: Pdata.productPrice,
          productUnit: Pdata.productUnit,
          productDescription: Pdata.productDescription,
          amount: Pdata.amount,
        })
        .then(() => {})
        .catch((e) => {
          console.log("error removing from cart", e);
        });
    }
  };
};

export const GetPOrdersFromFirebase = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("pendingOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          dispatch({
            type: Get_P_ORDERS,
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
