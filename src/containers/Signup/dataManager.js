import * as SERVICE from "./service";

export const setTokenToAPIInstanceService = (token) => {
    SERVICE.setTokenToAPIInstance(token);
};

export const signupService = async (payload) => {
    return await SERVICE.signup(payload)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        })
}
