import './App.css';
import React from 'react'
import { Layout } from "antd";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import Home from "./containers/Home";
import MyHeader from './components/MyHeader'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Dashboard from "./containers/Dashboard";
import PublishArticle from "./containers/PublishArticle";
import ReadArticle from "./containers/ReadArticle";
import ErrorComponent from "./components/ErrorComponent";
import ProtectedRoute from "./hoc/protectedRoute";

import { ROUTES } from './constants';

import persistStore from './store';

const { Content } = Layout;
const { store, persistor } = persistStore;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout className="main-container">
            <MyHeader />
            <Content className="main-content">
              <Switch>
                <Route exact path={ROUTES.HOME} component={Home} />
                <Route exact path={ROUTES.LOGIN} component={Login} />
                <Route exact path={ROUTES.SIGNUP} component={Signup} />
                <ProtectedRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
                <ProtectedRoute exact path={ROUTES.PUBLISHARTICLE} component={PublishArticle} />
                <ProtectedRoute exact path={ROUTES.VIEWARTICLE} component={ReadArticle} />
                <Route exact path={ROUTES.FORBIDDEN} render={
                  props => (<ErrorComponent {...props} code="403" message="You have to login to view this page." />)
                } />
                <Route path={ROUTES.HOME} render={
                  props => (<ErrorComponent {...props} code="404" message="Page not found" />)
                } />
              </Switch>
            </Content>
          </Layout>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
