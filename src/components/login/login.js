import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <h1>Welcome to ES6 {this.props.name}</h1>
        );
    }
}

