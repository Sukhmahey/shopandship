import {
  GET_SC_ORDERS,
  REMOVE_FROM_SELL_AORDERS,
} from "../actions/SellCOrdersActions";

const initialState = {
  sellCancelledOrders: [],
};

const SellCOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_SC_ORDERS:
      const CProdIndex = state.sellCancelledOrders.findIndex(
        (pProd) => pProd.productId === actions.payload.productId
      );
      if (CProdIndex < 0) {
        const cartObj = [...state.sellCancelledOrders];
        cartObj.push(actions.payload);
        return { ...state, sellCancelledOrders: cartObj };
      }

    default:
      return state;
  }
};
export default SellCOrdersReducer;
