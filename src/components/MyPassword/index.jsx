import React from "react";
import { Input } from "antd";
import './styles.css';

const MyPassword = (props) => {

    return (
        <div className="input-section">
            <Input.Password
                placeholder={props.placeholder}
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
            />
            <span className="text-danger">{props.errorText}</span>
        </div>
    );
}

export default MyPassword;
