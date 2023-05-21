import React from 'react';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalTitle,
    ModalHeader,
    Row
} from 'reactstrap';

import ResetPasswordForm from "./reset-password-form"; 
import * as API_USERS from "../api/reset-password-api"
import style from './reset-password-page.css'

class ResetPasswordContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.reload = this.reload.bind(this);

        this.state = {
            selected: false,
            selectedDelete: false,
            selectedUpdate: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }


    toggleForm() {
        this.setState({selected: !this.state.selected});
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
    }


    render() {
        return (
            //<div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="reset-password-page">
                <Modal isOpen="true" className={this.props.className} size="lg"
                         aria-labelledby="contained-modal-title-vcenter"
                         centered
                       >

                    <ModalBody>
                        <ResetPasswordForm/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}


export default ResetPasswordContainer;