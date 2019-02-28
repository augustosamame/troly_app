import React, { Fragment, Component } from 'react';
import ChequeListDetail from './ChequeListDetail';
import Modal from './common/modal/Modal';
import VirtualCheque from './VirtualCheque';
import { completeNumberToWords } from './common/lib';

export default class ChequeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCheques: [],
      showRemoveFilter: false,
      isShowing: false,
      chosenCheque: [],
    };
    this.selectCheque = this.selectCheque.bind(this);
    this.selectFilter = this.selectFilter.bind(this);
  }

  componentDidMount() {
    const { cheques } = this.props
    this.setState({
      filteredCheques: cheques,
    });
  }

  openModalHandler = (chequeId) => {
    const { cheques } = this.props
    const cheque = cheques.filter(
      obj => (obj.id == parseInt(chequeId, 10)),
    );
    const friendlyCheque = {
      chequeName: cheque[0].attributes.name,
      chequeDate: cheque[0].attributes.date,
      chequeValue: cheque[0].attributes.value_cents / 100,
      chequeWords: completeNumberToWords(cheque[0].attributes.value_cents / 100),
    };
    this.setState({
      isShowing: true,
      chosenCheque: friendlyCheque,
    });
  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  }

  selectCheque(chequeId) {
    this.openModalHandler(chequeId);
  }

  selectFilter(userName) {
    const { cheques } = this.props;
    this.allCheques = cheques;
    const filteredCheques = cheques.filter(
      obj => (obj.attributes.name === userName),
    );
    this.setState({
      showRemoveFilter: true,
      filteredCheques,
    });
  }

  removeFilter() {
    this.setState({
      showRemoveFilter: false,
      filteredCheques: this.allCheques,
    });
  }

  maybeShowRemoveFilter() {
    const { showRemoveFilter } = this.state;
    if (showRemoveFilter) {
      return (
        <a href="#" onClick = {() => this.removeFilter()}>Remove Filter</a>
      );
    }
    return (null);
  }

  renderCheques() {
    let chequeArray = [];
    const { filteredCheques, showRemoveFilter } = this.state;
    const { cheques } = this.props;
    if (showRemoveFilter) {
      chequeArray = filteredCheques;
    } else {
      chequeArray = cheques;
    }
    return chequeArray.map(cheque => (
      <ChequeListDetail
        key={cheque.id}
        cheque={cheque}
        selectCheque={this.selectCheque}
        selectFilter={this.selectFilter}
      >
        {cheque.name}
      </ChequeListDetail>
    ));
  }

  renderTable() {
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
    );
  }

  render() {
    const { isShowing, chosenCheque } = this.state;
    return (
      <Fragment>
        { isShowing ? <div onClick={this.closeModalHandler} className="back-drop" /> : null }
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
