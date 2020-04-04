import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Signup from '../Component/Signup/Signup'
import Login from '../Component/Login/Login'
import Home from '../Component/Home/Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="wrapper">
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
