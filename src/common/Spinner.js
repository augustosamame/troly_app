import * as React from 'react';
import spinnerImage from '../assets/spinner.gif';

class Spinner extends React.Component {
  render() {
    return (
      <div style={{ position: 'fixed', top: '50%', left: '50%', display: 'inline-block' }}>
        <img src={spinnerImage} alt='' />
      </div>
    );
  }
}

export default Spinner;
