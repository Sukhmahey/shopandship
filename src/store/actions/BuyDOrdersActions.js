import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const Get_D_ORDERS = "get_d_orders";

export const GetDOrdersFromFirebase = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("deliveredOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          console.log("Delivered Orderssss", element._data.Bdata);
          dispatch({
            type: Get_D_ORDERS,
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
