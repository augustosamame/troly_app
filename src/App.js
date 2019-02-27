import React, { Component } from 'react';
import numberstowords from '@rajch/numberstowords';
import Spinner from './common/Spinner';
import { FormErrors } from './common/FormErrors';
import './App.css';

class App extends Component {
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

    numberstowords.options.useCurrency = true;
    numberstowords.options.useAnd = true;
    numberstowords.options.useCurrency = true;
    numberstowords.options.majorCurrencySymbol = 'dollars';
    numberstowords.options.minorCurrencySymbol = 'cents';
    numberstowords.options.majorCurrencyAtEnd = true;
    numberstowords.options.minorCurrencyAtEnd = true;
    numberstowords.options.suppressMajorIfZero = false;
    numberstowords.options.suppressMinorIfZero = false;
    numberstowords.options.integerOnly = false;
  }

  handleValueChange(event) {
    const { target } = event;
    this.setState(
      {
        chequeValue: target.value,
        chequeWords: numberstowords.toInternationalWords(target.value),
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
        chequeDateValid = value.length >= 9;
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
                    Name:
                    <input type="text" name="chequeName" className="form-control" value={chequeName} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="chequeDate" className="label-form">
                    Date:
                    <input type="text" name="chequeDate" className="form-control" value={chequeDate} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="chequeValue" className="label-form">
                    Nominal Value:
                    <input type="text" name="chequeValue" className="form-control" value={chequeValue} onChange={this.handleValueChange} />
                  </label>
                </div>
                <input type="submit" className="btn btn-primary" disabled={!formValid} value="Save Cheque" />
              </form>
              <div className="cheque">
                <label htmlFor="chequeWords" id="chequeWordsLabel" className="label-form">
                  {chequeWords}
                </label>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
