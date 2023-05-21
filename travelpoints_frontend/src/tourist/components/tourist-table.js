import React from "react";
import Table from "../../commons/tables/table";


import {
    Button
} from 'reactstrap';
import * as API_USERS from "../../admin/api/admin-api";


const filters = [
    {
        accessor: 'Objectives',
    }
];

class TouristTable extends React.Component {

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
                Header: 'Comment',
                Cell: row => (<Button color = "warning"  onClick = {() => this.props.comment(row.original) } > Comment</Button>)

            },
            {
                Header: 'Wishlist',
                Cell: row => (<Button color = "danger" onClick = {() => this.props.wishlist(row.original)}> Add to wishlist</Button>)
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
        )
    }
}

export default TouristTable;
