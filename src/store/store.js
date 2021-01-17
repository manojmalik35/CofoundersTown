import middlewares from "./middlewares";
import reducers from "./reducers";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Confguring a Store With Persistor
 */
const configureStore = () => {

    const reactEnhancers = composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(reducers, reactEnhancers);
    const persistor = persistStore(store);

    return { store, persistor };
};

export default configureStore();
