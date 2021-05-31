import {
  Get_P_ORDERS,
  Get_A_ORDERS,
  REMOVE_FROM_BUY_PORDERS,
} from "../actions/BuyAOrdersActions";

const initialState = {
  acceptedOrders: [],
};

const BuyAOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Get_A_ORDERS:
      const AProdIndex = state.acceptedOrders.findIndex(
        (aProd) => aProd.productId === actions.payload.productId
      );

      if (AProdIndex < 0) {
        const AObj = [...state.acceptedOrders];
        AObj.push(actions.payload);
        return { ...state, acceptedOrders: AObj };
      }

    default:
      return state;
  }
};

export default BuyAOrdersReducer;
