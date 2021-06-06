import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const GET_SA_ORDERS = "get_sa_orders";
export const REMOVE_FROM_SELL_AORDERS = "remove_sa_orders";

export const GetSellAOrdersFromFirebase = (shopId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("shops")
        .doc(shopId)
        .collection("AcceptedOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          console.log("A from firebase", element._data.obj);
          dispatch({
            type: GET_SA_ORDERS,
            payload: element._data.obj,
          });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

export const AddToSellDeliveredOrders = (shopId, productId, buyUid) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("shops")
        .doc(shopId)
        .collection("AcceptedOrders")
        .doc(productId)
        .get()
        .then((data) => {
          const obj = data._data.obj;
          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("shops")
            .doc(shopId)
            .collection("deliveredOrders")
            .add({
              obj,
            })
            .then(() => {
              const Bdata = obj;
              firestore()
                .collection("users")
                .doc(`${buyUid}`)
                .collection("deliveredOrders")
                .add({
                  Bdata,
                })
                .then(() => {
                  firestore()
                    .collection("users")
                    .doc(`${uid}`)
                    .collection("shops")
                    .doc(shopId)
                    .collection("AcceptedOrders")
                    .doc(productId)
                    .delete()
                    .then(() => {
                      dispatch({
                        type: REMOVE_FROM_SELL_AORDERS,
                        productId: productId,
                      });
                      console.log("Removed From Accepted Order");
                    })
                    .catch((e) => {
                      console.log("error removing from cart", e);
                    });
                });
            });
        });
    }
  };
};
