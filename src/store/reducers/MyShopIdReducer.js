import { GET_MY_SHOPID } from "../actions/MyShopIdActions";

const initialState = {
  myShopId: [],
};

const MyShopIdReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_MY_SHOPID:
      return { myShopId: actions.shopId };
    default:
      return state;
  }
};

export default MyShopIdReducer;
