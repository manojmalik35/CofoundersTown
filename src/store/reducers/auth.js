import { TYPES } from "../../containers/Login/Constants";

const reducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case TYPES.USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
