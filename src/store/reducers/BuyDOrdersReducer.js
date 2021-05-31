import { Get_D_ORDERS } from "../actions/BuyDOrdersActions";

const initialState = {
  deliveredOrders: [],
};

const BuyDOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Get_D_ORDERS:
      const AProdIndex = state.deliveredOrders.findIndex(
        (aProd) => aProd.productId === actions.payload.productId
      );

      if (AProdIndex < 0) {
        const AObj = [...state.deliveredOrders];
        AObj.push(actions.payload);
        return { ...state, deliveredOrders: AObj };
      }

    default:
      return state;
  }
};

export default BuyDOrdersReducer;
