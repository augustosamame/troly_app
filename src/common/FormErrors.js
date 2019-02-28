import React from 'react';
import { friendlyField } from './lib'
import '../FormErrors.css';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{friendlyField(fieldName)} {formErrors[fieldName]}</p>
        )
      } else {
        return '  ';
      }
    })}
  </div>
