import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col, Form, Button } from 'antd'
import MyInput from "../../components/MyInput";
import MyPassword from "../../components/MyPassword";
import Loader from "../../components/Loader";
import { get } from "lodash";
import PageTitle from "../../components/PageTitle";
import ErrorModal from '../../components/ErrorModal'
import './style.css';

import { login } from './actions'

import * as DM from './dataManager'
import { ROUTES } from '../../constants';

import { validate, parseError } from './parser'
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: false,
            errObj: null,
            email: "",
            password: "",
            errorModal: undefined
        }
    }

    _startLoader = () => {
        this.setState({ isLoader: true });
    };

    _stopLoader = () => {
        this.setState({ isLoader: false });
    };

    errorToggleModal = () => {
        this.setState({
            errorModal: this.state.errorModal ? null : {}
        })
    }

    handleLogin = () => {
        const { email, password } = this.state;

        const checkValidate = validate({ email, password });
        if (checkValidate) {
            this.setState({
                errObj: checkValidate,
                errorModal: { title: "Validation error occured!" }
            })
            return;
        }

        this._startLoader();
        DM.loginService(email, password)
            .then(res => {
                DM.setTokenToAPIInstanceService(res.token);
                const payload = {
                    data: res.data,
                    token: res.token
                }
                this.props.login(payload);
                this._stopLoader();
                this.props.history.push(ROUTES.DASHBOARD);
            })
            .catch(err => {
                this.setState({
                    errObj: parseError(err),
                    errorModal: { description: "Validation error occured!" }
                })
                this._stopLoader();
            })

    }

    render() {
        const { isLoader, errObj, errorModal } = this.state;

        return (
            <>
                <PageTitle title="Login" />
                <div className="site-layout-content">
                    <div className="login-form-container">
                        <Row className="row-container">
                            <Col>
                                <div className="form-section">
                                    <div className="heading-section">
                                        <h3 className="title3"> Login</h3>
                                    </div>
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                    >
                                        <div className="input-item">
                                            <p className="lable">Email</p>
                                            <MyInput
                                                type="text"
                                                placeholder="Enter your email"
                                                onChange={(val) => {
                                                    this.setState({ email: val });
                                                }}
                                                errorText={get(errObj, "email")}
                                            />
                                        </div>

                                        <div className="input-item">
                                            <p className="lable">Password</p>
                                            <MyPassword
                                                placeholder="Enter password"
                                                onChange={(val) => {
                                                    this.setState({ password: val });
                                                }}
                                                errorText={get(errObj, "password")}
                                            />
                                        </div>

                                        <Form.Item className="form-button">
                                            <Button
                                                type="primary"
                                                block
                                                onClick={this.handleLogin}
                                            >
                                                Login
                                            </Button>
                                        </Form.Item>

                                        <Link to={ROUTES.SIGNUP}>Don't have an account? Create one</Link>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                { isLoader && <Loader />}
                {errorModal &&
                    <ErrorModal
                        isModalVisible={errorModal}
                        onClose={this.errorToggleModal}
                        title={get(errorModal, "title")}
                        description={get(errorModal, "description")}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = store => {
    return store;
}

export default connect(mapStateToProps, {
    login
})(Login);