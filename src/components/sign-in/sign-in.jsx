import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import { Container } from './styles';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    
    const [ userCredentials, setCredentials ] = useState({email: '', password: ''});
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault(); 
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setCredentials({...userCredentials, [name]: value});
    }

    return (
        <Container>
            <h2>I already have an account</h2>
            <span>sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    value={email} 
                    handleChange={handleChange}
                    required
                    label="Email"
                />
                <FormInput 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handleChange}
                    required
                    label="Password"
                />
                <div className="buttons">
                    <CustomButton type="submit"> Sign in </CustomButton>
                    <CustomButton 
                        type="button"
                        onClick={ googleSignInStart } 
                        isGoogleSignIn> Sign in with Google 
                    </CustomButton>
                </div>
                
            </form>
        </Container>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})


export default connect(null, mapDispatchToProps)(SignIn);