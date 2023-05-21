import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Row} from "reactstrap";
import {FormGroup, Input, Label} from 'reactstrap';
import validate from "../../../commons/validators/validators";
import APIResponseErrorMessage from "../../../commons/errorhandling/api-response-error-message";
import * as API_USERS from "../../api/admin-api"
import { FaStarOfLife } from 'react-icons/fa';

const input_style = {
    lineHeight: 1.5,
    color: '#666666',
    display: 'block',
    width: '100%',
    background: '#e6e6e6',
    height: '50px',
    borderRadius: '25px',
    padding: '0 30px 0 68px',
};


const submit_style = {
    backgroundColor: "#FFC107",
    border:'none',
    outline:'none',
    color:'black',
    position: 'relative',
    left:'150px',

};

class ObjectiveFormUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.reloadHandler = this.props.reloadHandler;
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,
            updateId: this.props.updateId,

            formControls: {

                            nume_obiectiv: {
                                value: '',
                                placeholder: 'Objective name...',
                                valid: false,
                                touched: false,
                                validationRules:{
                                    isRequired: true
                                }
                            },
                            locatie: {
                                value: '',
                                placeholder: 'Location...',
                                valid: false,
                                touched: false,
                                validationRules:{
                                    isRequired: true
                                }
                            },
                            categorie: {
                                value: '',
                                placeholder: 'Category...',
                                valid: false,
                                touched: false,
                                validationRules:{
                                    isRequired: true
                                }
                            },
                            descriere_text: {
                                value: '',
                                placeholder: 'Text description...',
                                valid: true,
                                touched: false
                            },
                           
                            pret_intrare: {
                                value: '',
                                placeholder: 'Enhance fee...',
                                valid: true,
                                touched: false,
                                validationRules:{
                                    isNumber: true
                                }
                            },
                        }

        };
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

    handleSubmit() {
           let objective = {
            nume_obiectiv: this.state.formControls.nume_obiectiv.value,
            locatie: this.state.formControls.locatie.value,
            categorie: this.state.formControls.categorie.value,
            descriere_text: this.state.formControls.descriere_text.value,
            descriere_audio: this.state.formControls.descriere_audio.value,
            pret_intrare: this.state.formControls.pret_intrare.value,
            };

        let ok=true;
        if(this.state.formControls.pret_intrare.touched && !this.state.formControls.pret_intrare.valid){
            ok=false;
        }
        this.state.formControls.formIsValid=this.state.formControls.nume_obiectiv.valid&&this.state.formControls.locatie.valid&&
        this.state.formControls.categorie.valid && ok;
        if(!this.state.formControls.formIsValid){
            alert("Nu s-au completat datele corespunzator")
        }
        else{
            console.log("update " + objective);
            this.update(objective);
        }
    }


    update(objective){
        return API_USERS.updateObjective(this.state.updateId, objective, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Objective updated succesfully");
                this.reloadHandler()
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    render() {
        return (
            <div>

                <FormGroup id='nume_obiectiv'>
                                    <FaStarOfLife style={{color: 'red', fontSize: '8px', marginBottom: '13px'}} />
                                    <Label for='numeObiectivField'> Objective name: </Label>
                                    <Input name='nume_obiectiv' id='numeObiectivField' autoComplete="name" placeholder={this.state.formControls.nume_obiectiv.placeholder}
                                        onChange={this.handleChange}
                                        defaultValue={this.state.formControls.nume_obiectiv.value}
                                        touched={this.state.formControls.nume_obiectiv.touched ? 1 : 0}
                                        required
                                    />
                                     {this.state.formControls.nume_obiectiv.touched && !this.state.formControls.nume_obiectiv.valid &&
                                    <div className={"error-message-register"}> * Numele obiectivului e obligatoriu </div>
                                    }
                                </FormGroup>

                                <FormGroup id='locatie'>
                                    <FaStarOfLife style={{color: 'red', fontSize: '8px', marginBottom: '13px'}} />
                                    <Label for='locatieField'> Location: </Label>
                                    <Input name='locatie' id='locatieField' autoComplete="address-level1" placeholder={this.state.formControls.locatie.placeholder}
                                        onChange={this.handleChange}
                                        defaultValue={this.state.formControls.locatie.value}
                                        touched={this.state.formControls.locatie.touched ? 1 : 0}
                                        required
                                    />
                                    {this.state.formControls.locatie.touched && !this.state.formControls.locatie.valid &&
                                    <div className={"error-message-register"}> * Locatia obiectivului e obligatorie </div>
                                    }
                                    
                                </FormGroup>

                                 <FormGroup id='categorie'>
                                        <FaStarOfLife style={{color: 'red', fontSize: '8px', marginBottom: '13px'}} />
                                       <Label for='categorieField'> Category: </Label>
                                       <Input name='categorie' id='categorieField' placeholder={this.state.formControls.categorie.placeholder}
                                             onChange={this.handleChange}
                                             defaultValue={this.state.formControls.categorie.value}
                                             touched={this.state.formControls.categorie.touched ? 1 : 0}
                                             required
                                             />
                                        {this.state.formControls.categorie.touched && !this.state.formControls.categorie.valid &&
                                        <div className={"error-message-register"}> * Categoria obiectivului e obligatorie </div>
                                        }
                                 </FormGroup>

                                  <FormGroup id='descriere_text'>
                                        <Label for='descriere_textField'> Text description: </Label>
                                        <Input name='descriere_text' id='descriere_textField' placeholder={this.state.formControls.descriere_text.placeholder}
                                              onChange={this.handleChange}
                                              defaultValue={this.state.formControls.descriere_text.value}
                                              touched={this.state.formControls.descriere_text.touched ? 1 : 0}
                                        />
                                  </FormGroup>

                                   <FormGroup id='descriere_audio'>
                                        <Label for='descriere_audioField'> Audio description: </Label>
                                        <Input name='descriere_audio' id='descriere_audioField' placeholder={this.state.formControls.descriere_audio.placeholder}
                                              onChange={this.handleChange}
                                              defaultValue={this.state.formControls.descriere_audio.value}
                                              touched={this.state.formControls.descriere_audio.touched ? 1 : 0}
                                       />
                                   </FormGroup>

                                    <FormGroup id='pret_intrare'>
                                          <Label for='pret_intrareField'> Entrance fee: </Label>
                                          <Input name='pret_intrare' id='pret_intrareField' placeholder={this.state.formControls.pret_intrare.placeholder}
                                                onChange={this.handleChange}
                                                defaultValue={this.state.formControls.pret_intrare.value}
                                                touched={this.state.formControls.pret_intrare.touched ? 1 : 0}
                                          />
                                        {this.state.formControls.pret_intrare.touched && !this.state.formControls.pret_intrare.valid &&
                                        <div className={"error-message-register"}> * Pretul trebuie sa fie un numar </div>
                                        }
                                    </FormGroup>



                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button style={submit_style}  //disabled={!this.state.formIsValid}
                                onClick={this.handleSubmit}> Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        );
    }
}

export default ObjectiveFormUpdate;
