import {
  Get_P_ORDERS,
  Get_A_ORDERS,
  REMOVE_FROM_BUY_PORDERS,
  CLEAR_PORDERS,
} from "../actions/BuyPOrdersActions";

const initialState = {
  pendingOrders: [],
};

const BuyPOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Get_P_ORDERS:
      // const PProdIndex = state.pendingOrders.findIndex(
      //   (pProd) => pProd.productId === actions.payload.productId
      // );
      // if (PProdIndex < 0) {
      //   const cartObj = [...state.pendingOrders];
      //   cartObj.push(actions.payload);

      // }
      return { ...state, pendingOrders: actions.payload };

    case REMOVE_FROM_BUY_PORDERS:
      console.log("Remove from buy porder  called");
      const removeProdIndex = state.pendingOrders.findIndex(
        (prod) => prod.productId === actions.productId
      );
      if (removeProdIndex >= 0) {
        const removedCart = [...state.pendingOrders];
        removedCart.splice(removeProdIndex, 1);
        return { ...state, pendingOrders: removedCart };
      }
    case CLEAR_PORDERS:
      return { pendingOrders: [] };

    default:
      return state;
  }
};

export default BuyPOrdersReducer;
