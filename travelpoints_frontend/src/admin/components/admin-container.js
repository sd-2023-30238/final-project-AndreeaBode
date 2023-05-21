import React from 'react';
import ReactDOM from 'react-dom';
import CanvasJSReact from '../../canvasjs.min';
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import Header from './header';
import * as API_USERS from "../api/admin-api"
import ObjectiveFormAdd from "../components/objectives/objective-form-add";
import ObjectiveFormUpdate from "../components/objectives/objective-form-update";
import ObjectivesTable from "../components/objectives/objectives-table";


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

const divGraphic = {
    padding: '100px 30px 0 68px',
    width: '100%',
    height: '100%',
     background: '#e6e6e6',
};

const divGraphic1 = {
    height: '20px',
    background: '#e6e6e6',
};

const objectiveGraphic = {
    width: '50%',
    height: '200px',
    textAlign: 'center',
    alignItems: 'center',
    padding: '80px 30px 0 30px',
    justifyContent: 'center',
};

class AdminContainer extends React.Component {
   constructor(props) {
          super(props);
          this.toggleForm = this.toggleForm.bind(this);
          this.reload = this.reload.bind(this);
          this.toggleUpdateObjective = this.toggleUpdateObjective.bind(this);
           this.reloadAfterUpdateObjective=this.reloadAfterUpdateObjective.bind(this);
          this.deleteObjective = this.deleteObjective.bind(this);
          this.reloadAfterDelete = this.reloadAfterDelete.bind(this);
          this.state = {
              selected: false,
              selectedUpdate: false,
              selectedUpdateObjective:false,

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
          this.fetchObjectives();
      }

        reloadAfterUpdateObjective(){
               this.setState({
                   isLoaded: false
               });
               this.toggleUpdateObjective();
               this.fetchObjectives();
           }



        toggleUpdateObjective(params){
                if(!this.state.selectedUpdateObjective) {
                    this.setState({selectedUpdateObjective: !this.state.selectedUpdateObjective, updateId: params.id});
                }else{
                    this.setState({selectedUpdateObjective: !this.state.selectedUpdateObjective});
                }
            }

         reloadAfterDelete(){
                   this.setState({
                       isLoaded: false
                   });
                   this.fetchObjectives();
              }

         deleteObjective(objective){
              API_USERS.deleteObjective(objective.id, (result, status, err) => this.reloadAfterDelete())
          }



  render() {
    return (
     <>
        <Header />

         <div style={title}>
                        <CardHeader style={headerCard}>
                            <strong >Objectives Management</strong>
                        </CardHeader>
                        <Card>
                            <br/>
                            <br/>
                            <Row>
                                <Col sm={{size: '8', offset: 1}}>
                                    {this.state.isLoaded && <ObjectivesTable tableData = {this.state.tableData}  deleteById={this.deleteObjective}
                                        update={this.toggleUpdateObjective}/>}
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

                        <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                               className={this.props.className} size="lg">
                            <ModalHeader toggle={this.toggleForm}> Add Objective: </ModalHeader>
                            <ModalBody>
                                <ObjectiveFormAdd reloadHandler={this.reload}/>
                            </ModalBody>
                        </Modal>

                           <Modal isOpen={this.state.selectedUpdateObjective} toggle={this.toggleUpdateObjective}
                                               className={this.props.className} size="lg">
                                            <ModalHeader toggle={this.toggleUpdateObjective}> Update Objective: </ModalHeader>
                                            <ModalBody>
                                                <ObjectiveFormUpdate updateId = {this.state.updateId} reloadHandler={this.reloadAfterUpdateObjective}/>
                                            </ModalBody>
                                        </Modal>

              </div>

           
        </>
    );
  }
}


export default AdminContainer