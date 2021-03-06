import {
  Get_P_ORDERS,
  Get_A_ORDERS,
  CLEAR_AORDERS,
  REMOVE_FROM_BUY_AORDERS,
} from "../actions/BuyAOrdersActions";

const initialState = {
  acceptedOrders: [],
};

const BuyAOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Get_A_ORDERS:
      return { ...state, acceptedOrders: actions.payload };

    case REMOVE_FROM_BUY_AORDERS:
      const removeProdIndex = state.acceptedOrders.findIndex(
        (prod) => prod.productId === actions.productId
      );
      if (removeProdIndex >= 0) {
        const removedCart = [...state.acceptedOrders];
        removedCart.splice(removeProdIndex, 1);
        return { ...state, acceptedOrders: removedCart };
      }

    case CLEAR_AORDERS:
      return { acceptedOrders: [] };

    default:
      return state;
  }
};

export default BuyAOrdersReducer;
