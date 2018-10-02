import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';

class DriveDataList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            driveDataList: []
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/driveData")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                driveDataList:data
            })
        });
    }

    render() {
        const { driveDataList } = this.state;
        return (
            <div>
                <h3>주행데이터 조회</h3>
                <br/>
                <InputGroup>
                    <Input />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary">검색</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle</th>
                            <th>Occured Date</th>
                            <th>Speed</th>
                            <th>Angle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driveDataList.map((driveData, key) => {
                            return (
                                <tr key={key}>
                                    <td>{driveData.vehicleId}</td>
                                    <td>{driveData.vehicleType}</td>
                                    <td>{driveData.owner}</td>
                                    <td>{driveData.ownershipType}</td>
                                    <td>{driveData.color}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default DriveDataList;