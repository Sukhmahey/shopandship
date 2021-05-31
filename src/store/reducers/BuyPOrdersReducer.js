import {
  Get_P_ORDERS,
  REMOVE_FROM_BUY_PORDERS,
} from "../actions/BuyPOrdersActions";

const initialState = {
  pendingOrders: [],
};

const BuyPOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Get_P_ORDERS:
      const PProdIndex = state.pendingOrders.findIndex(
        (pProd) => pProd.productId === actions.payload.productId
      );
      if (PProdIndex < 0) {
        const cartObj = [...state.pendingOrders];
        cartObj.push(actions.payload);
        return { ...state, pendingOrders: cartObj };
      }

    case REMOVE_FROM_BUY_PORDERS:
      const removeProdIndex = state.pendingOrders.findIndex(
        (prod) => prod.productId === actions.productId
      );
      if (removeProdIndex >= 0) {
        const removedCart = [...state.pendingOrders];
        removedCart.splice(removeProdIndex, 1);
        return { ...state, pendingOrders: removedCart };
      }

    default:
      return state;
  }
};

export default BuyPOrdersReducer;
