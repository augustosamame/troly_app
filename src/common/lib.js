export function friendlyField(fieldName) {
  switch (fieldName) {
    case 'chequeName':
      return 'Cheque Name'
    case 'chequeDate':
      return 'Cheque Date'
    case 'chequeValue':
      return 'Cheque Value'
    default:
      return ''
  }
}
