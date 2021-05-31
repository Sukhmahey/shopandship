import { Get_P_ORDERS } from "../actions/BuyPOrdersActions";

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

    default:
      return state;
  }
};

export default BuyPOrdersReducer;
