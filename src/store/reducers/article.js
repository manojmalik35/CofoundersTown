import { TYPES } from "../../common/Constants";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_ARTICLES:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
