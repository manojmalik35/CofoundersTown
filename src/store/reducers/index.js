import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducers from "./auth";
import articleReducers from './article';

import { combineReducers } from "redux";

const appReducer = combineReducers({
    auth: authReducers,
    articles: articleReducers
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root');
        state = undefined;
    }

    return appReducer(state, action)
}



/**
 * redux-persist config
 */
const persistConfig = {
    key: "root",
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
