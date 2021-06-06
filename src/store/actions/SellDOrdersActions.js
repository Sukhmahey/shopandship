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
          const obj = {
            amount: element._data.obj.amount,
            productDescription: element._data.obj.productDescription,
            productId: element.id,
            productName: element._data.obj.productName,
            productPhoto: element._data.obj.productPhoto,
            productPrice: element._data.obj.productPrice,
            productUnit: element._data.obj.productUnit,
            shopId: element._data.obj.shopId,
            shopUid: element._data.obj.shopUid,
            uid: element._data.obj.uid,
            buyersPhone: element._data.obj.buyersPhone,
            buyersAddress: element._data.obj.buyersAddress,
          };
          dispatch({
            type: GET_SD_ORDERS,
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
