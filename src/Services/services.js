import axios from 'axios'

export const getUserName = (userName) => {
  return axios
    .get(
      `https://portfolio-api-node.herokuapp.com/api/User/checkusername?userName=${userName}`,
      {
        userName: userName
      }
    )
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const register = (newUser) => {
  console.log('register -> ', newUser)
  return axios
    .post('https://portfolio-api-node.herokuapp.com/api/User/signup', {
      FirstName: newUser.FirstName,
      LastName: newUser.LastName,
      UserName: newUser.UserName,
      Email: newUser.Email,
      Password: newUser.Password
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const login = (user) => {
  return axios
    .post('https://portfolio-api-node.herokuapp.com/api/User/login', {
      UserName: user.UserName,
      Password: user.Password
    })
    .then((res) => {
      sessionStorage.setItem('userData', JSON.stringify(res.data))
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
