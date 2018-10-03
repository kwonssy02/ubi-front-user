import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import dateformat from 'dateformat';

class VehicleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleList: []
        };
        this.temp = [];
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/com.autoever.ubi.asset.Vehicle")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // this.getVehicleData(data,(vehicleList) => {
            //     console.log(vehicleList)
            //     this.setState({vehicleList});
            // })
            let vehicleList = [];
            data.map((i,key) => {
                let vehicleTypeId = i.vehicleType.slice(i.vehicleType.indexOf('#')+1);
                fetch(process.env.REACT_APP_API_URL + "/com.autoever.ubi.asset.VehicleType/" + vehicleTypeId)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let vehicleId = i.vehicleId;
                    let vehicleType = data.vehicleName + ', ' + dateformat(data.releasedDate,'yyyy');
                    let ownershipType = i.ownershipType;
                    let color = i.color;
                    let vehicleData = { vehicleId, vehicleType, ownershipType, color };
                    this.pushStateData(vehicleData);
                });
            });
            
        });
    }

    pushStateData = (vehicleData)  => {
        console.log(vehicleData);
        this.setState(prevState => ({
            vehicleList: [...prevState.vehicleList, vehicleData]
        }));
    }

    // getVehicleData = (data, callback) => {
    //     let vehicleList = [];
    //     data.map((i,key) => {
    //         let vehicleTypeId = i.vehicleType.slice(i.vehicleType.indexOf('#')+1);
    //         fetch(process.env.REACT_APP_API_URL + "/com.autoever.ubi.asset.VehicleType/" + vehicleTypeId)
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             // let { vehicleData } = {
    //             //     i.vehicleId, 
    //             //     vehicleType: data.vehicleName + ',' + data.releasedDate,
    //             //     i.owner,
    //             //     i.ownerShip,
    //             //     i.color
    //             // };
    //             let vehicleId = i.vehicleId;
    //             let vehicleType = data.vehicleName + ',' + data.releasedDate;
    //             let ownershipType = i.ownershipType;
    //             let color = i.color;
    //             let vehicleData = { vehicleId, vehicleType, ownershipType, color };

    //             // vehicleList.push();
    //         });
    //     });
    //     callback(vehicleList);
    // }

    render() {
        const { vehicleList } = this.state;
        console.log(vehicleList);
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