import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import PropTypes from 'prop-types';
import Error from '../ErrorMessage';


const UPDATE_PASSWORD_MUTATION = gql`
  mutation UPDATE_PASSWORD_MUTATION ($oldPassword: String!, $password: String!, $confirmPassword: String!) {
    updatePassword(oldPassword: $oldPassword, password: $password, confirmPassword: $confirmPassword) {
        id
        name
        email
    }
  }
`;

class Reset extends Component {

    state = {
        confirmPassword: '',
        password: '',
        oldPassword: ''
    };
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
    return (
        <Mutation
            mutation={UPDATE_PASSWORD_MUTATION }
            variables={{oldPassword: this.state.oldPassword, password: this.state.password, confirmPassword: this.state.confirmPassword}}
        >
            {(updatePassword, { error, loading, called }) => (
            <Form
                method="post"
                onSubmit={async e => {
                e.preventDefault();
                await updatePassword();
                this.setState({ password: '', confirmPassword: '', oldPassword: '' });
                }}
            >
                <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
                <Error error={error} />
                {called && !error && !loading &&(
                    <p data-test="graphql-error">
                        <strong>Success</strong>
                    </p>
                )}
                <label htmlFor="oldPassword">
                    Current Password
                    <input
                    type="password"
                    name="oldPassword"
                    placeholder="current password"
                    value={this.state.oldPassword}
                    onChange={this.saveToState}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                    />
                </label>
                <label htmlFor="confirmPassword">
                    Password
                    <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                    />
                </label>
                <button type="submit">Reset!</button>
                </fieldset>
            </Form>
            )}
        </Mutation>
        );
    }
}

export default Reset;
