import React, { Component } from 'react';
import numberstowords from '@rajch/numberstowords';
import { completeNumberToWords } from './common/lib'
import Spinner from './common/Spinner';
import { FormErrors } from './common/FormErrors';
import VirtualCheque from './VirtualCheque';
import moment from 'moment';
import './css/ChequeNew.css';
import * as api from './services/api';

class ChequeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chequeValue: '',
      chequeName: '',
      chequeDate: '',
      chequeWords: '',
      formErrors: { chequeName: '', chequeDate: '', chequeValue: '' },
      chequeNameValid: false,
      chequeDateValid: false,
      chequeValueValid: false,
      formValid: false,
      error: '',
      loading: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValueChange(event) {
    const { target } = event;
    this.setState(
      {
        chequeValue: target.value,
        chequeWords: completeNumberToWords(target.value),
      },
      () => { this.validateField('chequeValue', target.value); },
    );
  }

  handleInputChange(event) {
    const { target } = event;
    this.setState(
      { [target.name]: target.value },
      () => { this.validateField(target.name, target.value); },
    );
  }

  validateField(fieldName, value) {
    let {
      chequeNameValid, chequeDateValid, chequeValueValid,
    } = this.state;
    const { formErrors } = this.state;

    switch (fieldName) {
      case 'chequeName':
        chequeNameValid = value.length >= 2;
        formErrors.chequeName = chequeNameValid ? '' : ' is too short';
        break;
      case 'chequeDate':
        //chequeDateValid = value.length >= 9;
        chequeDateValid = moment(value, "DD-MM-YY", true).isValid();
        formErrors.chequeDate = chequeDateValid ? '' : ' is invalid';
        break;
      case 'chequeValue':
        chequeValueValid = value > 0;
        formErrors.chequeValue = chequeValueValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      chequeNameValid,
      chequeDateValid,
      chequeValueValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.chequeNameValid && this.state.chequeDateValid && this.state.chequeValueValid
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { chequeName, chequeDate, chequeValue } = this.state;
    const newCheque = {
      cheque: {
        name: chequeName,
        date: chequeDate,
        value_cents: Math.floor(chequeValue * 100),
      },
    };
    this.setState({
      error: '',
      loading: true,
    });
    api.post(
      '/cheques',
      newCheque,
    ).then((response) => {
      this.setState({
        loading: false,
        chequeValue: '',
        chequeName: '',
        chequeDate: '',
        chequeWords: '',
      });
      this.props.refreshCheques();
      alert('cheque has been saved!');
    }).catch((error) => {
      console.log(error)
      this.setState({
        error: 'Error Creating Cheque',
        loading: false
      });
    });
  }

  render() {
    const {
      chequeValue, chequeName, chequeDate, chequeWords, formErrors, formValid, error, loading
    } = this.state;
    if (loading) {
      return (
        <Spinner />
      );
    }
    return (
      <div className="App">
        <div className="App-body">
          <div className="panel panel-default devise-bs">
            <div className="panel-heading">
              <h4>New Cheque Information</h4>
            </div>
            <div className="panel-body">
              <FormErrors formErrors={formErrors} />

              <form onSubmit={this.handleSubmit} autoComplete="off">
                <div className="form-group">
                  <label htmlFor="chequeName" className="label-form">
                    Recipient Name:
                    <input type="text" name="chequeName" className="form-control" value={chequeName} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="chequeDate" className="label-form">
                    Date (dd-mm-yy):
                    <input type="text" name="chequeDate" className="form-control" value={chequeDate} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="chequeValue" className="label-form">
                    Nominal Value:
                    <input
                      ref="input"
                      type="text"
                      name="chequeValue"
                      className="form-control"
                      value={chequeValue}
                      onChange={this.handleValueChange}
                      onFocus={()=>{this.refs.input.select()}}
                    />
                  </label>
                </div>
                <input type="submit" className="btn btn-primary" disabled={!formValid} value="Save Cheque" />
              </form>
              <div className="error-label">
                {error}
              </div>
            </div>
          </div>
        </div>
        <div className="cheque">
          <VirtualCheque
            chequeFields={this.state}
          />
        </div>
      </div>
    );
  }
}

export default ChequeNew;
