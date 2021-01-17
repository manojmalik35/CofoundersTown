import { get } from "lodash";

export const validate = (data) => {
    let errorObj = {};
    if (!data.email) {
        errorObj.email = "Email is Required";
    }
    if (!data.password) {
        errorObj.password = "Password is Required";
    }

    if (Object.keys(errorObj).length) return errorObj;
    else return null;
};

export const parseError = (Error) => {
    const err = get(Error, "response.data.errors");
    let errorObj = {};

    if (err && err.email) {
        errorObj.email = get(err, "email");
    }
    if (err && err.password) {
        errorObj.password = get(err, "password");
    }

    if (Object.keys(errorObj).length) return errorObj;
    else return null;
};
