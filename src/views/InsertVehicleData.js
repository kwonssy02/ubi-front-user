import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class InsertVehicleData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleId: '',
            occuredDate: '',
            speed: 0,
            angle: 0
        };
    }

    componentDidMount() {
        /*
        fetch(process.env.REACT_APP_API_URL + "/Vehicle")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                // vehicleList:data
            })
        });
        */
    }

    onClickSaveButton = () => {

        let params = {
            "vehicleId": this.state.vehicleId,
            "speed": this.state.speed,
            "angle": this.state.angle
        }

        fetch(process.env.REACT_APP_API_URL + "/insertVehicleData", {
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
        const { vehicleId, occuredDate, speed, angle } = this.state;
        return (
            <div>
                <h3>차량 데이터 등록</h3>
                <Form>
                    <FormGroup>
                        <Label for="vehicleId">Vehicle ID</Label>
                        <Input name="vehicleId" id="vehicleId" placeholder="" value={vehicleId} onChange={(event) => this.setState({vehicleId: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="speed">속도</Label>
                        <Input name="speed" id="speed" value={speed} onChange={(event) => this.setState({speed: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="angle">조향</Label>
                        <Input name="angle" id="angle" value={angle} onChange={(event) => this.setState({angle: event.target.value})}/>
                    </FormGroup>
                    
                    <Button onClick={this.onClickSaveButton}>저장</Button>
                </Form>
            </div>
        );
    }
}

export default InsertVehicleData;