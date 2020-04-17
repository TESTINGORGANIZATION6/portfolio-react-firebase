import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import './Header.scss'
import { login } from '../../Services/services'

class Header extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      userLog: null
    }
  }

  updateSignup = () => {
    this.props.history.push('/signup')
  }

  updateLogin = () => {
    this.props.history.push('/login')
  }

  updateLogout = () => {
    sessionStorage.clear()
    this.props.history.push('/login')
  }

  updateHome = () => {
    this.props.history.push('/')
  }

  componentDidMount () {
    const query = queryString.parse(this.props.location.search)
    if (query.user) {
      console.log('Google User')
      const user = {
        UserName: query.token,
        Password: 'NA',
        sso: query.user
      }
      login(user).then(() => {
        this.setState({
          isLogin: true
        })
      })
    }
  }

  render () {
    let { isLogin } = this.state
    const userDetails = JSON.parse(sessionStorage.getItem('userData'))
    if (userDetails) {
      isLogin = true
    }
    return (
      <div className='Header-wrapper'>
        <div className='authentication'>
          <button className='header-button' onClick={this.updateHome}>Home</button>
          {isLogin
            ? <button className='header-button' onClick={this.updateLogout}>Log out</button>
            : <>
              <button className='header-button' onClick={this.updateSignup}>Sign Up</button>
              <button className='header-button' onClick={this.updateLogin}>Log in</button>
            </>
          }
        </div>

        {/* <div className="logo">
            <i className="fa fa-hand-lizard-o" aria-hidden="true"></i>
          </div> */}
        {userDetails && <div className="UserName">
          <i className="fa fa-user-circle userProfile" aria-hidden="true"></i>
          <div className="displayName">{`${userDetails.FirstName} ${userDetails.LastName}`}</div>
        </div>}
      </div>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object,
  push: PropTypes.func,
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  location: PropTypes.object
}

export default withRouter(connect()(Header))
// export default withRouter(Header)
