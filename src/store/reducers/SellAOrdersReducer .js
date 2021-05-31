import {
  GET_SA_ORDERS,
  REMOVE_FROM_SELL_AORDERS,
} from "../actions/SellAOrdersActions";

const initialState = {
  sellAcceptedOrders: [],
};

const SellAOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_SA_ORDERS:
      const PProdIndex = state.sellAcceptedOrders.findIndex(
        (pProd) => pProd.productId === actions.payload.productId
      );
      if (PProdIndex < 0) {
        const cartObj = [...state.sellAcceptedOrders];
        cartObj.push(actions.payload);
        return { ...state, sellAcceptedOrders: cartObj };
      }
    case REMOVE_FROM_SELL_AORDERS:
      const removeProdIndex = state.sellAcceptedOrders.findIndex(
        (prod) => prod.productId === actions.productId
      );
      if (removeProdIndex >= 0) {
        const removedCart = [...state.sellAcceptedOrders];
        removedCart.splice(removeProdIndex, 1);
        return { ...state, sellAcceptedOrders: removedCart };
      }

    default:
      return state;
  }
};

export default SellAOrdersReducer;
