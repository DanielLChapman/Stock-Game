import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React,{useState, Component, useEffect} from 'react';
import Error from './ErrorMessage';
import { checkPropTypes } from 'prop-types';
import ULStyles from './styles/ULStyles';

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

function calculateChange(opening, close) {
    let change = close-opening;
    let percentChange = change/opening;
    return {
        change: Math.round(change*100)/100,
        percentChange: Math.round(percentChange*10000)/100
    }
}

class SearchResults extends Component {


    render() {
        let ccString = 'Closing Price: ';
        let time = new Date();
        if ((time.getHours() < 16 && time.getHours() >= 9)) {
            ccString = 'Current: ';
        }
        if (time.getHours === 16 && time.getMinutes <= 30) {
            ccString = 'Current: ';
        }
        return (
            <Query query={SEARCH_STOCK_QUERY} variables={{symbol: this.props.symbol}}>
                {({data, loading, error}) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <Error error={error} />
                    let results;
                    if (data) {
                        results = calculateChange(data.stockSearch.opening, data.stockSearch.price);
                        console.log(results);
                    }
                    let color;
                    if (results.change > 0) { color = 'green' };
                    if (results.change === 0) { color = 'black' };
                    if (results.change < 0) { color = 'red' };
                    return (
                       <ULStyles>
                           <li>Symbol: {data.stockSearch.symbol}</li>
                           <li>Opening: {data.stockSearch.opening}</li>
                           <li>{ccString} {data.stockSearch.price}</li>
                            
                           <li>Change: <span style={{color: color}}>{results.change}</span></li>
                           <li>Percent Change: <span style={{color: color}}>{results.percentChange}%</span></li>
                            <li>Purchase: <a href="#">BUY</a></li>
                       </ULStyles>
                    )
                }}
            </Query>
        )
    }
}

export default SearchResults;