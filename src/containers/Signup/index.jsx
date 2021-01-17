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

import { login } from '../Login/actions'

import * as DM from './dataManager'
import { ROUTES } from '../../constants';

import { validate, parseError } from './parser'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: false,
            errObj: null,
            payload: {
                email: "",
                password: "",
                name: "",
                confirmPassword: "",
                age: 0,
            },
            errorModal: undefined
        }
    }

    _startLoader = () => {
        this.setState({ isLoader: true });
    };

    _stopLoader = () => {
        this.setState({ isLoader: false });
    };

    setStateValue = (value, field) => {
        let state = this.state;
        state.payload[`${field}`] = value;
        this.setState(state);
    }

    errorToggleModal = () => {
        this.setState({
            errorModal: this.state.errorModal ? null : {}
        })
    }

    handleSignup = () => {
        const { payload } = this.state;

        const checkValidate = validate(payload);
        if (checkValidate) {
            this.setState({
                errObj: checkValidate,
                errorModal: { title: "Validation error occured!" }
            })
            return;
        }

        this._startLoader();
        DM.signupService(payload)
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
                <PageTitle title="Signnup" />
                <div className="site-layout-content">
                    <div className="login-form-container">
                        <Row className="row-container">
                            <Col>
                                <div className="form-section">
                                    <div className="heading-section">
                                        <h3 className="title3"> Signup</h3>
                                    </div>
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                    >
                                        <div className="input-item">
                                            <p className="lable">Name</p>
                                            <MyInput
                                                type="text"
                                                placeholder="Enter your name"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "name")
                                                }}
                                                errorText={get(errObj, "name")}
                                            />
                                        </div>

                                        <div className="input-item">
                                            <p className="lable">Email</p>
                                            <MyInput
                                                type="text"
                                                placeholder="Enter your email"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "email")
                                                }}
                                                errorText={get(errObj, "email")}
                                            />
                                        </div>

                                        <div className="input-item">
                                            <p className="lable">Password</p>
                                            <MyPassword
                                                placeholder="Enter password"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "password")
                                                }}
                                                errorText={get(errObj, "password")}
                                            />
                                        </div>

                                        <div className="input-item">
                                            <p className="lable">Confirm Password</p>
                                            <MyPassword
                                                placeholder="Confirm your password"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "confirmPassword")
                                                }}
                                                errorText={get(errObj, "confirmPassword")}
                                            />
                                        </div>

                                        <div className="input-item">
                                            <p className="lable">Age</p>
                                            <MyInput
                                                type="text"
                                                placeholder="Enter your age"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "age")
                                                }}
                                                errorText={get(errObj, "age")}
                                            />
                                        </div>

                                        <Form.Item className="form-button">
                                            <Button
                                                type="primary"
                                                block
                                                onClick={this.handleSignup}
                                            >
                                                Signup
                                            </Button>
                                        </Form.Item>
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
})(Signup);