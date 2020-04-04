import axios from 'axios';

export const register = newUser => {
    console.log('register -> ', newUser);
    return axios
        .post('https://portfolio-api-node.herokuapp.com/api/User/signup', {
            FirstName: newUser.FirstName,
            LastName: newUser.LastName,
            Email: newUser.Email,
            Role: "Playerss",
            Password: newUser.Password
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        })
}

export const login = user => {
    return axios
        .post('https://portfolio-api-node.herokuapp.com/api/User/login', {
            Email: user.Email,
            Password: user.Password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}