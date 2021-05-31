import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const GET_SP_ORDERS = "get_sp_orders";
export const REMOVE_FROM_SELL_PORDERS = "remove_sp_orders";

export const GetSellPOrdersFromFirebase = (shopId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("shops")
        .doc(shopId)
        .collection("pendingOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          dispatch({
            type: GET_SP_ORDERS,
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

export const AddToSellAcceptedOrders = (shopId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("shops")
        .doc(shopId)
        .collection("pendingOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          const obj = element._data;

          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("shops")
            .doc(shopId)
            .collection("AcceptedOrders")
            .doc(element._data.productId)
            .set({
              obj,
            })
            .then(() => {
              dispatch(AddToBuyAcceptedOrders(obj.uid, obj, shopId));
            });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

const AddToBuyAcceptedOrders = (Buid, Bdata, shopId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;

      firestore()
        .collection("users")
        .doc(`${Buid}`)
        .collection("AcceptedOrders")
        .doc(Bdata.productId)
        .set({
          Bdata,
        })
        .then(() => {
          dispatch(RemoveFromSellPOrders(shopId, Bdata.productId));
        });
    }
  };
};

const RemoveFromSellPOrders = (shopId, productId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;

      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("shops")
        .doc(shopId)
        .collection("pendingOrders")
        .doc(productId)
        .delete()
        .then(() => {
          dispatch({
            type: REMOVE_FROM_SELL_PORDERS,
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
