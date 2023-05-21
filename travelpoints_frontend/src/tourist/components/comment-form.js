import React from 'react'
import Button from "react-bootstrap/Button"
import * as API_USERS from "../api/tourist-api"
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message"
import {Col, Row} from "reactstrap"
import { FormGroup, Input, Label} from 'reactstrap'

import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'



class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler; 

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,
            commentId: this.props.commentId,


            formControls: {
                descriere: {
                    value: '',
                    placeholder: 'Write a comment...',
                    valid: false,
                    touched: false,
                },

            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    commentUser(objective) {
        return API_USERS.comment(this.state.commentId,objective, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
            console.log("Your comment was added" + result);
            alert("Your comment was added");
            window.location.href="/touristboard";
            // this.reloadHandler();
        } else {
            this.setState(({
                errorStatus: status,
                error: error
            }));
        }

        });
    }


    handleSubmit() {
        let comm = {
            descriere: this.state.formControls.descriere.value
        };

        this.commentUser(comm);

    }

    render() {
        return (
            <div className="commentPage">



                <FormGroup id='descriere'>
                    <Label for='descriereField'> Comment: </Label>
                    <Input name='descriere' id='descriereField' style={{ height: "150px" }} placeholder={this.state.formControls.descriere.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.descriere.value}
                           touched={this.state.formControls.descriere.touched? 1 : 0}
                           valid={this.state.formControls.descriere.valid}
                           required
                    />
                </FormGroup>


                <div className="buttons">
                    <input
                        disabled={this.state.formControls.descriere.value === ''}
                        className="buttons"
                        type='submit'
                        onClick={this.handleSubmit}
                        value='Submit'/>
                </div>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }

            </div>
        ) ;
    }
}

export default CommentForm;