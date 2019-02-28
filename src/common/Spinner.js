import * as React from 'react';
import spinnerImage from '../assets/spinner.gif';

const Spinner = () => (
  <div style={
    {
      position: 'fixed', top: '50%', left: '50%', display: 'inline-block',
    }
  }
  >
    <img src={spinnerImage} alt="" />
  </div>
);

export default Spinner;
