import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

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
          dispatch(AddToSellersPOrders(element._data));
          console.log("asasasas", element._data);
          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("pendingOrders")
            .doc(element.id)
            .set({
              uid: uid,
              shopUid: element.data.shopUid,
              shopId: element._data.shopId,
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
          amount: Pdata.amount,
        })
        .then(() => {
          console.log("Yupeeeee added");
        })
        .catch((e) => {
          console.log("error removing from cart", e);
        });
    }
  };
};
