import React from 'react';
import Currency from 'react-currency-formatter';
import './css/ChequeList.css';

function ChequeListDetail(props) {
  const { cheque } = props;
  return (
      <tr>
        <td>
          <a href="#" onClick = {() => props.selectFilter(cheque.attributes.name)}>
            {cheque.attributes.name}
          </a>
        </td>
        <td>{cheque.attributes.date}</td>
        <td>
          <Currency
            quantity={cheque.attributes.value_cents / 100}
            currency="USD"
            decimal="."
            group=","
            />
        </td>
        <td>
          <a href="#" onClick = {() => props.selectCheque(cheque.id)}>
            Show
          </a>
        </td>
      </tr>
  );
}

export default ChequeListDetail;
