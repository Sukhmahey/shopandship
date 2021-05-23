import { GET_ALL_SHOPS } from "../actions/ShopActions";
const initialState = {
  allShops: [],
};

const ShopReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_SHOPS:
      const obj = actions.payload;
      return {
        allShops: obj,
      };

    default:
      return state;
  }
};

export default ShopReducer;
