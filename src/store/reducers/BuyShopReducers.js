import {
  BUY_GET_ALL_SHOPS,
  GET_CART_FROM_FIREBASE,
  REMOVE_FROM_CART,
  UPDATE_CART_PRICE,
  UPDATE_TOTAL_CART_PRICE,
} from "../actions/BuyShopActions";
const initialState = {
  allProducts: [],
  cartProducts: [],
  cartPrice: [],
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

    case GET_CART_FROM_FIREBASE:
      const cartProdIndex = state.cartProducts.findIndex(
        (cartProd) => cartProd.productId === actions.payload.productId
      );
      if (cartProdIndex < 0) {
        const cartObj = [...state.cartProducts];
        cartObj.push(actions.payload);
        return { ...state, cartProducts: cartObj };
      }

    case REMOVE_FROM_CART:
      const removeProdIndex = state.cartProducts.findIndex(
        (prod) => prod.productId === actions.productId
      );
      if (removeProdIndex >= 0) {
        const removedCart = [...state.cartProducts];
        removedCart.splice(removeProdIndex, 1);
        return { ...state, cartProducts: removedCart };
      }

    case UPDATE_CART_PRICE:
      const cartPriceProdIndex = state.cartProducts.findIndex(
        (prod) => prod.productId === actions.productId
      );

      if (cartPriceProdIndex >= 0) {
        const newPrice = [...state.cartProducts];

        newPrice[cartPriceProdIndex].amount = actions.amount;
        return { ...state, cartProducts: newPrice };
      }

    case UPDATE_TOTAL_CART_PRICE:
      return { ...state, cartPrice: actions.amount };

    default:
      return state;
  }
};

export default BuyShopReducer;
