import { Get_C_ORDERS } from "../actions/BuyCOrdersActions";

const initialState = {
  cancelledOrders: [],
};

const BuyCOrdersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Get_C_ORDERS:
      const CProdIndex = state.cancelledOrders.findIndex(
        (aProd) => aProd.productId === actions.payload.productId
      );

      if (CProdIndex < 0) {
        const AObj = [...state.cancelledOrders];
        AObj.push(actions.payload);
        return { ...state, cancelledOrders: AObj };
      }

    default:
      return state;
  }
};

export default BuyCOrdersReducer;
