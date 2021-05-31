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

export const AddToSellDeliveredOrders = (shopId) => {
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
          const obj = element._data.obj;

          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("shops")
            .doc(shopId)
            .collection("deliveredOrders")
            .doc(element._data.obj.productId)
            .set({
              obj,
            })
            .then(() => {
              dispatch(AddToBuyDeliveredOrders(obj.uid, obj, shopId));
            });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

const AddToBuyDeliveredOrders = (Buid, Bdata, shopId) => {
  return async (dispatch) => {
    console.log("bdata", Bdata);
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;

      firestore()
        .collection("users")
        .doc(Buid)
        .collection("deliveredOrders")
        .doc(Bdata.productId)
        .set({
          Bdata,
        })
        .then(() => {
          dispatch(RemoveFromSellAOrders(shopId, Bdata.productId));
        })
        .catch((e) => {
          console.log("error here", e);
        });
    }
  };
};

const RemoveFromSellAOrders = (shopId, productId) => {
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
        .delete()
        .then(() => {
          dispatch({
            type: REMOVE_FROM_SELL_AORDERS,
            productId: productId,
          });
          console.log("Removed From Pending Order");
        })
        .catch((e) => {
          console.log("error removing from cart", e);
        });
    }
  };
};
