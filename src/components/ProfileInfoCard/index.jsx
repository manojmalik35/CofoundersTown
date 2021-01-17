import React from 'react';
import { Card, Col, Row } from "antd";
import { get } from 'lodash';
import './style.css'

const ProfileInfoCard = (props) => {

    const { user } = props;

    return (
        <div className="profile-info-section">
            <Card>
                <h3 className="card-heading">Profile Information: </h3>
                <Row gutter={[24, 32]}>
                    <Col span={8}>
                        <div className="info-box">
                            <div className="title">Email</div>
                            <p className="desciption">{get(user, "email") || "---"}</p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="info-box">
                            <div className="title">Name</div>
                            <p className="desciption">{get(user, "name") || "---"}</p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="info-box">
                            <div className="title"></div>
                            <p className="desciption">{get(user, "age") || "0"}</p>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ProfileInfoCard;
