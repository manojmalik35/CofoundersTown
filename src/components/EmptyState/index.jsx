import React from 'react';
import MyButton from '../MyButton'

// images
import emptyImg from '../../assets/empty.webp';
import { ROUTES } from '../../constants';

// Style
import "./styles.css";
import { Link } from 'react-router-dom';

const EmptyState = (props) => {
    const { title, description, publish } = props;

    return (
        <div className="empty-state-style">
            <img src={emptyImg} className="img-style" alt="empty_image" />
            <h3>{title}</h3>
            <p>{description}</p>
            {publish &&
                <Link to={ROUTES.PUBLISHARTICLE}>
                    <MyButton
                        btnText="Publish an article"
                    />
                </Link>
            }
        </div>
    );
}

export default EmptyState;
