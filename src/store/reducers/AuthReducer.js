import { SIGNIN, SIGNOUT, GET_CURRENT_USER } from "../actions/AuthActions";
const initialState = {
  isSignedIn: false,
  name: "",
  email: "",
  phone: "",
  photo: "",
};

const AuthReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SIGNIN:
      const obj = actions.payload;
      return {
        ...state,
        isSignedIn: true,
        // name: obj.name,
        // email: obj.email,
        // phone: obj.phone,
        // photo: obj.photo,
      };
    case SIGNOUT:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;
