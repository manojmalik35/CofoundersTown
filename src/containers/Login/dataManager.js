import * as SERVICE from "./service";

export const setTokenToAPIInstanceService = (token) => {
    SERVICE.setTokenToAPIInstance(token);
};

export const getTokenToAPIInstanceService = async () => {
    return await SERVICE.getTokenToAPIInstance();
};

export const loginService = async (email, password) =>{
    return await SERVICE.login({email, password})
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        throw err;
    })
}
