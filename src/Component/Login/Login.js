import React, { PureComponent } from 'react';
import './Login.scss';
import { login } from '../../Services/services'

class Login extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isLoginHere: true,
            userId: null,
            inputValues: [
                {
                    value: "",
                    error: "Email id should contain @ in it",
                    isError: false
                },
                {
                    value: "",
                    error: "You have entered wrong password",
                    isError: false
                }
            ]
        }
    }

    componentDidMount() {
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

    changeSignedStatus = (isSignedIn) => {
        // if (isSignedIn) {
        //     this.setState({
        //         userId: this.auth.currentUser.get().getId()
        //     });
        // } else {
        //     this.props.SIGN_OUT();
        // }

    }

    updateState = () => {
        this.setState({
            isLoginHere: false
        });
        if (this.props.callBackLogin && this.props.callBackLogin());
    }

    updateOnCloseClick = () => {
        this.setState({
            isLoginHere: false
        });
        if (this.props.callBackLogin && this.props.callBackLogin());
    }

    onChange() {
        console.log('input change');
    }

    googleAuthRequired = () => {
        this.setState({
            isLoginHere: false,
        });
        if (this.props.callBackLogin && this.props.callBackLogin());
        // this.auth.signIn();
    }
    
    onSubmitClick = (event) => {
        const { inputValues } = this.state;
        const updatedInputValues = [...inputValues];
        const email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // eslint-disable-line
        
        event.preventDefault();
        updatedInputValues.forEach((inputValue, index) => {
            inputValue.value = event.target[index].value;
        });
        updatedInputValues[0].isError = !email_reg.test(updatedInputValues[0].value);
        updatedInputValues[1].isError = !event.target[1].value.length;

        console.log('<------->', updatedInputValues);

        if (!(updatedInputValues.filter(input => input.isError === true).length)) {
            const userDetail = {
                Email: updatedInputValues[0].value,
                Password: updatedInputValues[1].value
            }
            login(userDetail).then(res => console.log(res));
        }



        this.setState({
            inputValues: updatedInputValues
        });
    }

    render() {
        const { isLoginHere, inputValues } = this.state;
        return (isLoginHere && (
            <div id="myModal" className="login-modal">
                <div className="modal-content">
                    <span className="close" onClick={this.updateState}>&times;</span>
                    <p style={{ fontSize: '22px' }}>Log In</p>
                    <div><img src={require("../../Images/login.png")} alt="Login" className="login-image" /></div>
                    <form className="login-box" onSubmit={this.onSubmitClick}>
                        <div className="login-box-container">
                            <i className="fa fa-user icon" aria-hidden="true"></i>
                            <input className="login-box-inputBox" placeholder="Enter your Email id" value={this.value} onChange={(e) => this.onChange(e)} />
                        </div>
                        <div className="error-message">{inputValues[0].isError && inputValues[0].error}</div>
                        <div className="login-box-container">
                            <i className="fa fa-lock icon" aria-hidden="true"></i>
                            <input type="password" className="login-box-inputBox" placeholder="Enter your Password" value={this.value} onChange={(e) => this.onChange(e)} />
                        </div>
                        <div className="error-message">{inputValues[1].isError && inputValues[1].error}</div>
                        <button className='login-box-button'>Log In</button>
                    </form>
                    <div style={{ color: 'grey' }}><hr style={{ margin: '10px' }} /></div>
                    <div className="login-box">
                        <span style={{ margin: '10px 0px', fontSize: '16px' }}>Log In with Google ? </span>
                        <span style={{ color: '#2a2aee', fontSize: '16px', cursor: 'pointer' }} onClick={this.googleAuthRequired}>Click here</span>
                    </div>
                </div>
            </div>
        ));
    }
}

export default Login;