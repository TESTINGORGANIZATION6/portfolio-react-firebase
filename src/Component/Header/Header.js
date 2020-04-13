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
    console.log('header constructor', this.props)
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
    const { userDetails } = this.props
    console.log('render header', this.props)
    const { isLogin } = this.state
    return (
      <div>
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
  userDetails: PropTypes.object,
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  location: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.data.userDetails
  }
}
export default withRouter(connect(mapStateToProps, null)(Header))
// export default withRouter(Header)
