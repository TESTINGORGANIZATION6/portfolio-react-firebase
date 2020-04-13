import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Header.scss'

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

  render () {
    const { userDetails } = this.props
    console.log('render header', this.props)
    return (
      <div className='Header-wrapper'>
        <div className='authentication'>
          <button className='header-button' onClick={this.updateHome}>Home</button>
          <button className='header-button' onClick={this.updateSignup}>Sign Up</button>
          <button className='header-button' onClick={this.updateLogin}>Log in</button>
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
  LastName: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.data.userDetails
  }
}
export default withRouter(connect(mapStateToProps, null)(Header))
// export default withRouter(Header)
