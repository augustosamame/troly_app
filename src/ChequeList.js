import React, { Component } from 'react';
import ChequeListDetail from './ChequeListDetail';
import Spinner from './common/Spinner';
import * as api from './services/api';

export default class ChequeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cheques: [],
      showRemoveFilter: false,
      error: '',
      loading: true
    };
    this.getCheques = this.getCheques.bind(this);
    this.renderCheques = this.renderCheques.bind(this);
    this.selectCheque = this.selectCheque.bind(this);
    this.selectFilter = this.selectFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.maybeShowRemoveFilter = this.maybeShowRemoveFilter.bind(this);
  }

  componentDidMount() {
    this.getCheques();
  }

  getCheques() {
    this.setState({
      error: '',
      loading: true
    });
    api.get(
      '/cheques'
    ).then((response) => {
      this.setState({
        cheques: response.data.data,
        loading: false
      });
    }).catch(() => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  selectCheque(chequeId) {
    console.log(chequeId);
  }

  selectFilter(userName) {
    this.allCheques = this.state.cheques
    let filteredCheques = this.state.cheques.filter( function(obj) { return (obj.attributes.name === userName) } );
    this.setState({
      showRemoveFilter: true,
      cheques: filteredCheques,
    })
  }

  removeFilter() {
    this.setState({
      showRemoveFilter: false,
      cheques: this.allCheques,
    })
  }

  renderCheques() {
    return this.state.cheques.map(cheque => {
      return (
        <ChequeListDetail
          key={cheque.id}
          cheque={cheque}
          selectCheque={this.selectCheque}
          selectFilter={this.selectFilter}
        >
          {cheque.name}
        </ChequeListDetail>
      );
    });
  }

    maybeShowRemoveFilter() {
      if (this.state.showRemoveFilter) {
        return (
          <a href="#" onClick = {() => this.removeFilter()}>Remove Filter</a>
        )
      }
    }

    renderTable() {
      if (this.state.loading) {
        return (
          <Spinner size={'large'} />
         );
      }
      return (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Value</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.renderCheques()}
          </tbody>
        </table>
      )
    }

  render() {
    return (
      <div className="ChequeDetail">
        <div className="App-body">
          <div className="panel panel-default devise-bs">
            <div className="panel-heading">
              <h4>List of Cheques</h4>
              <h6>(click on name to filter)</h6>
              <h6>{this.maybeShowRemoveFilter()}</h6>
            </div>
            <div className="panel-body">
             {this.renderTable()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
