import React, { Component } from 'react';
import axios from 'axios';
import Spinner from './common/Spinner';
import { ENDPOINT } from './config';
import logo from './logo_uvk.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
      loading: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onLoginFail() {
    this.setState({
      error: 'Usuario o contraseña incorrecta',
      loading: false,
    });
  }

  handleSubmit(event) {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const { username, password } = this.state;

    // NOTE Post to HTTPS only in production
    axios({
      method: 'POST',
      url: `${ENDPOINT}/login`,
      headers: { CONTENT_TYPE: 'application/json', ACCEPT: '*/*' },
      data: {
        user: {
          login: username,
          password,
          user_type: 'maestro',
        },
      },
    })
      .then((response) => {
        console.log(response, '==> RESPONSE FROM API');
        console.log(response.headers, '==> HEADERS RESPONSE FROM API');
        console.log(response.headers.authorization, '==> AUTH RESPONSE FROM API');
        console.log(response.data.data.id, '==> ID RESPONSE FROM API');
        localStorage.setItem('id_token', response.headers.authorization);
        localStorage.setItem('api_user_id', response.data.data.id);
        this.setState({
          error: '',
          loading: false,
        });
        // this.props.newJWT(response.headers.authorization);
        // this.setPusherData();
      })
      .catch(() => {
        this.onLoginFail();
      });
  }


  handleInputChange(event) {
    const { target, name } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }


  render() {
    const { email, username, password, error, loading } = this.state;
    if (loading) {
      return (
        <Spinner />
      );
    }
    return (
      <div>
        <div className="App-body">
          <div>
            <a
              className="App-link"
              href="http://www.uvkmulticines.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo} className="App-logo" alt="logo UVK" />
            </a>
          </div>
          <div className="panel panel-default devise-bs">
            <div className="panel-heading">
              <h4>Iniciar Sesión</h4>
            </div>
            <div className="panel-body">

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="label-form">
                    Correo Electrónico:
                    <input type="text" name="username" className="form-control" value={username} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="label-form">
                    Contraseña:
                    <input type="password" name="password" className="form-control" value={password} onChange={this.handleInputChange} />
                  </label>
                </div>
                <input type="submit" className="btn btn-primary" value="Iniciar Sesión" />
              </form>
              <a
                href="http://www.uvkmulticines.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Olvidó su contraseña?
              </a>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
