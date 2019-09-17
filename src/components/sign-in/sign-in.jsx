import React from 'react';

import './sign-in.scss';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { signInWithGoogle } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
           email: "",
           password: ""  
        }
    }


    handleSubmit = event => {
        event.preventDefault();      
        this.setState({email: "", password:""});
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {email, password} = this.state;
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        value={email} 
                        handleChange={this.handleChange}
                        required
                        label="Email"
                    />
                    <FormInput 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={this.handleChange}
                        required
                        label="Password"
                    />
                    <div className="buttons">
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton onClick={ signInWithGoogle } 
                            isGoogleSignIn> Sign in with Google 
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}


export default SignIn;