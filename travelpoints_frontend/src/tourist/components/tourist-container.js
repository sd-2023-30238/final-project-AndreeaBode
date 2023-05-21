import React from 'react';
import ReactDOM from 'react-dom';
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
import * as API_USERS from "../api/tourist-api"
import TouristTable from "../components/tourist-table";
import CommentForm from "../components/comment-form";
import ObjectiveFormUpdate from "../../admin/components/objectives/objective-form-update";
import ObjectiveFormAdd from "../../admin/components/objectives/objective-form-add";
import TouristPage from './tourist-page'

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

class TouristContainer extends React.Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleCommentObjective = this.toggleCommentObjective.bind(this);
        this.reload = this.reload.bind(this);


        this.state = {
            selected: false,
            selectedComment: false,
            collapseForm: false,
            selectedCommentObjective:false,

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
            isLoaded: false,
            selectedComment:false,
        });
        this.toggleForm();
        this.fetchObjectives();
    }


    toggleCommentObjective(params){
        if(!this.state.selectedCommentObjective) {
            this.setState({selectedCommentObjective: !this.state.selectedCommentObjective, commentId: params.id});
        }else{
            this.setState({selectedCommentObjective: !this.state.selectedCommentObjective});
        }
    }



    addWishlistObjective(objective) {

        API_USERS.addWishObjective(objective.id, (result, status, err)=>   {if(status===500){

            alert("Objective already exists in your wishlist");

        }
        else
        {
            alert("Added to your wishlist");
        }})

    }

    render() {
        return (
            <>
                <Header />
                <TouristPage />

                <div style={title}>

                    <Card>
                        <br/>
                        <br/>

                        <Row>
                            <Col sm={{size: '8', offset: 1}} >
                                {this.state.isLoaded && <TouristTable tableData = {this.state.tableData}  comment={this.toggleCommentObjective}
                                                                      wishlist={this.addWishlistObjective}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />   }
                            </Col>
                        </Row><br/>

                        <br/><br/>


                    </Card>


                    <Modal isOpen={this.state.selectedCommentObjective} toggle={this.toggleCommentObjective}
                           className={this.props.className} size="lg">
                        <ModalHeader toggle={this.toggleCommentObjective}> Comment </ModalHeader>
                        <ModalBody>
                            <CommentForm commentId = {this.state.commentId}/>
                        </ModalBody>
                    </Modal>




                </div>
            </>
        );
    }
}


export default TouristContainer
