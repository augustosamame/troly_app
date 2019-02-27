import React from 'react';
import App from './App';
import ChequeList from './ChequeList';
import './Home.css';
import logo from './assets/virtual_cheque_icon.png';

const Home = () => (
  <div className="home">
    <div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <div className="row">
      <div className="col-sm-6">
        <App />
      </div>
      <div className="col-sm-6">
        <ChequeList />
      </div>
    </div>
  </div>
);

export default Home;
