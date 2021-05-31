import { GET_SP_ORDERS } from "../actions/SellOrdersActions";

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
    default:
      return state;
  }
};

export default SellOrdersReducer;
