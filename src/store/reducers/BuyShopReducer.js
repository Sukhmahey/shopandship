import {
  BUY_GET_ALL_SHOPS,
  GET_CART_FROM_FIREBASE,
  REMOVE_FROM_CART,
  UPDATE_CART_PRICE,
  UPDATE_TOTAL_CART_PRICE,
  CLEAR_SHOPS,
} from "../actions/BuyShopActions";
const initialState = {
  allProducts: [],
};

const BuyShopReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case BUY_GET_ALL_SHOPS:
      const buyProductIndex = state.allProducts.findIndex(
        (prod) => prod.productId === actions.productData.productId
      );
      if (buyProductIndex < 0) {
        const allobj = [...state.allProducts];
        allobj.push(actions.productData);
        return { ...state, allProducts: allobj };
      }

    case CLEAR_SHOPS:
      return { ...state, allProducts: [] };

    default:
      return state;
  }
};

export default BuyShopReducer;
