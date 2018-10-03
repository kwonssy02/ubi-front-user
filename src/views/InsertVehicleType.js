import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
 
class InsertVehicleType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleType: '',
            vehicleName: '',
            releasedDate: moment()
        };
    }

    onChangeReleasedDate = (date) =>{
        this.setState({
            releasedDate: date
        });
    }

    onClickSaveButton = () => {

        let params = {
            "vehicleType": this.state.vehicleType,
            "vehicleName": this.state.vehicleName,
            "releasedDate": moment(this.state.releasedDate).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
        }

        fetch(process.env.REACT_APP_API_URL + "/insertVehicleType", {
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
            console.log(data);
            alert('Saved');
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    render() {
        const { vehicleType, vehicleName, releasedDate } = this.state;
        return (
            <div>
                <h3>차종 등록</h3>
                <Form>
                    <FormGroup>
                        <Label for="vehicleType">Vehicle Type</Label>
                        <Input name="vehicleType" id="vehicleType" placeholder="" value={vehicleType} onChange={(event) => this.setState({vehicleType: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="vehicleName">차명</Label>
                        <Input name="vehicleName" id="vehicleName" value={vehicleName} onChange={(event) => this.setState({vehicleName: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="releasedDate">출시일</Label>
                        <DatePicker
                            customInput={
                                <Input />
                            }
                            name="releasedDate" id="releasedDate"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            selected={releasedDate}
                            onChange={this.onChangeReleasedDate}
                            dateFormat="YYYY-MM-DD"
                            
                        />
                    </FormGroup>
                    
                    <Button onClick={this.onClickSaveButton}>저장</Button>
                </Form>
            </div>
        );
    }
}

export default InsertVehicleType;