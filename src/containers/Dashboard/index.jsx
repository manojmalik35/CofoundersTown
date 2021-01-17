import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'antd'
import Loader from "../../components/Loader";
import { get } from "lodash";
import PageTitle from "../../components/PageTitle";
import ErrorModal from '../../components/ErrorModal'
import EmptyState from "../../components/EmptyState";
import ProfileInfoCard from "../../components/ProfileInfoCard";
import ArticleCard from "../../components/ArticleCard";
import './style.css';

import { login } from '../Login/actions'

import * as DM from './dataManager'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: false,
            errorModal: undefined,
            cardCol1: [],
            cardCol2: []
        }
    }

    componentDidMount() {
        this.getProfileData();
    }

    _startLoader = () => {
        this.setState({ isLoader: true });
    };

    _stopLoader = () => {
        this.setState({ isLoader: false });
    };

    setArticles = () => {
        const articles = get(this.props, "auth.user.data.articles");
        const cardCol1 = [], cardCol2 = [];
        if (articles && Array.isArray(articles) && articles.length) {
            articles.map((art, index) => {
                if (index % 2 === 0)
                    cardCol1.push(<ArticleCard article={art} index={index} />)
                else
                    cardCol2.push(<ArticleCard article={art} index={index} />)
                return null;
            })
            this.setState({ cardCol1, cardCol2 })
        }
    }

    errorToggleModal = () => {
        this.setState({
            errorModal: this.state.errorModal ? null : {}
        })
    }

    getProfileData = () => {
        this._startLoader();
        DM.getProfileService()
            .then(res => {
                const token = get(this.props, "auth.user.token")
                const payload = {
                    data: res.data,
                    token: token
                }
                this.props.login(payload);
                this.setArticles();
                this._stopLoader();
            }).catch(err => {
                this.setState({
                    errorModal: { description: get(err, "response.data.errors") }
                })
                this._stopLoader();
            })
    }

    render() {
        const { isLoader, errorModal, cardCol1, cardCol2 } = this.state;
        const user = get(this.props, "auth.user.data");

        return (
            <>
                <PageTitle title="Dashboard" />
                <div className="site-layout-content">
                    <ProfileInfoCard user={user} />
                    <h2 className="heading">Here are the articles published by you</h2>
                    {!cardCol1.length ? <EmptyState title="Oops!" description="No articles found" publish={true} /> :
                        <div className="article-container">
                            <Row gutter={[32]} className="article-row">
                                <Col span={12}>
                                    {cardCol1}
                                </Col>

                                {cardCol2.length > 0 &&
                                    <Col span={12}>
                                        {cardCol2}
                                    </Col>
                                }
                            </Row>
                        </div>
                    }
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
})(Dashboard);