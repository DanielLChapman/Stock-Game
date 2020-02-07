import React,{useState, Component, useEffect} from 'react';
import SearchStyles from './styles/SearchStyles';
import SearchBox from './SearchBox';
import gql from 'graphql-tag';
import { useLazyQuery } from "@apollo/react-hooks";
import SearchResults from './SearchResults';

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

function Search() {
    const [symbol, setSymbol] = useState('');
    const [hasSearched, setSearch] = useState('false');

    const getSymbol = ((symbol) => {

        setSymbol(symbol);
        setSearch(true);
    })


    return (
        <SearchStyles data-test="search">
        <div className="search">
            <div className="search-area">
                <SearchBox getSymbol={getSymbol} />
            </div>
            <div className="results">
                {symbol}
                {hasSearched && symbol.length > 0 && 
                    <SearchResults symbol={symbol}/>
                }
            </div>
        </div>

    </SearchStyles>
    )

}

export default Search;