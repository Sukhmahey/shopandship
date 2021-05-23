import { GET_ALL_PRODUCTS } from "../actions/ProductActions";
const initialState = {
  allProducts: [],
};

const ProductReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_PRODUCTS:
      const obj = actions.payload;
      return {
        allProducts: obj,
      };

    default:
      return state;
  }
};

export default ProductReducer;
