import React from "react";
import { Input } from "antd";
import './style.css';

const {TextArea} = Input;

const MyTextArea = (props) => {

    return (
        <div className="input-section">
            <TextArea
                rows={props.rows}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
                className="textarea-primary"
            />
            <span className="text-danger">{props.errorText}</span>
        </div>
    );
}

export default MyTextArea;
