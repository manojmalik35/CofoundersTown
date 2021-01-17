import { useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";
import EmptyState from "../EmptyState";
import MyButton from "../MyButton";
import PageTitle from "../PageTitle";

import './styles.css';

const ErrorComponent = (props) => {

    const history = useHistory();
    const { code, message } = props;

    return (
        <>
            <PageTitle title="Login" />
            <div className="site-layout-content">
                <EmptyState title={code} description={message} />
                <div className="back-btn">
                    <MyButton
                        type="primary"
                        shape="round"
                        btnText="Go back to home"
                        onClick={() => history.push(ROUTES.HOME)}
                    />
                </div>
            </div>
        </>
    )
}

export default ErrorComponent;