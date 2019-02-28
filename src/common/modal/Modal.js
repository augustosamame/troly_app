import React from 'react';

import './Modal.css';

const modal = (props) => {
  const { show, close, children } = props
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: show ? 'translateY(-30vh)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        <div className="modal-header">
          <span className="close-modal-btn" onClick={close}>×</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={props.close}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default modal;
