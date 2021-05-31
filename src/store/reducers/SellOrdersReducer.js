import {
  GET_SP_ORDERS,
  REMOVE_FROM_SELL_PORDERS,
} from "../actions/SellOrdersActions";

const initialState = {
  sellPendingOrders: [],
};

const SellOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_SP_ORDERS:
      const PProdIndex = state.sellPendingOrders.findIndex(
        (pProd) => pProd.productId === actions.payload.productId
      );
      if (PProdIndex < 0) {
        const cartObj = [...state.sellPendingOrders];
        cartObj.push(actions.payload);
        return { ...state, sellPendingOrders: cartObj };
      }
    case REMOVE_FROM_SELL_PORDERS:
      const removeProdIndex = state.sellPendingOrders.findIndex(
        (prod) => prod.productId === actions.productId
      );
      if (removeProdIndex >= 0) {
        const removedCart = [...state.sellPendingOrders];
        removedCart.splice(removeProdIndex, 1);
        return { ...state, sellPendingOrders: removedCart };
      }

    default:
      return state;
  }
};

export default SellOrdersReducer;
