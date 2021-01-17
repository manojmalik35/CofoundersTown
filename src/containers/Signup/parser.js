import { get } from "lodash";

export const validate = (data) => {
    let errorObj = {};
    if (!data.email) {
        errorObj.email = "Email is Required";
    }
    if (!data.password) {
        errorObj.password = "Password is Required";
    }
    if (!data.confirmPassword) {
        errorObj.confirmPassword = "Confirm Password is Required";
    }
    if (!data.name) {
        errorObj.name = "Name is Required";
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
    if (err && err.confirmPassword) {
        errorObj.confirmPassword = get(err, "confirmPassword");
    }
    if (err && err.name) {
        errorObj.name = get(err, "name");
    }
    if (err && err.age) {
        errorObj.age = get(err, "age");
    }

    if (Object.keys(errorObj).length) return errorObj;
    else return null;
};
