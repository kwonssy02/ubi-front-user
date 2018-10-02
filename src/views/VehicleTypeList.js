import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

class VehicleTypeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleTypeList: []
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/vehicleType")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                vehicleTypeList:data
            })
        });
    }

    render() {
        const { vehicleTypeList } = this.state;
        return (
            <div>
                <h3>차종 조회</h3>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Released Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleTypeList.map((vehicleType, key) => {
                            return (
                                <tr key={key}>
                                    <td>{vehicleType.vehicleTypeId}</td>
                                    <td>{vehicleType.vehicleName}</td>
                                    <td>{vehicleType.releasedDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default VehicleTypeList;