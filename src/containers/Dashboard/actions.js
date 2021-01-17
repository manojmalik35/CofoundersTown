import { TYPES } from "./Constants";

export const getProfile = (data) => (dispatch) => {
    dispatch({
        type: TYPES.GET_PROFILE,
        payload: data,
    });
};
