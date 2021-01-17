import { get } from "lodash";

export const validate = (data) => {
    let errorObj = {};
    if (!data.title) {
        errorObj.title = "Title is Required";
    }
    if (!data.description) {
        errorObj.description = "Description is Required";
    }
    if (!data.body) {
        errorObj.body = "Body is Required";
    }

    if (Object.keys(errorObj).length) return errorObj;
    else return null;
};

export const parseError = (Error) => {
    const err = get(Error, "response.data.errors");
    let errorObj = {};

    if (err && err.title) {
        errorObj.title = get(err, "title");
    }
    if (err && err.description) {
        errorObj.description = get(err, "description");
    }
    if (err && err.body) {
        errorObj.body = get(err, "body");
    }
    if (err && err.tags) {
        errorObj.tags = get(err, "tags");
    }
    
    if (Object.keys(errorObj).length) return errorObj;
    else return null;
};
