import React, { PureComponent } from 'react'
import Login from '../Login/Login'
import './Signup.scss'
import '../Login/Login.scss'
import { register } from '../../Services/services'

class Signup extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isSignUp: true,
      isRedirectToLogin: false,
      inputValues: [
        {
          value: '',
          error: 'First Name field can not be empty',
          isError: false
        },
        {
          value: '',
          error: 'Last Name field can not be empty',
          isError: false
        },
        {
          value: '',
          error: 'Role field can not be empty',
          isError: false
        },
        {
          value: '',
          error: 'Enter valid Email id',
          isError: false
        },
        {
          value: '',
          error: 'Password field can not be empty',
          isError: false
        }
      ]
    }
  }

  updateState = () => {
    console.log('here on click')
    this.setState({
      isSignUp: true
    })
  }

  // updateOnCloseClick = () => {
  //     console.log("here on click");
  //     this.setState({
  //         isSignUp: false
  //     });
  // }

  onChange () {
    console.log('input change')
  }

  redirectToLoginPage = () => {
    this.setState({
      isSignUp: false,
      isRedirectToLogin: true
    })
  }

  onSubmitClick = (event) => {
    const { inputValues } = this.state
    const updatedInputValues = [...inputValues]
    const email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // eslint-disable-line
    // const number_reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    event.preventDefault()
    updatedInputValues.forEach((inputValue, index) => {
      inputValue.value = event.target[index].value
    })
    updatedInputValues[0].isError = !event.target[0].value.length
    updatedInputValues[1].isError = !event.target[1].value.length
    updatedInputValues[2].isError = !event.target[2].value.length
    // updatedInputValues[1].isError = !number_reg.test(updatedInputValues[1].value);
    updatedInputValues[3].isError = !email_reg.test(updatedInputValues[3].value)
    updatedInputValues[4].isError = !event.target[4].value.length

    if (!updatedInputValues.filter((input) => input.isError === true).length) {
      const userDetail = {
        FirstName: updatedInputValues[0].value,
        LastName: updatedInputValues[1].value,
        Email: updatedInputValues[3].value,
        Role: updatedInputValues[2].value,
        Password: updatedInputValues[4].value
      }
      register(userDetail).then((res) => console.log(res))
    }

    this.setState({
      inputValues: updatedInputValues
    })
  }

  checkSignup () {
    const { isSignUp, inputValues } = this.state
    console.log('here in Sign Up')
    return (
      isSignUp && (
        <div id="myModal" className="signup-modal">
          <div className="modal-content">
            {/* <span className="close" onClick={this.updateOnCloseClick}>&times;</span> */}
            <div style={{ fontSize: '22px' }}>Create a New Account</div>
            <div>
              <img
                src={require('../../Images/signup2.png')}
                alt="Signup"
                className="signup-image"
              />
            </div>
            <form className="signup-box" onSubmit={this.onSubmitClick}>
              <div className="signup-box-container">
                <i className="fa fa-user icon" aria-hidden="true"></i>
                <input
                  className="signup-box-inputBox"
                  placeholder="Enter your First Name"
                  value={this.value}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="error-message">
                {inputValues[0].isError && inputValues[0].error}
              </div>
              <div className="signup-box-container">
                <i className="fa fa-phone icon" aria-hidden="true"></i>
                <input
                  className="signup-box-inputBox"
                  placeholder="Enter your Last Name"
                  value={this.value}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="error-message">
                {inputValues[1].isError && inputValues[1].error}
              </div>
              <div className="signup-box-container">
                <i className="fa fa-envelope icon" aria-hidden="true"></i>
                <input
                  className="signup-box-inputBox"
                  placeholder="Enter your Role"
                  value={this.value}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="error-message">
                {inputValues[2].isError && inputValues[2].error}
              </div>
              <div className="signup-box-container">
                <i className="fa fa-envelope icon" aria-hidden="true"></i>
                <input
                  className="signup-box-inputBox"
                  placeholder="Enter your Email id"
                  value={this.value}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="error-message">
                {inputValues[3].isError && inputValues[3].error}
              </div>
              <div className="signup-box-container">
                <i className="fa fa-lock icon" aria-hidden="true"></i>
                <input
                  type="password"
                  className="signup-box-inputBox"
                  placeholder="Create Password"
                  value={this.value}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="error-message">
                {inputValues[4].isError && inputValues[4].error}
              </div>
              <button className="signup-box-button">Sign Up</button>
            </form>
            <div
              style={{
                backgroundColor: 'orangered',
                height: '1px',
                marginBottom: '3px'
              }}
            ></div>
            <div className="signup-box">
              <span style={{ margin: '10px 0px', fontSize: '18px' }}>
                Have an account ?{' '}
              </span>
              <span
                style={{
                  color: '#2a2aee',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
                onClick={this.redirectToLoginPage}
              >
                Log In
              </span>
            </div>
          </div>
        </div>
      )
    )
  }

  callBackLogin = () => {
    console.log('callback login .... ')
    this.setState({
      isRedirectToLogin: false
    })
  }

  checkLogin () {
    const { isRedirectToLogin } = this.state
    return isRedirectToLogin && <Login callBackLogin={this.callBackLogin} />
  }

  render () {
    return (
      <div className="Signup">
        {/* <button className='header-button' onClick={this.updateState}>Sign Up</button> */}
        {this.checkSignup()}
        {this.checkLogin()}
      </div>
    )
  }
}

export default Signup