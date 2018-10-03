import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

class VehicleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleList: []
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/com.autoever.ubi.asset.Vehicle")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                vehicleList:data
            })
        });
    }

    render() {
        const { vehicleList } = this.state;
        return (
            <div>
                <h3>차량 조회</h3>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle Type</th>
                            <th>Owner</th>
                            <th>Ownership</th>
                            <th>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleList.map((vehicle, key) => {
                            return (
                                <tr key={key}>
                                    <td>{vehicle.vehicleId}</td>
                                    <td>{vehicle.vehicleType}</td>
                                    <td>{vehicle.owner === 'undefined' ? 'N/A': vehicle.owner}</td>
                                    <td>{vehicle.ownershipType}</td>
                                    <td>{vehicle.color}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default VehicleList;