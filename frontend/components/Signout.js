import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import styled from 'styled-components';

const SignoutButton = styled.button`
    background: none!important;
    border: none;
    cursor: pointer;
    font-size: 12px;
    text-transform: uppercase;
    margin-top: -10px;
    display: inline-block;
`;

const SIGN_OUT_MUTATION = gql`
mutation SIGN_OUT_MUTATION {
    signout {
        message
    }
}`;

const Signout = props => (
    <Mutation 
    mutation = {SIGN_OUT_MUTATION}
    refetchQueries={[{query: CURRENT_USER_QUERY}]}>
        {(signout) => <SignoutButton className=".a-button" onClick={signout}>Sign Out</SignoutButton>}
    </Mutation>
)

export default Signout;

export {SIGN_OUT_MUTATION};
