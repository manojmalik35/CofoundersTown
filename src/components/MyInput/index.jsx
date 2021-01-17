import React from "react";
import { Input } from "antd";
import './styles.css';

const MyInput = (props) => {

    return (
        <div className="input-section">
            <Input
                type={props.type}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
                className="input-primary"
            />
            <span className="text-danger">{props.errorText}</span>
        </div>
    );
}

export default MyInput;
