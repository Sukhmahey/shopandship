import {
  GET_SD_ORDERS,
  REMOVE_FROM_SELL_AORDERS,
} from "../actions/SellDOrdersActions";

const initialState = {
  sellDeliveredOrders: [],
};

const SellDOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_SD_ORDERS:
      const PProdIndex = state.sellDeliveredOrders.findIndex(
        (pProd) => pProd.productId === actions.payload.productId
      );
      if (PProdIndex < 0) {
        const cartObj = [...state.sellDeliveredOrders];
        cartObj.push(actions.payload);
        return { ...state, sellDeliveredOrders: cartObj };
      }

    default:
      return state;
  }
};
export default SellDOrdersReducer;
