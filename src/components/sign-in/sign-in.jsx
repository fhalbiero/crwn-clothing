import React from 'react';
import { connect } from 'react-redux';

import './sign-in.scss';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';


class SignIn extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
           email: "",
           password: ""  
        }
    }


    handleSubmit = async event => {
        event.preventDefault(); 
        const { emailSignInStart } = this.props;     
        const { email, password } = this.state;

        emailSignInStart(email, password);
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {email, password} = this.state;
        const { googleSignInStart } = this.props;
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
                        <CustomButton 
                            type="button"
                            onClick={ googleSignInStart } 
                            isGoogleSignIn> Sign in with Google 
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})


export default connect(null, mapDispatchToProps)(SignIn);