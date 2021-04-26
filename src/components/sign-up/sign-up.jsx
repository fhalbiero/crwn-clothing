import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { signUpStart } from '../../redux/user/user.actions';

import { Container } from './styles';

const SignUp = ({ signUpStart }) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();        
        if (password !== confirmPassword) {
            alert("password don't match");
            return;
        }

        signUpStart({ displayName, email, password});
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    }

    return(
        <Container>
            <h2>I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput 
                    type="text"
                    name="displayName"
                    value={displayName}
                    label="Display name"
                    onChange={handleChange}
                    required
                />
                <FormInput 
                    type="email"
                    name="email"
                    value={email}
                    label="Email"
                    onChange={handleChange}
                    required
                />
                <FormInput 
                    type="password"
                    name="password"
                    value={password}
                    label="Password"
                    onChange={handleChange}
                    required
                />
                <FormInput 
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Confirm password"
                    onChange={handleChange}
                    required
                />

                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </Container>
    )

}


const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})


export default connect(null, mapDispatchToProps)(SignUp);
