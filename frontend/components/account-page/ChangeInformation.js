import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import Error from '../ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';


const UPDATE_INFORMATION_MUTATION = gql`
  mutation UPDATE_INFORMATION_MUTATION ($email: String!, $name: String!) {
    updateInformation(email: $email, name: $name ) {
        id
        name
        email
    }
  }
`;
class ChangeInformation extends Component {

    state = {
        name: this.props.user.name,
        email: this.props.user.email,
    };
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
    return (

        <Mutation
            mutation={UPDATE_INFORMATION_MUTATION }
            variables={{name: this.state.name, email: this.state.email}}
            refetchQueries={[{query: CURRENT_USER_QUERY}]}
        >
            {(updateInformation, { error, loading, called }) => (
            <Form
                method="post"
                onSubmit={async e => {
                e.preventDefault();
                await updateInformation();
                }}
            >
                <fieldset disabled={loading} aria-busy={loading}>
                <h2>Update Your Information</h2>
                <Error error={error} />
                <label htmlFor="email">
                    email
                    <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.saveToState}
                    />
                </label>
                <button type="submit">Update!</button>
                </fieldset>
            </Form>
            )}
        </Mutation>
        );
    }
}

export default ChangeInformation;
