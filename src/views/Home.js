import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">UBI 사용자 페이지</h1>
                    <hr className="my-2" />
                    <p>환영합니다.</p>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;