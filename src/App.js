import React from 'react';
import ChequeNew from './ChequeNew';
import ChequeList from './ChequeList';
import Spinner from './common/Spinner';
import * as api from './services/api';
import './css/App.css';
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
    this.goToNew = this.goToNew.bind(this);
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

  goToNew() {
    console.log('gotonew');
    var element_to_scroll_to = document.getElementById('chequeNewAnchor')
    element_to_scroll_to.scrollIntoView();
  }

  render() {
    const { cheques, error, loading } = this.state;
    if (loading) {
      return (
        <Spinner size={'large'} />
      );
    }
    return (
      <div className="home">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button onClick={() => {this.goToNew()}}>Create New Cheque</button>
            <div className="error-label">
              {error}
            </div>
            <ChequeList
              cheques={cheques}
            />
          </div>
          <div className="col-sm-12" id="chequeNewAnchor">
            <ChequeNew
              refreshCheques={this.getCheques}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
