const storeData = {
  userId: '',
  loginData: {}
}

export const dataReducer = (data = storeData, action) => {
  // debugger
  // console.log('dataReducer ', action)
  if (action.type === 'GET_USERID') {
    return { ...data, userId: action.payload }
  }

  if (action.type === 'LOGIN_USERID') {
    return { ...data, loginData: action.payload }
  }

  return data
}
