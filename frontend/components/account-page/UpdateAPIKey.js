import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import Error from '../ErrorMessage';


const UPDATE_APIKEY_MUTATION = gql`
  mutation UPDATE_APIKEY_MUTATION ($apikey: String!) {
    updateAPIKey(apikey: $apikey ) {
        id
        name
        email
    }
  }
`;
class UpdateAPIKey extends Component {

    state = {
        apikey: this.props.user.apikey,
        
    };
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
    return (

        <Mutation
            mutation={UPDATE_APIKEY_MUTATION }
            variables={{apikey: this.state.apikey}}
        >
            {(updateAPIKey, { error, loading, called }) => (
            <Form
                method="post"
                onSubmit={async e => {
                e.preventDefault();
                await updateAPIKey();
                }}
            >
                <fieldset disabled={loading} aria-busy={loading}>
                <h2>Update Your Information</h2>
                <Error error={error} />
                {called && !error && !loading &&(
                    <p data-test="graphql-error">
                        <strong>Success</strong>
                    </p>
                )}
                <label htmlFor="apikey">
                    Api Key (Grab one <a href="https://www.alphavantage.co/support/#api-key">here!</a>)
                    <input
                    type="text"
                    name="apikey"
                    placeholder="apikey"
                    value={this.state.apikey}
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

export default UpdateAPIKey;
