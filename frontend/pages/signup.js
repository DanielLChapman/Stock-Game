import React from 'react';
import Signup from '../components/Signup';

import Signin from '../components/Signin'
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import AlreadyLoggedIn from '../components/AlreadyLoggedIn';

const Columns = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 20px;
`;

const SignupPage = props => (
   <AlreadyLoggedIn>
        <Columns>
            <Signup />
            <Signin />
            <RequestReset />
        </Columns>
   </AlreadyLoggedIn>
    
)
export default SignupPage;