import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'antd'
import MyInput from "../../components/MyInput";
import MyTextArea from "../../components/MyTextArea";
import Loader from "../../components/Loader";
import { get } from "lodash";
import PageTitle from "../../components/PageTitle";
import ErrorModal from '../../components/ErrorModal'
import './style.css';

import * as DM from './dataManager'
import { ROUTES } from '../../constants';

import { validate, parseError } from './parser'

class PublishArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: false,
            errObj: null,
            payload: {
                title: "",
                description: "",
                body: "",
                tags: []
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
        const success = get(this.state.errorModal, "success");
        this.setState({
            errorModal: this.state.errorModal ? null : {}
        }, () => {
            if (success) {
                this.props.history.push(ROUTES.DASHBOARD);
            }
        })
    }

    publishArticle = () => {
        const { payload } = this.state;

        const checkValidate = validate(payload);
        if (checkValidate) {
            this.setState({
                errObj: checkValidate,
                errorModal: { title : "Error!", description: "Validation error occured!" }
            })
            return;
        }

        this._startLoader();
        DM.publishArticleService(payload)
            .then(res => {
                this._stopLoader();
                this.setState({
                    errObj: null,
                    errorModal: { title: "Success", description: "Article published successfully!", success: true }
                })
            })
            .catch(err => {
                this.setState({
                    errObj: parseError(err),
                    errorModal: { title: "Error!", description: "Validation error occured!" }
                })
                this._stopLoader();
            })

    }

    render() {
        const { isLoader, errObj, errorModal } = this.state;

        return (
            <>
                <PageTitle title="Publish Article" />
                <div className="site-layout-content">
                    <div className="login-form-container">
                        <Row className="row-container">
                            <Col>
                                <div className="form-section">
                                    <div className="heading-section">
                                        <h3 className="title3"> Publish Article</h3>
                                    </div>
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                    >
                                        <div className="input-item">
                                            <p className="lable">Title</p>
                                            <MyInput
                                                type="text"
                                                placeholder="Enter title of the article"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "title")
                                                }}
                                                errorText={get(errObj, "title")}
                                            />
                                        </div>

                                        <div className="input-item">
                                            <p className="lable">Description</p>
                                            <MyTextArea
                                                rows={2}
                                                placeholder="Enter article description"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "description")
                                                }}
                                                errorText={get(errObj, "description")}
                                            />
                                        </div>

                                        <div className="input-item">
                                            <p className="lable">Body</p>
                                            <MyTextArea
                                                rows={20}
                                                placeholder="Enter article body"
                                                onChange={(val) => {
                                                    this.setStateValue(val, "body")
                                                }}
                                                errorText={get(errObj, "body")}
                                            />
                                        </div>

                                        <Form.Item className="form-button">
                                            <Button
                                                type="primary"
                                                block
                                                onClick={this.publishArticle}
                                            >
                                                Publish
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

export default PublishArticle;