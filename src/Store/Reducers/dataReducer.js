const storeData = {
  userId: '',
  loginData: {}
}

export const dataReducer = (data = storeData, action) => {
  console.log('dataReducer ', action)
  if (action.type === 'GET_USERID') {
    return { ...data, userId: action.payload }
  }

  if (action.type === 'LOGIN_USERID') {
    return { ...data, loginId: action.payload }
  }

  return data
}
