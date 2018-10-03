import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/com.autoever.ubi.participant.User")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                userList:data
            })
        });
    }

    render() {
        const { userList } = this.state;
        return (
            <div>
                <h3>사용자 조회</h3>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, key) => {
                            return (
                                <tr key={key}>
                                    <td>{user.participantKey}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UserList;