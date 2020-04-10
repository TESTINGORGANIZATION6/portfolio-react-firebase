export const testAction = (data) => ({
  type: 'TEST_ACTION',
  payload: data
})

// action for adding userId
export const getSignupUserId = (userId) => {
  return {
    type: 'GET_USERID',
    payload: userId
  }
}

// action for login userid
export const getLoginUserId = (loginData) => {
  // debugger
  return {
    type: 'LOGIN_USERID',
    payload: loginData
  }
}
