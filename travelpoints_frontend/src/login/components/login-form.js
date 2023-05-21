import React from 'react'
import Button from "react-bootstrap/Button"
import * as API_USERS from "../api/login-api"
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message"
import LoginImg from '../../login.png';
import {Col, Row} from "reactstrap"
import { FormGroup, Input, Label} from 'reactstrap'
import style from './login-page.css'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom' 



class LoginForm extends React.Component {

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
                },
                password: {
                    value: '',
                    placeholder: 'Complete with your password...',
                    valid: false,
                    touched: false,
                },
                role: {
                    value: '0'
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

    loginUser(user) {
        return API_USERS.login(user, (result, status, error) => {
            console.log(result);
            if (result.role === "admin") {
             console.log(result);
                window.location.href = "/adminboard";

            }else if (result.role === "user") {
                window.location.href = "/touristboard";
                console.log(result);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
            console.log(result);
        });
    }

    handleSubmit() {
        let user = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            role: '0'
        };
        this.loginUser(user);
    }

    render() {
        return (
            <div className="loginPage">

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

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' type='password' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                </FormGroup>

                <div className="buttons">
                    <input
                          disabled={this.state.formControls.username.value === '' && this.state.formControls.password.value === ''}
                          className="buttons"
                          type='submit'
                          onClick={this.handleSubmit}
                          value='Login'/>
                </div>
                <div className="center">
                                <Link to={"./reset"}>
                                     Forgot your password?
                                </Link>
                                </div>
               <div className="center">
                    <Label > Already have an account? </Label>
                    <Link to={"/register"}>
                         Register
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

export default LoginForm;