import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

class ManufacturerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manufacturerList: []
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/manufacturer")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                manufacturerList:data
            })
        });
    }

    render() {
        const { manufacturerList } = this.state;
        return (
            <div>
                <h3>제조사 조회</h3>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturerList.map((manufacturer, key) => {
                            return (
                                <tr key={key}>
                                    <td>{manufacturer.manufacturerId}</td>
                                    <td>{manufacturer.manufacturerName}</td>
                                    <td>{manufacturer.email}</td>
                                    <td>{manufacturer.phone}</td>
                                    <td>{manufacturer.companyName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ManufacturerList;