import React from 'react';
import Signup from '../components/Signup';

import Signin from '../components/Signin'
import styled from 'styled-components';

const columns = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 20px;
`;

const SignupPage = props => (
    <columns>
        <Signup />
        <Signin />
        <Signup />
    </columns>
)
export default SignupPage;