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
                    <NavbarBrand tag={Link} to="/">사용자</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to="vehicleList">차량 조회</NavLink>
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
