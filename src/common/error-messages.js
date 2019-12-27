const ERROR_MESSAGES = {
  ADDRESS_IS_EMPTY: 'address cannot be empty',
  AMOUNT_IS_EMPTY: 'amount cannot be empty',
  AMOUNT_IS_NOT_NUMBER: 'amount is not a number. Use dot (.) as separator',
  EMAIL_IS_EMPTY: 'email cannot be empty',
  PHONE_ALREADY_REGISTERED: 'phone already registered with a private key',
  INSUFFICIENT_FUNDS: 'wallet with insufficient funds',
  IS_NOT_EMAIL: 'email with bad format',
  IS_NOT_PHONE: 'phone with bad format',
  IS_NOT_CHECKSUM_ADDRESS: 'given address is not checksum address',
  PHONE_IS_EMPTY: 'phone cannot be empty',
  PRIVATE_KEY_NOT_FOUND: 'private key not found for given pair email-phone',
  TO_ADDRESS_IS_EMPTY: 'toAddress cannot be empty',
  TRANSACTION_FAILED: 'transaction failed',
  WALLET_NOT_FOUND: 'wallet not found for given pair email-phone',
}

export default ERROR_MESSAGES
