import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

class InsurerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            insurerList: []
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/InsuranceCompany")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                insurerList:data
            })
        });
    }

    render() {
        const { insurerList } = this.state;
        return (
            <div>
                <h3>보험사 조회</h3>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company Name</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insurerList.map((insurer, key) => {
                            return (
                                <tr key={key}>
                                    <td>{insurer.participantKey}</td>
                                    <td>{insurer.companyName}</td>
                                    <td>{insurer.name}</td>
                                    <td>{insurer.email}</td>
                                    <td>{insurer.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default InsurerList;