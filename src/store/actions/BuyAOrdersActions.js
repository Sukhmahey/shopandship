import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const Get_P_ORDERS = "get_p_orders";
export const Get_A_ORDERS = "get_a_orders";
export const REMOVE_FROM_BUY_AORDERS = "remove_p_orders";

export const GetAOrdersFromFirebase = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("AcceptedOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          console.log("Accepted Orderssss", element._data.Bdata);
          dispatch({
            type: Get_A_ORDERS,
            payload: element._data.Bdata,
          });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

export const RemoveFromBuyAOrders = (productId, buyUid) => {
  return async (dispatch) => {
    firestore()
      .collection("users")
      .doc(`${buyUid}`)
      .collection("AcceptedOrders")
      .doc(productId)
      .delete()
      .then(() => {
        dispatch({
          type: REMOVE_FROM_BUY_AORDERS,
          productId: productId,
        });
        console.log("Removed From Pending Order");
      })
      .catch((e) => {
        console.log("error removing from cart", e);
      });
  };
};
