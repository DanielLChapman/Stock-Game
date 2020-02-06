import React, { Component } from 'react';
import Form from './styles/Form';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.getSymbol(this.state.value);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <label>
                Stock (Name or Symbol):
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </Form>
        );
    }
}

export default SearchBox;