import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
 
class InsertVehicle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleId: '',
            vehicleTypeOptions: [],
            vehicleType: '',
            owner: '',
            ownershipType: 'OWNED',
            color: ''
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/VehicleType")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                vehicleTypeOptions: data,
                vehicleType: data[0].vehicleType
            })
        });
    }

    onClickSaveButton = () => {
        let params = {
            vehicleId: this.state.vehicleId,
            vehicleType: this.state.vehicleType,
            owner: this.state.owner,
            ownershipType: this.state.ownershipType,
            color: this.state.color
        }

        fetch(process.env.REACT_APP_API_URL + "/insertVehicle", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            }else {
                console.log(response);
                throw new Error('Error Code ' + response.status + ': ' + response.statusText);
            }
        })
        .then((data) => {
            alert('Saved');
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    render() {
        const { vehicleTypeOptions, vehicleType, vehicleId, owner, ownershipType, color } = this.state;
        return (
            <div>
                <h3>차량 등록</h3>
                <Form>
                    <FormGroup>
                        <Label for="vehicleType">Vehicle Type</Label>
                        <Input type="select" name="vehicleType" id="vehicleType" value={vehicleType} onChange={(event) => this.setState({vehicleType: event.target.value})}>
                        {vehicleTypeOptions.map((vehicleTypeOption, key) => {
                            return (
                                <option value={vehicleTypeOption.vehicleType} key={key}>{vehicleTypeOption.vehicleName}</option>

                            );
                        })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="vehicleId">Vehicle ID</Label>
                        <Input name="vehicleId" id="vehicleId" value={vehicleId} onChange={(event) => this.setState({vehicleId: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="owner">소유자</Label>
                        <Input name="owner" id="owner" value={owner} onChange={(event) => this.setState({owner: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="ownershipType">소유권</Label>
                        <Input type="select" name="ownershipType" id="ownershipType" value={ownershipType} onChange={(event) => this.setState({ownershipType: event.target.value})}>
                            <option value="OWNED">자차</option>
                            <option value="LEASED">리스</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="color">색</Label>
                        <Input name="color" id="color" value={color} onChange={(event) => this.setState({color: event.target.value})}/>
                    </FormGroup>
                    
                    <Button onClick={this.onClickSaveButton}>저장</Button>
                </Form>
            </div>
        );
    }
}

export default InsertVehicle;