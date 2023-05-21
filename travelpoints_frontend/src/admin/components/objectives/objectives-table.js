import React from "react";
import Table from "../../../commons/tables/table";
import * as API_USERS from "../../api/admin-api";
import APIResponseErrorMessage from "../../../commons/errorhandling/api-response-error-message";
import {
    Button
} from 'reactstrap';


const filters = [
    {
        accessor: 'Objectives',
    }
];

class ObjectivesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };

        this.columns = [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Objective name',
                accessor: 'nume_obiectiv',
            },
            {
                     Header: 'Text description',
                     accessor: 'descriere_text',
                },
                
             {
                      Header: 'Entrance fee',
                      accessor: 'pret_intrare',
                 },
            {
                Header: 'Location',
                accessor: 'locatie',
            },
            {
                Header: 'Category',
                accessor: 'categorie',
            },

               {
                Header: 'Update',
                Cell: row => (<Button color = "warning" onClick = {() => this.props.update(row.original)}> Update </Button>)
                },
             {
                 Header: 'Delete',
                 Cell: row => (<Button color = "danger" onClick = {() => this.props.deleteById(row.original)}> Delete </Button>)
               },
        ];
    }

    render() {
        return (
            <Table
              data={this.state.tableData}
              columns={this.columns}
              search={filters}
              pageSize={5}
            />
        );
      }
    }

export default ObjectivesTable;