import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Loader from "../../components/Loader";
import { get } from "lodash";
import PageTitle from "../../components/PageTitle";
import ErrorModal from '../../components/ErrorModal'
import './style.css';

import * as DM from './dataManager'

class PublishArticle extends Component {
    constructor(props) {
        super(props);
        this.articleID = null;
        this.state = {
            isLoader: false,
            article: {},
            errorModal: undefined
        }
    }

    componentDidMount() {
        this.articleID = this.props.match.params.id;
        this.getArticle();
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

    getArticle = () => {
        this._startLoader();
        DM.getArticleService(this.articleID)
            .then(res => {
                this._stopLoader();
                this.setState({
                    article: res.data
                })
            })
            .catch(err => {
                this._stopLoader();
                this.setState({
                    errorModal: { title: "Error", description: get(err, "response.data.errors") }
                })
            })
    }

    render() {
        const { isLoader, errorModal, article } = this.state;

        return (
            <>
                <PageTitle title="Publish Article" />
                <div className="site-layout-content">
                    <Row className="row-container">
                        <Col>
                            <div className="heading-section">
                                <h1>{article.title}</h1>
                            </div>
                            <div className="description-section">
                                <h3>Description</h3>
                                <div className="description">{article.description}</div>
                            </div>
                            <div className="body-section">
                                <h3>Body</h3>
                                <div className="body">{article.body}</div>
                            </div>
                        </Col>
                    </Row>
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