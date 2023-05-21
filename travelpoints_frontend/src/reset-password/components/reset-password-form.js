import React from 'react'
import Button from "react-bootstrap/Button"
import * as API_USERS from "../api/reset-password-api"
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message"
import LoginImg from '../../login.png';
import {Col, Row} from "reactstrap"
import { FormGroup, Input, Label} from 'reactstrap'
import style from './reset-password-page.css'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import validate from "../../commons/validators/validators.js"


class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler; 

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                email: {
                    value: '',
                    placeholder: 'Complete with your email...',
                    valid: false,
                    touched: false,
                    validationRules:{
                        emailValidator: true,
                        isRequired: true
                    }
                },
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Complete with your new password...',
                    valid: false,
                    touched: false,
                    validationRules:{
                        isRequired: true,
                        isStrong: true
                    }
                },

                confirmpass: {
                    value: '',
                    placeholder: 'Confirm Password...',
                    valid: false,
                    touched: false,
                }
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
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formValid = true;
        for (let updatedFormElementName in updatedControls) {
            formValid = updatedControls[updatedFormElementName].valid && formValid;
        }
        this.state.formControls.confirmpass.valid = this.state.formControls.password.value === this.state.formControls.confirmpass.value;
        this.setState({
            formControls: updatedControls,
            formIsValid: formValid
        });

    };

    resetUser(email,credential) {
        return API_USERS.resetPass(email,credential, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully changed the password " + result);
                alert("Successfully changed the password");
                window.location.href="/login";
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
        let credential = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value

        };
        let email = this.state.formControls.email.value;
        this.state.formControls.formIsValid = this.state.formControls.email.valid && this.state.formControls.username.valid &&
                                        this.state.formControls.password.valid && this.state.formControls.confirmpass.valid;
        if(!this.state.formControls.formIsValid){
            alert("Nu s-au completat datele corespunzator")
        }
        else{
        console.log(credential);
        this.resetUser(email,credential);
        }
    }

    render() {
        return (
            <div className="resetPasswordPage">

               <Image
                            style={{ width:80, height: 80, marginLeft: 345 }}
                            src={LoginImg}
                            roundedCircle
                />

                <FormGroup id='email'>
                    <Label for='email'> Email: </Label>
                    <Input name='email' id='emailField' placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           required
                           
                    />
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                             <div className={"error-message-register"}> * Enter a valid email!</div>}
                </FormGroup>
                <FormGroup  id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input  name='username' id='usernameField'
                           placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched ? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                             <div className={"error-message-register"}> * Username must be valid </div>}

                </FormGroup>

                <FormGroup  id='password'>
                    <Label for='passwordField'>New Password: </Label>
                    <Input type='password' name='password' id='passwordField'
                           placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched ? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                             <div className={"error-message-register"}> * Password must contain digit, lowercase, uppercase and special symbol </div>}
                </FormGroup>

                <FormGroup id='confirmpass'>
                    <Label for='confirmpassField'> Confirm Password: </Label>
                    <Input  type='password' name='confirmpass' id='confirmpassField'
                           placeholder={this.state.formControls.confirmpass.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.confirmpass.value}
                           touched={this.state.formControls.confirmpass.touched ? 1 : 0}
                           valid={this.state.formControls.confirmpass.valid}
                           required  
                    />
                            {this.state.formControls.confirmpass.touched && !this.state.formControls.confirmpass.valid &&
                            <div className={"error-message-register"}> * Passwords must match </div>}
                </FormGroup>
                <div className="buttons">
                    <input
                                            disabled={this.state.formControls.email.value === '' && this.state.formControls.password.value === ''&& this.state.formControls.confirmpass.value === ''}
                                            className="buttons"
                                            type='submit'
                                            onClick={this.handleSubmit}
                                            value='Reset Password'/>
                </div>
                <div className="center">
                                <Link to={"./login"}>
                                     Login
                                </Link>
                </div>
                    {
                        this.state.errorStatus > 0 &&
                        <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                    }

            </div>
        ) ;
    }
}

export default ResetPasswordForm;