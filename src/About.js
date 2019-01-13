import React, { Component } from 'react';
import logo from './logo_uvk.png';
import './About.css';

class About extends Component {
  render() {
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
            <div>
            <h1> About Page </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
