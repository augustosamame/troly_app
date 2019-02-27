import React, { Component } from 'react';
import ChequeListDetail from './ChequeListDetail';
import Spinner from './common/Spinner';

export default class ChequeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered_cheques: [],
      showRemoveFilter: false,
      error: '',
      loading: false
    };
    this.selectCheque = this.selectCheque.bind(this);
    this.selectFilter = this.selectFilter.bind(this);

    console.log(this.props)
  }

  componentDidMount() {
    this.setState({
      filtered_cheques: this.props.cheques,
    })
  }

  selectCheque(chequeId) {
    console.log(chequeId);
  }

  selectFilter(userName) {
    this.allCheques = this.props.cheques
    let filteredCheques = this.props.cheques.filter( function(obj) { return (obj.attributes.name === userName) } );
    this.setState({
      showRemoveFilter: true,
      filtered_cheques: filteredCheques,
    })
  }

  removeFilter() {
    this.setState({
      showRemoveFilter: false,
      filtered_cheques: this.allCheques,
    })
  }

  renderCheques() {
    console.log("fired renderCheques")
    let cheque_array = []
    if (this.state.showRemoveFilter) {
      cheque_array = this.state.filtered_cheques
    } else {
      cheque_array = this.props.cheques
    }
    return cheque_array.map(cheque => {
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
    console.log(this.props.cheques, "PROPS INSIDE RENDER")
    console.log(this.state.filtered_cheques, "FILTERED_CHEQUES STATE INSIDE RENDER")
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
