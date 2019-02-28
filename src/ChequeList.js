import React, { Fragment, Component } from 'react';
import ChequeListDetail from './ChequeListDetail';
import Spinner from './common/Spinner';
import Modal from './common/modal/Modal';
import VirtualCheque from './VirtualCheque';
import { completeNumberToWords } from './common/lib';

export default class ChequeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered_cheques: [],
      showRemoveFilter: false,
      error: '',
      loading: false,
      isShowing: false,
      chosenCheque: []
    };
    this.selectCheque = this.selectCheque.bind(this);
    this.selectFilter = this.selectFilter.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered_cheques: this.props.cheques,
    })
  }

  selectCheque(chequeId) {
    console.log(chequeId);
    this.openModalHandler(chequeId)
  }

  openModalHandler = (chequeId) => {
    const cheque = this.props.cheques.filter(function(item) {
      return item.id == parseInt(chequeId, 10);
    });
    console.log(this.props.cheques);
    console.log(cheque);
    let friendlyCheque = {
      chequeName: cheque[0].attributes.name,
      chequeDate: cheque[0].attributes.date,
      chequeValue: cheque[0].attributes.value_cents / 100,
      chequeWords: completeNumberToWords(cheque[0].attributes.value_cents / 100),
    }
    this.setState({
      isShowing: true,
      chosenCheque: friendlyCheque,
    });
    }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
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
    const {
      isShowing, chequeName, chequeDate, formErrors, formValid, error, loading, chosenCheque
    } = this.state;
    return (
      <Fragment>
        { isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
        <Modal
          className="modal"
          show={isShowing}
          close={this.closeModalHandler}
        >
          <VirtualCheque
            chequeFields={chosenCheque}
          />
        </Modal>
      <div className="ChequeDetail">
        <div className="List-body">
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
      </Fragment>
    );
  }
}
