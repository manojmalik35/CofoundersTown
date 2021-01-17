import { TYPES } from "./Constants";

export const login = (data) => (dispatch) => {
    dispatch({
        type: TYPES.USER_LOGIN,
        payload: data,
    });
};

export const logout = () => (dispatch) => {
    dispatch({
        type: TYPES.USER_LOGOUT,
    });
};
