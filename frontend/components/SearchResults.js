import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React,{useState, Component, useEffect} from 'react';
import Error from './ErrorMessage';


const SEARCH_STOCK_QUERY = gql`
    query searchStocks($symbol: String!) {
        stockSearch(symbol: $symbol) {
            symbol
            price
            opening
            message
        }
    }
`;

class SearchResults extends Component {
    render() {
        return (
            <Query query={SEARCH_STOCK_QUERY} variables={{symbol: this.props.symbol}}>
                {({data, loading, error}) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <Error error={error} />
                    console.log(data);
                    return (
                        <div>{this.props.symbol}</div>
                    )
                }}
            </Query>
        )
    }
}

export default SearchResults;