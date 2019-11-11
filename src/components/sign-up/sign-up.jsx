import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.scss';

class SignUp extends React.Component {

    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props;
        const {displayName, email, password, confirmPassword} = this.state;
        
        if (password !== confirmPassword) {
            alert("password don't match");
            return;
        }

        signUpStart({ displayName, email, password});

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return(
            <div className="sign-up">
                <h2>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        label="Display name"
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm password"
                        onChange={this.handleChange}
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }

}


const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})


export default connect(null, mapDispatchToProps)(SignUp);
