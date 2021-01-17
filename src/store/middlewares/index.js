import thunk from "redux-thunk";

/**
 * returns list of middlewares
 *
 * @return Array[]
 */

const configureMiddlewares = () => {
  const middlewares = [
    thunk
  ];
  return middlewares;
};

export default configureMiddlewares();
