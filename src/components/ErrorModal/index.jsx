import React from 'react';
import { Modal, Button } from 'antd';

// Style
import "./styles.css"

const ErrorModal = (props) => {

    const { isModalVisible, onClose } = props;

    return (
        <Modal visible={isModalVisible} centered footer={null} className="error-modal-style" closable={false}>
            <div className="error-modal">
                <h2 className="error-title">{props.title}</h2>
                <h4 className="error-description">{props.description}</h4>

                <div className="footer-section">
                    <Button onClick={onClose}>
                        Okay
                    </Button>
                </div>
            </div>
        </Modal>
    );

}

export default ErrorModal;
