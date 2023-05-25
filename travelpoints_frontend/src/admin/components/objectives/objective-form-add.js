import React from 'react';
import Button from "react-bootstrap/Button";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import * as API_USERS from "../../api/admin-api";
import APIResponseErrorMessage from "../../../commons/errorhandling/api-response-error-message";
import { FaStarOfLife } from 'react-icons/fa';
import validate from "../../../commons/validators/validators.js";


class ObjectiveFormAdd extends React.Component {
  constructor(props) {
    super(props);
    this.toggleForm = this.toggleForm.bind(this);
    this.reloadHandler = this.props.reloadHandler;

    this.state = {
      errorStatus: 0,
      error: null,
      formIsValid: false,
      formControls: {
        nume_obiectiv: {
          value: '',
          placeholder: 'Objective name...',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true
          }
        },
        locatie: {
          value: '',
          placeholder: 'Location...',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true
          }
        },
        categorie: {
          value: '',
          placeholder: 'Category...',
          valid: false,
          touched: false,
          validationRules: {
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
          placeholder: 'Entrance fee...',
          valid: false,
          touched: false,
          validationRules: {
            isNumber: true
          }
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleForm() {
    this.setState({ collapseForm: !this.state.collapseForm });
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

    this.setState({
      formControls: updatedControls,
      formIsValid: formValid
    });
  };

  addObjective(objective) {
    return API_USERS.postObjective(objective, (result, status, error) => {
      if (result !== null && (status === 200 || status === 201)) {
        console.log("Successfully inserted objective with id: " + result);
        this.reloadHandler();
        this.setState({ successMessage: "Objective added successfully." });
      } else {
        this.setState({
          errorStatus: status,
          error: error
        });
      }
    });
  }

  handleSubmit() {
    let objective = {
      nume_obiectiv: this.state.formControls.nume_obiectiv.value,
      locatie: this.state.formControls.locatie.value,
      categorie: this.state.formControls.categorie.value,
      descriere_text: this.state.formControls.descriere_text.value,
      pret_intrare: this.state.formControls.pret_intrare.value
    };

    let ok = true;
    if (this.state.formControls.pret_intrare.touched && !this.state.formControls.pret_intrare.valid) {
      ok = false;
    }

    this.state.formControls.formIsValid = this.state.formControls.nume_obiectiv.valid &&
      this.state.formControls.locatie.valid &&
      this.state.formControls.categorie.valid &&
      ok;

    if (!this.state.formControls.formIsValid) {
      alert("Nu s-au completat datele corespunzător");
    } else {
      console.log("add" + objective);
      this.addObjective(objective);
    }
  }

  render() {
    return (
      <div>
        <FormGroup id='nume_obiectiv'>
          <FaStarOfLife style={{ color: 'red', fontSize: '8px', marginBottom: '13px' }} />
          <Label for='numeObiectivField'> Objective name: </Label>
          <Input
            name='nume_obiectiv'
            id='numeObiectivField'
            placeholder={this.state.formControls.nume_obiectiv.placeholder}
            onChange={this.handleChange}
            defaultValue={this.state.formControls.nume_obiectiv.value}
            touched={this.state.formControls.nume_obiectiv.touched ? 1 : 0}
            required
          />
          {this.state.formControls.nume_obiectiv.touched && !this.state.formControls.nume_obiectiv.valid &&
            <div className='error-message-register'> * Numele obiectivului e obligatoriu </div>
          }
        </FormGroup>

        <FormGroup id='locatie'>
          <FaStarOfLife style={{ color: 'red', fontSize: '8px', marginBottom: '13px' }} />
          <Label for='locatieField'> Location: </Label>
          <Input
            name='locatie'
            id='locatieField'
            placeholder={this.state.formControls.locatie.placeholder}
            onChange={this.handleChange}
            defaultValue={this.state.formControls.locatie.value}
            touched={this.state.formControls.locatie.touched ? 1 : 0}
            required
          />
          {this.state.formControls.locatie.touched && !this.state.formControls.locatie.valid &&
            <div className='error-message-register'> * Locația obiectivului e obligatorie </div>
          }
        </FormGroup>

        <FormGroup id='categorie'>
          <FaStarOfLife style={{ color: 'red', fontSize: '8px', marginBottom: '13px' }} />
          <Label for='categorieField'> Category: </Label>
          <Input
            name='categorie'
            id='categorieField'
            placeholder={this.state.formControls.categorie.placeholder}
            onChange={this.handleChange}
            defaultValue={this.state.formControls.categorie.value}
            touched={this.state.formControls.categorie.touched ? 1 : 0}
            required
          />
          {this.state.formControls.categorie.touched && !this.state.formControls.categorie.valid &&
            <div className='error-message-register'> * Categoria obiectivului e obligatorie </div>
          }
        </FormGroup>

        <FormGroup id='descriere_text'>
          <Label for='descriere_textField'> Text description: </Label>
          <Input
            name='descriere_text'
            id='descriere_textField'
            placeholder={this.state.formControls.descriere_text.placeholder}
            onChange={this.handleChange}
            defaultValue={this.state.formControls.descriere_text.value}
            touched={this.state.formControls.descriere_text.touched ? 1 : 0}
          />
        </FormGroup>

        <FormGroup id='pret_intrare'>
          <Label for='pret_intrareField'> Entrance fee: </Label>
          <Input
            type='number'
            name='pret_intrare'
            id='pret_intrareField'
            placeholder={this.state.formControls.pret_intrare.placeholder}
            onChange={this.handleChange}
            defaultValue={this.state.formControls.pret_intrare.value}
            touched={this.state.formControls.pret_intrare.touched ? 1 : 0}
          />
          {this.state.formControls.pret_intrare.touched && !this.state.formControls.pret_intrare.valid &&
            <div className='error-message-register'> * Prețul de intrare trebuie să fie un număr valid </div>
          }
        </FormGroup>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Add Objective
        </Button>

        {this.state.successMessage &&
          <div className="success-message">{this.state.successMessage}</div>
        }

        {this.state.errorStatus > 0 &&
          <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />
        }
      </div>
    );
  }
}

export default ObjectiveFormAdd;
