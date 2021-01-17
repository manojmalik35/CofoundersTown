import React, { useCallback } from 'react'
import { Layout, Menu } from "antd";
import { Link, useHistory, withRouter } from 'react-router-dom';
import { get } from 'lodash';

import { ROUTES } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../MyButton';

import { logout } from "../../containers/Login/actions";
const { Header } = Layout;

const MyHeader = (props) => {

    const auth = useSelector((state) => {
        return state?.auth;
    });

    const isLoggedIn = auth?.isAuthenticated;
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = useCallback(() => {
        dispatch(logout());
        history.push(ROUTES.HOME);
    }, [history, dispatch]);

    const pathname = get(props, "location.pathname");

    return (
        <Header>
            <Menu
                className="header"
                theme="dark"
                mode="horizontal"
            >
                {(isLoggedIn &&  pathname === ROUTES.DASHBOARD) &&
                    <Menu.Item key="publish">
                        <Link to={ROUTES.PUBLISHARTICLE}>
                            Publish Article
                        </Link>
                    </Menu.Item>
                }
                {(pathname !== ROUTES.HOME && pathname !== ROUTES.SIGNUP) &&
                    <Menu.Item key="home">
                        <Link to={ROUTES.HOME}>
                            Home
                        </Link>
                    </Menu.Item>
                }
                <Menu.Item key="login">
                    {(!isLoggedIn && pathname !== ROUTES.LOGIN) &&
                        <Link to={ROUTES.LOGIN}>
                            Login
                        </Link>
                    }
                    {isLoggedIn &&
                        <Link to={ROUTES.DASHBOARD}>
                            {get(auth, "user.data.name")}
                        </Link>
                    }
                </Menu.Item>
                {isLoggedIn &&
                    <Menu.Item key="logout">
                        <MyButton
                            danger={true}
                            type="primary"
                            size="large"
                            onClick={handleLogout}
                            shape="round"
                            btnText="Logout"
                        />
                    </Menu.Item>
                }
            </Menu>
        </Header>
    );
}

export default withRouter(MyHeader);
