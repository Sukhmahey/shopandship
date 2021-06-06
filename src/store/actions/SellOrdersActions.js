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

export const AddToSellAcceptedOrders = (shopId, productId, buyUid) => {
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
        .get()
        .then((data) => {
          const obj = data._data;
          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("shops")
            .doc(shopId)
            .collection("AcceptedOrders")
            .doc(productId)
            .set({
              obj,
            })
            .then(() => {
              const Bdata = obj;
              firestore()
                .collection("users")
                .doc(`${buyUid}`)
                .collection("AcceptedOrders")
                .doc(productId)
                .set({
                  Bdata,
                })
                .then(() => {
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
                });
            });
        });
    }
  };
};
export const AddToSellCancelledOrders = (shopId, productId, buyUid) => {
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
        .get()
        .then((data) => {
          const obj = data._data;
          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("shops")
            .doc(shopId)
            .collection("cancelledOrders")
            .add({
              obj,
            })
            .then(() => {
              const Bdata = obj;
              firestore()
                .collection("users")
                .doc(`${buyUid}`)
                .collection("cancelledOrders")
                .add({
                  Bdata,
                })
                .then(() => {
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
                });
            });
        });
    }
  };
};

// const AddToBuyAcceptedOrders = (Buid, Bdata, shopId) => {
//   return async (dispatch) => {
//     const data = await getAsyncData();
//     if (data !== null) {
//       const uid = data.uid;

//     }
//   };
// };

// const RemoveFromSellPOrders = (shopId, productId) => {
//   return async (dispatch) => {
//     const data = await getAsyncData();
//     if (data !== null) {
//       const uid = data.uid;

//     }
//   };
// };
