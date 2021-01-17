import * as SERVICE from "./service";

export const getProfileService = async () => {
    return await SERVICE.getProfile()
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        })
}
