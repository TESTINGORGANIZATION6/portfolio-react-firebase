export const testAction = () => ({
  type: 'TEST_ACTION'
})

export const SIGN_IN = (userId) => {
  return {
    type: 'SIGN_IN',
    userId
  }
}

export const SIGN_OUT = () => {
  return {
    type: 'SIGN_OUT'
  }
}
