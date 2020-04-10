import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Signup from '../Component/Signup/Signup'
import Login from '../Component/Login/Login'
import Home from '../Component/Home/Home'
import PageNotFound from '../Component/PageNotFound'
import RegistrationSteps from '../Component/UserRegistrationForm/JS/RegistrationSteps'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/player-register" component={RegistrationSteps} />
        <Route path="*" component={PageNotFound} />
      </BrowserRouter>
    </div>
  )
}

export default App
