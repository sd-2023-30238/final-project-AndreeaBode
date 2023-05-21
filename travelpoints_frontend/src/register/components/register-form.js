import React from 'react'
import Button from "react-bootstrap/Button"
import * as API_USERS from "../api/register-api"
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message"
import LoginImg from '../../login.png';
import {Col, Row} from "reactstrap"
import { FormGroup, Input, Label} from 'reactstrap'
import style from './register-page.css'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import validate from "../../commons/validators/validators.js";


class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler; 

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                username: {
                    value: '',
                    placeholder: 'Complete with your username...',
                    valid: false,
                    touched: false,
                    validationRules: {
                           minLength: 3,
                           isRequired: true
                           }
                },
                password: {
                    value: '',
                    placeholder: 'Complete with your password...',
                    valid: false,
                    touched: false,
                    validationRules: {
                          isRequired: true,
                          minLength: 6
                          }
                },
                confirmpass: {
                     value: '',
                     placeholder: 'Confirm Password...',
                     valid: false,
                     touched: false,

                },
                email: {
                     value: '',
                     placeholder: 'Complete with your email...',
                     valid: false,
                     touched: false,
                     validationRules: {
                            emailValidator: true
                     }
                },
                role: {
                     value: '0'
                },
                status: {
                     value: '0'
                },
            }
        };

        this.handlePass = this.handlePass.bind(this);
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

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    handlePass = event => {
            const value = event.target.value;
            const name = event.target.name;
            const updatedControls = this.state.formControls;

            const updatedFormElement = updatedControls[name];
            updatedFormElement.value = value;
            updatedFormElement.touched = true;

            let formIsValid = true;
            formIsValid = this.state.formControls.password.value === value;

            this.setState({
                formControls: updatedControls,
                formIsValid: formIsValid
            });

        };

    registerUser(user) {
        return API_USERS.register(user, (result, status, error) => {
             if (result !== null && (status === 200 || status === 201)) {
                   console.log("Successfully register new user " + result);
                   alert("User added succesfully");
                   window.location.href="/login";
             } else {
                   this.setState(({
                        errorStatus: status,
                        error: error
                    }));
             }
        });
    }

    handleSubmit() {
        let user = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            email: this.state.formControls.email.value,
            role: this.state.formControls.role.value,
            status: "OFF"
        };
        console.log("here " + user.role);
        this.registerUser(user);
    }

    render() {
        return (
            <div className="registerPage">

               <Image
                            style={{ width:80, height: 80, marginLeft: 345 }}
                            src={LoginImg}
                            roundedCircle
                />

                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    
                </FormGroup>

                <FormGroup id='email'>
                    <Label for='emailField'> Email: </Label>
                    <Input name='email' id='emailField' type='email' placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                </FormGroup>

                <FormGroup className="register-input" id='role'>
                       <Label for='roleField'> Role: </Label>
                       <Input value={this.state.value} onChange={this.handleChange}  type="select" name="role" id="roleField" >
                            <option value="0">Choose role...</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>

                       </Input>
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' type='password' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                      <div className={"error-message-register"}> * Password must have at least 6 characters </div>}
                 </FormGroup>

                 <FormGroup className="register-input" id='confirmpass'>
                      <Label for='confirmpassField'> Confirm Password: </Label>
                      <Input type='password' name='confirmpass' id='confirmpassField'
                            placeholder={this.state.formControls.confirmpass.placeholder}
                            onChange={this.handlePass}
                            defaultValue={this.state.formControls.confirmpass.value}
                            touched={this.state.formControls.confirmpass.touched ? 1 : 0}
                            valid={this.state.formControls.confirmpass.valid}
                            required
                      />
                             {this.state.formControls.confirmpass.touched && !this.state.formIsValid &&
                             <div className={"error-message-register"}> * Passwords must match </div>}
                 </FormGroup>


                <div className="buttons">
                    <input
                          disabled={this.state.formControls.username.value === '' && this.state.formControls.password.value === ''}
                          className="buttons"
                          type='submit'
                          onClick={this.handleSubmit}
                          value='Register'/>
                </div>
               <div className="center">
                <Link to={"/login"}>
                    Back
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

export default RegisterForm;