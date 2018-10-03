import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

import './assets/css/common.css';

import Home from './views/Home.js';
import VehicleList from './views/VehicleList';
import InsertVehicleData from './views/InsertVehicleData';
import InsertVehicleType from './views/InsertVehicleType';
import InsertVehicle from './views/InsertVehicle';


class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
    return (
        <Router>
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/">UBI</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={Link} to="vehicleList">차량 조회</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="insertVehicleData">차량 데이터 등록</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="insertVehicleType">차종 등록</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="insertVehicle">차량 등록</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Container>
                    <Row>
                        <Col>
                            <div className="content">
                                <Route exact path="/" component={Home} />
                                <Route path="/vehicleList" component={VehicleList} />
                                <Route path="/insertVehicleData" component={InsertVehicleData} />
                                <Route path="/insertVehicleType" component={InsertVehicleType} />
                                <Route path="/insertVehicle" component={InsertVehicle} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col align="right">
                            <div className="footer small">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        Developed by 권혁찬
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>  
        </Router>
    );
  }
}

export default App;
