import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const Get_C_ORDERS = "get_c_orders";

export const GetCOrdersFromFirebase = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("cancelledOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          console.log("Cancelled Orderssss", element._data.Bdata);
          const obj = {
            amount: element._data.Bdata.amount,
            productDescription: element._data.Bdata.productDescription,
            productId: element.id,
            productName: element._data.Bdata.productName,
            productPhoto: element._data.Bdata.productPhoto,
            productPrice: element._data.Bdata.productPrice,
            productUnit: element._data.Bdata.productUnit,
            shopId: element._data.Bdata.shopId,
            shopUid: element._data.Bdata.shopUid,
            uid: element._data.Bdata.uid,
          };
          dispatch({
            type: Get_C_ORDERS,
            payload: obj,
          });
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};
