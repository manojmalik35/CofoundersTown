import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from "antd";
import { get } from "lodash";

import './home.css'
import MyButton from '../../components/MyButton';
import Loader from '../../components/Loader';
import { ROUTES } from '../../constants'

import * as DM from '../../common/dataManager';

import { getAllArticles } from '../../common/actions'
import PageTitle from '../../components/PageTitle';
import EmptyState from '../../components/EmptyState';
import ArticleCard from '../../components/ArticleCard'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: false,
            cardCol1: [],
            cardCol2: []
        }
    }

    componentDidMount() {
        this.getAllArticles();
    }

    _startLoader = () => {
        this.setState({ isLoader: true });
    };

    _stopLoader = () => {
        this.setState({ isLoader: false });
    };

    setArticles = () => {
        const articles = get(this.props, "articles.articles");
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

    getAllArticles = () => {
        this._startLoader();
        DM.getArticlesService()
            .then(res => {
                this.props.getAllArticles(res.data)
                this.setArticles();
                this._stopLoader();
            })
            .catch(err => {
                console.log(err);
                this._stopLoader();
            })
    }



    render() {

        const { isLoader, cardCol1, cardCol2 } = this.state;
        const isLoggedIn = get(this.props, "auth.isAuthenticated");


        return (
            <>
                <PageTitle title="Home" />
                <div className="site-layout-content">
                    <div className="home-heading">
                        <h1 className="main-heading">Welcome to Blogstar!</h1>
                        <div className="main-button">
                            <MyButton
                                className="btn"
                                type="primary"
                                size="large"
                                onClick={() => this.props.history.push(isLoggedIn ? ROUTES.PUBLISHARTICLE : ROUTES.LOGIN)}
                                btnText={isLoggedIn ? "Publish an article" : "Get Started"}
                            />
                        </div>
                    </div>
                    <div className="home-content">
                        <h2>Here are some of the articles that are available on our site</h2>
                        {!cardCol1.length ? <EmptyState title="Oops!" description="No articles found" publish={false} /> :
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
                    {isLoader && <Loader />}
                </div>
            </>
        );
    }
}

const mapStateToProps = store => {
    return store;
}

export default connect(mapStateToProps, {
    getAllArticles
})(Home);
