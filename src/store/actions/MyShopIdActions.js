export const GET_MY_SHOPID = "shop_id";

export const GetMyShopId = (shopId) => {
  return async (dispatch) => {
    dispatch({
      type: GET_MY_SHOPID,
      shopId: shopId,
    });
  };
};
