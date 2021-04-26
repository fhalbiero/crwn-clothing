import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

import { Container } from './styles';

const SignInAndSignUp = () => (
    <Container>
        <SignIn />
        <SignUp />
    </Container>
);

export default SignInAndSignUp;