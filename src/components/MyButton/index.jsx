import React from "react";
import { Button } from "antd";

const MyButton = (props) => {

    return (
        <div className="button-section">
            <Button
                type={props.type}
                shape={props.shape}
                onClick={props.onClick}
                className={props.className}
                danger={props.danger}
            >
                {props.btnText}
            </Button>
        </div>
    );
}

export default MyButton;
