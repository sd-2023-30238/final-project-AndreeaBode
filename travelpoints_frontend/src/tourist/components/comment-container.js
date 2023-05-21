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

import CommentForm from "./comment-form";
import style from './comment-page.css'
import ObjectivesTable from "../../admin/components/objectives/objectives-table";
import * as API_USERS from "../api/tourist-api";

const title = {
    width: '100%',
    height: '100%',
    background: '#e6e6e6',
    padding: '100px 30px 0 68px',
};

const headerCard = {
    background: '#40444B',
    color: 'white',
};
class CommentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.getObjectives = this.getObjectives.bind(this);
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

    componentDidMount() {
        this.fetchObjectives();
    }

    fetchObjectives() {
        return API_USERS.getObjectives((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
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
    getObjectives(objective){
        API_USERS.getObjectives(objective.id, (result, status, err) => this.reloadAfterDelete());
    }

    render() {
        return (
            //<div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={title}>
            <CardHeader style={headerCard}>
                    <strong >Objectives Management</strong>
                </CardHeader>
                <Card>
                    <br/>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <ObjectivesTable tableData = {this.state.tableData}  deleteById={this.getObjectivesId}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row><br/>

                    <Row className="justify-content-md-center">
                        <Col xs lg="2">
                            <Button color="info" onClick={this.toggleForm}>Add Objective</Button>
                        </Col>
                    </Row>
                    <br/><br/>


                </Card>
            </div>
        )

    }
}


export default CommentContainer;