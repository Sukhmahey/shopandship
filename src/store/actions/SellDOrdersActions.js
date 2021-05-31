import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const GET_SD_ORDERS = "get_sd_orders";

export const GetSellDOrdersFromFirebase = (shopId) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("shops")
        .doc(shopId)
        .collection("deliveredOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          console.log("A from firebase", element._data.obj);
          dispatch({
            type: GET_SD_ORDERS,
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
