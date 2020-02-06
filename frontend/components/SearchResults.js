import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React,{useState, Component, useEffect} from 'react';


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
            <div>
                Hi
            </div>
        )
    }
}

export default SearchResults;