import React from "react";
import { Modal } from "react-bootstrap";
import Portal from "./portal";

interface ErrorModalProps { 
    error: string;
    onClick : () => void;
}

function ErrorModal({ error, onClick }: ErrorModalProps) {

    return (
        <Portal id="error-modal">
            <Modal show={true} onHide={onClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Error occured</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
            </Modal>
        </Portal>
    );
}

export default ErrorModal;