import SearchStyles from './styles/SearchStyles';
import SearchBox from './SearchBox';
import React, { Component } from 'react';

import Form from './styles/Form';




class Search extends Component {
    state = {
        stock: {},
        symbol: '',
        data: {fake: ''},
        value: ''
    };

    handleChange = (event) => {
        this.setState({...this.state, symbol: event.target.value});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

    }

    render() {
        return (
            <SearchStyles data-test="search">
                <div className="search">
                    <div className="search-area">
                        <Form onSubmit={this.getSymbol}>
                            <label>
                            Stock Symbol: 
                            <input type="text" value={this.state.symbol} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </Form>
                    </div>
                    <div className="results">
                        <p>{this.state.symbol}</p>       
                        <SearchBox symbol={this.state.symbol} />            
                    </div>
                </div>

            </SearchStyles>
        );
    }
    
}

export default Search;