import React from 'react';
import ChequeNew from './ChequeNew';
import ChequeList from './ChequeList';
import * as api from './services/api';
import './App.css';
import logo from './assets/virtual_cheque_icon.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cheques: [],
      error: '',
      loading: true
    };
    this.getCheques = this.getCheques.bind(this);
  }

  componentDidMount() {
    this.getCheques();
  }

  getCheques() {
    api.get(
      '/cheques'
    ).then((response) => {
      this.setState({
        cheques: response.data.data,
        loading: false
      });
    }).catch(() => {
      this.setState({
        error: 'Error retrieving cheques',
        loading: false
      });
    });
  }

  render() {
    const { cheques } = this.state;
    return (
      <div className="home">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <ChequeNew
              refreshCheques={this.getCheques}
            />
          </div>
          <div className="col-sm-6">
            <ChequeList
              cheques={cheques}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
