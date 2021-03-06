import React from 'react';
import { friendlyField } from './lib';
import '../css/FormErrors.css';

const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>
            {friendlyField(fieldName)}
            {formErrors[fieldName]}
          </p>
        );
      }
      return '  ';
    })}
  </div>
);

export default FormErrors;
