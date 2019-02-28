import numberstowords from '@rajch/numberstowords';

export function friendlyField(fieldName) {
  switch (fieldName) {
    case 'chequeName':
      return 'Cheque Name';
    case 'chequeDate':
      return 'Cheque Date';
    case 'chequeValue':
      return 'Cheque Value';
    default:
      return '';
  }
}

function singularize(currencyString) {
  let newString = currencyString.replace(' And ', ' and ').replace('Dollars', 'dollars').replace('Cents', 'cents');
  if (newString.startsWith('One dollars')) {
    newString = newString.replace('One dollars', 'One dollar');
  }
  return newString;
}

export function completeNumberToWords(number) {
  return singularize(numberstowords.toInternationalWords(number,
    {
      useCurrency: true,
      majorCurrencySymbol: 'dollars',
      minorCurrencySymbol: 'cents',
      integerOnly: false,
      majorCurrencyAtEnd: true,
      useCase: 'proper',
    }));
}
