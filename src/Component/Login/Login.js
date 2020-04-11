import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { testAction, getLoginUserId, getLoginDetailInfo } from '../../Store/Actions'
import './Login.scss'
import { login, getUserDetails } from '../../Services/services'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

class Login extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isLoader: false,
      isLoginHere: true,
      userId: null,
      inputValues: [
        {
          value: '',
          error: 'Invalid Username!!',
          isError: false
        },
        {
          value: '',
          error: 'Incorrect password!!',
          isError: false
        }
      ]
    }
  }

  componentDidMount () {
    // window.gapi.load('client:auth2', () => {
    //     window.gapi.client.init({
    //         clientId: '191483958587-js6uiijoc757ulf3hul6ab2uq5oqa9b9.apps.googleusercontent.com',
    //         scope: 'email'
    //     }).then(() => {
    //         this.auth = window.gapi.auth2.getAuthInstance();
    //         this.changeSignedStatus(this.auth.isSignedIn.get());
    //         this.auth.isSignedIn.listen(this.changeSignedStatus);
    //     });
    // });
  }

  //   changeSignedStatus = (isSignedIn) => {
  //     if (isSignedIn) {
  //         this.setState({
  //             userId: this.auth.currentUser.get().getId()
  //         });
  //     } else {
  //         this.props.SIGN_OUT();
  //     }
  //   }

  updateOnCloseClick = () => {
    this.setState({
      isLoginHere: false
    })
    if (this.props.callBackLogin && this.props.callBackLogin());
  }

  onChange () {
    console.log('input change')
  }

  googleAuthRequired = () => {
    // this.setState({
    //     isLoginHere: false,
    // });
    // if (this.props.callBackLogin && this.props.callBackLogin());
    // this.auth.signIn();
  }

  onSubmitClick = (event) => {
    const { inputValues } = this.state
    const updatedInputValues = [...inputValues]
    // const email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // eslint-disable-line

    event.preventDefault()

    updatedInputValues.forEach((inputValue, index) => {
      inputValue.value = event.target[index].value
    })
    // updatedInputValues[0].isError = !email_reg.test(updatedInputValues[0].value)
    updatedInputValues[0].isError = !event.target[0].value.length
    updatedInputValues[1].isError = !event.target[1].value.length

    console.log('<------->', updatedInputValues)

    if (!updatedInputValues.filter((input) => input.isError === true).length) {
      const userDetail = {
        UserName: updatedInputValues[0].value,
        Password: updatedInputValues[1].value
      }
      this.setState({ isLoader: true })
      login(userDetail).then((res) => {
        console.log('login ---> data -> ', res)
        if (res.userId) {
          this.props.getLoginUserId(res)
        }
        getUserDetails(res).then((res) => {
          console.log('getUserDetails', res)
          this.props.getLoginDetailInfo(res.data)
          this.setState({ isLoader: false }, () => {
            this.props.history.push('/player-register')
          })
        })
      })
    }

    this.setState({
      inputValues: updatedInputValues
    })
  }

  render () {
    const { isLoginHere, inputValues, isLoader } = this.state
    return (
      isLoginHere && (
        <>
          {isLoader ? (
            <div className="loader-resto">
              <div className="loader">
                <Loader type="Bars" color="#00BFFF" height={40} width={40} />
              </div>
            </div>
          ) : null}
          <div id="myModal" className="login-modal">
            <div className="modal-content">
              {/* <span className="close" onClick={this.updateOnCloseClick}>&times;</span> */}
              <div style={{ fontSize: '22px' }}>Log In</div>
              <div>
                <img
                  src={require('../../Images/login.png')}
                  alt="Login"
                  className="login-image"
                />
              </div>
              <form className="login-box" onSubmit={this.onSubmitClick}>
                <div className="login-box-container">
                  <i className="fa fa-user icon" aria-hidden="true"></i>
                  <input
                    className="login-box-inputBox"
                    placeholder="Username"
                    value={this.value}
                    onChange={(e) => this.onChange(e)}
                  />
                </div>
                <div className="error-message">
                  {inputValues[0].isError && inputValues[0].error}
                </div>
                <div className="login-box-container">
                  <i className="fa fa-lock icon" aria-hidden="true"></i>
                  <input
                    type="password"
                    className="login-box-inputBox"
                    placeholder="Password"
                    value={this.value}
                    onChange={(e) => this.onChange(e)}
                  />
                </div>
                <div className="error-message">
                  {inputValues[1].isError && inputValues[1].error}
                </div>
                <button className="login-box-button">Log In</button>
              </form>
              <div
                style={{
                  backgroundColor: 'orangered',
                  height: '1px',
                  marginBottom: '3px'
                }}
              ></div>
              <div className="login-box">
                <span style={{ margin: '10px 0px', fontSize: '16px' }}>
                  Log In with Google ?{' '}
                </span>
                <span
                  style={{
                    color: '#2a2aee',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                  onClick={this.googleAuthRequired}
                >
                  Click here
                </span>
              </div>
            </div>
          </div>
        </>
      )
    )
  }
}

Login.propTypes = {
  callBackLogin: PropTypes.func,
  getLoginUserId: PropTypes.func,
  getLoginDetailInfo: PropTypes.func,
  history: PropTypes.object,
  push: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    userId: state.data.userId,
    loginData: state.data.loginData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    testAction: () => dispatch(testAction()),
    getLoginUserId: (loginData) => dispatch(getLoginUserId(loginData)),
    getLoginDetailInfo: (userDetails) => dispatch(getLoginDetailInfo(userDetails))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
// export default Login;
