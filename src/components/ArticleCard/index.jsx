import React from 'react'
import { Card } from "antd";
import { ROUTES } from "../../constants";
import { Link } from 'react-router-dom';
import { truncate } from "../../helpers";

import './style.css'

const ArticleCard = (props) => {
    const { article, index } = props
    return (
        <div className="article" key={index}>
            <Link to={ROUTES.VIEWARTICLE.replace(":id", article?.id)}>
                <Card title={article?.title} hoverable={true}>
                    <span className="card-subheading">Description : </span>
                    <div>{truncate(article?.description)}</div>
                    <span className="card-subheading">Body : </span>
                    <div>{truncate(article?.body)}</div>
                </Card>
            </Link>
        </div>
    )
}

export default ArticleCard;