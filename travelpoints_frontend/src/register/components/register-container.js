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

import RegisterForm from "./register-form"; 
import * as API_USERS from "../api/register-api"
import style from './register-page.css'

class RegisterContainer extends React.Component {

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
            <div className="register-page">
                <Modal isOpen="true" className={this.props.className} size="lg"
                         aria-labelledby="contained-modal-title-vcenter"
                         centered
                       >

                    <ModalBody>
                        <RegisterForm/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}


export default RegisterContainer;