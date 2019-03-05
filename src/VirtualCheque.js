import React from 'react';
import Currency from 'react-currency-formatter';
import BlankCheque from './assets/blankCheque.png';
import './css/VirtualCheque.css';

const VirtualCheque = ({ chequeFields }) => (
  <div className="container" id="cheque-container">
    <div className="chequeName">
      { chequeFields.chequeName }
    </div>
    <div className="chequeDate">
      { chequeFields.chequeDate }
    </div>
    <div className="chequeValue">
      <Currency
        quantity={Number(chequeFields.chequeValue)}
        currency="USD"
        decimal="."
        group=","
      />
    </div>
    <div className="chequeWords">
      { chequeFields.chequeWords }
    </div>
    <img src={BlankCheque} width="800" height="364" alt="cheque" />
  </div>
);

export default VirtualCheque;
