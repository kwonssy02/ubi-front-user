import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import _ from 'lodash';
import moment from 'moment';

class updateDataProvidingAgreement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: 'lim',
            agreementContent: '자료제공에 동의합니다.',
            radioAgree: 'disagree',
            vehicleId: '',

            ownVehicleOptions: [],
            vehicleTypes: []
        };
    }

    componentDidMount() {
        // 모든 차종 데이터 조회
        fetch(process.env.REACT_APP_API_URL + "/VehicleType")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                vehicleTypes: data
            }, () => {
                
                
                // 유저가 소유한 차량 조회
                let participantKey = encodeURIComponent("resource:com.autoever.ubi.participant.User#" + this.state.userId);
                fetch(process.env.REACT_APP_API_URL + "/queries/UserVehicles" + "?participantKey=" + participantKey)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    data = data.map((vehicle) => {
                        let vehicleType = vehicle.vehicleType.slice(vehicle.vehicleType.indexOf('#')+1);
                        let foundVehicleType = _.find(this.state.vehicleTypes, {vehicleType: vehicleType});
                        vehicle.vehicleName = foundVehicleType.vehicleName + ', ' + moment(foundVehicleType.releasedDate).format('YYYY');
                        return vehicle;
                    })

                    this.setState({
                        ownVehicleOptions: data,
                        vehicleId: data[0].vehicleId
                    })
                });
            })
        });
    }

    onClickSaveButton = () => {

        if(this.state.radioAgree === 'disagree') {
            return;
        }

        let params = {
            participantKey: this.state.userId,
            vehicleId: this.state.vehicleId
        }

        fetch(process.env.REACT_APP_API_URL + "/updateDataProvidingAgreement", {
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
        const { agreementContent, userId, radioAgree, vehicleId, ownVehicleOptions } = this.state;
        return (
            <div>
                <h3>보험사 정보 제공 동의</h3>
                <Form>
                    <FormGroup>
                        <Label for="userId">소유자</Label>
                        <Input name="userId" id="userId" value={userId} readOnly/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="vehicleId">소유 차량</Label>
                        <Input type="select" name="vehicleId" id="vehicleId" value={vehicleId} onChange={(event) => this.setState({vehicleId: event.target.value})}>
                        {ownVehicleOptions.map((ownVehicleOption, key) => {
                            return (
                                <option value={ownVehicleOption.vehicleId} key={key}>{ownVehicleOption.vehicleName}</option>

                            );
                        })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="agreementContent">동의서</Label>
                        <Input type="textarea" name="agreementContent" id="agreementContent" value={agreementContent} onChange={() => {}}/>
                    </FormGroup>
                    
                    
                    <Row>
                        <Col align="right">
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radioAgree" value='agree' checked={radioAgree === 'agree'} onChange={(event) => this.setState({radioAgree:event.target.value})} />{' '}동의합니다.
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radioAgree" value='disagree' checked={radioAgree === 'disagree'} onChange={(event) => this.setState({radioAgree:event.target.value})} />{' '}동의하지 않습니다.
                                </Label>
                            </FormGroup>
                            <Button onClick={this.onClickSaveButton} disabled={radioAgree === 'disagree'}>저장</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default updateDataProvidingAgreement;