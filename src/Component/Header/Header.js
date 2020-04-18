import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import './Header.scss'
import { login } from '../../Services/services'

class Header extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      sidebar: false,
      isLogin: false,
      userLog: null
    }
  }

  handleSidebar = (e) => {
    this.setState({
      sidebar: !this.state.sidebar
    })
  };

  handleOverlay = (e) => {
    this.setState({
      sidebar: false
    })
  };

  updateSignup = () => {
    this.props.history.push('/signup')
  };

  updateLogin = () => {
    this.props.history.push('/login')
  };

  updateLogout = () => {
    this.setState({
      sidebar: false
    })
    sessionStorage.clear()
    this.props.history.push('/login')
  };

  updateHome = () => {
    this.props.history.push('/')
  };

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
    let { isLogin } = this.state.isLogin
    const userDetails = JSON.parse(sessionStorage.getItem('userData'))
    if (userDetails) {
      isLogin = true
    }
    return (
      <>
        <div className="headerFixed">
          <nav className="navbar navbar-expand-sm navbar-dark">
            <Link to="/" className="navbar-brand">
              HOME
            </Link>
            <button
              className={
                'sidebarBtn' +
                ' ' +
                (this.state.sidebar ? 'sidebarBtnTrue' : '')
              }
              type="button"
              onClick={this.handleSidebar}
            >
              <span className="sidebarBtnTop"></span>
              <span className="sidebarBtnMid"></span>
              <span className="sidebarBtnBot"></span>
            </button>

            {this.state.sidebar ? (
              <div className="overlay" onClick={this.handleOverlay}></div>
            ) : null}

            <div
              className={
                'HeaderSideBar' +
                ' ' +
                (this.state.sidebar ? 'HeaderSideBarRight' : '')
              }
            >
              <ul className="HeaderUl">
                <li className="HeaderList">
                  <div className="UserName">
                    <i
                      className="fa fa-user-circle userProfile"
                      aria-hidden="true"
                    ></i>
                    {isLogin ? (
                      <>{`${userDetails.FirstName} ${userDetails.LastName}`}</>
                    ) : (
                      <Link to="/login" onClick={this.handleOverlay}>Signup / Login</Link>
                    )}
                  </div>
                </li>

                {isLogin ? (
                  <li className="HeaderList HeaderListLogout HeaderLoginList">
                    <p>
                      <span className="logoutBtn" onClick={this.updateLogout}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>Logout
                      </span>
                    </p>
                  </li>
                ) : null}
              </ul>
            </div>
          </nav>
        </div>
      </>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(connect()(Header))
