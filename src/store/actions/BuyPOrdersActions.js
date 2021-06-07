import firestore from "@react-native-firebase/firestore";
import { getAsyncData } from "../../api/AsyncData";

export const Get_P_ORDERS = "get_p_orders";
export const Get_A_ORDERS = "get_a_orders";
export const REMOVE_FROM_BUY_PORDERS = "remove_p_orders";

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
          console.log("ShopUid", element._data.shopUid);
          dispatch(AddToSellersPOrders(element));
        });
      }

      function onError(error) {
        console.error(error);
      }
    }
  };
};

const AddToSellersPOrders = (element) => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;

      firestore()
        .collection("users")
        .doc(element._data.shopUid)
        .collection("shops")
        .doc(element._data.shopId)
        .collection("pendingOrders")
        .doc(element._data.productId)
        .set({
          uid: uid,
          shopUid: element._data.shopUid,
          shopId: element._data.shopId,
          productDescription: element._data.productDescription,
          productId: element._data.productId,
          productName: element._data.productName,
          productPhoto: element._data.productPhoto,
          productPrice: element._data.productPrice,
          productUnit: element._data.productUnit,
          amount: element._data.amount,
          buyersPhone: data.phone,
          buyersAddress: data.address,
          shopName: element._data.shopName,
          shopPhone: element._data.shopPhone,
          shopAddress: element._data.shopAddress,
        })

        .then(() => {
          firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection("pendingOrders")
            .doc(element.id)
            .set({
              uid: uid,
              shopUid: element._data.shopUid,
              shopId: element._data.shopId,
              productDescription: element._data.productDescription,
              productId: element._data.productId,
              productName: element._data.productName,
              productPhoto: element._data.productPhoto,
              productPrice: element._data.productPrice,
              productUnit: element._data.productUnit,
              amount: element._data.amount,
              shopName: element._data.shopName,
              shopPhone: element._data.shopPhone,
              shopAddress: element._data.shopAddress,
            })
            .then(() => {
              firestore()
                .collection("users")
                .doc(`${uid}`)
                .collection("cart")
                .doc(element.id)
                .delete()
                .then(() => {})
                .catch((e) => {
                  console.log("error removing from cart", e);
                });
            })
            .catch((e) => {
              console.log("error removing from cart", e);
            });
        })
        .catch((e) => {
          console.log("error removing from cart", e);
        });
    }
  };
};

export const GetPOrdersFromFirebase = () => {
  return async (dispatch) => {
    const data = await getAsyncData();
    if (data !== null) {
      const uid = data.uid;
      firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("pendingOrders")
        .onSnapshot(onResult, onError);

      function onResult(QuerySnapshot) {
        QuerySnapshot.forEach((element) => {
          dispatch({
            type: Get_P_ORDERS,
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

export const RemoveFromBuyPOrders = (productId) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_FROM_BUY_PORDERS,
      productId: productId,
    });
  };
};
