import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import Login from './components/login/login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    }
  }

  componentWillMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  }

  responseGoogle(response) {
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            welcome to react js.
          </p>
          <Login name="Avinash"></Login>
          <GoogleLogin
              clientId="763777367630-am3jt0c0fc60dmlssho77dh27avllp3s.apps.googleusercontent.com"
              //for actual website 
              //clientId="763777367630-k4gunere1v41eal017djm47l6rtuvio5.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}