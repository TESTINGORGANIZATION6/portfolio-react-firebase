import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Header.scss'

class Header extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isLogin: false
    }
  }

    updateSignup = () => {
      this.props.history.push('/signup')
    }

    updateLogin = () => {
      this.props.history.push('/login')
    }

    updateLogout = () => {
      console.log('On logout button click', this.props)
    }

    updateHome = () => {
      this.props.history.push('/')
    }

    render () {
      const { isLogin } = this.state
      return (
        <div className='Header-wrapper'>
          {isLogin
            ? <div className='authentication'>
              <button className='header-button' onClick={this.updateHome}>Home</button>
              <button className='header-button' onClick={this.updateLogout}>Log out</button>
            </div> : <div className='authentication'>
              <button className='header-button' onClick={this.updateHome}>Home</button>
              <button className='header-button' onClick={this.updateSignup}>Sign Up</button>
              <button className='header-button' onClick={this.updateLogin}>Log in</button>
            </div>}
        </div>
      )
    }
}

Header.propTypes = {
  history: PropTypes.object,
  push: PropTypes.func
}

export default withRouter(Header)
