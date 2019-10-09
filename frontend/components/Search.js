import SearchStyles from './styles/SearchStyles';
import SearchBox from './SearchBox';
import React, { Component } from 'react';
import { stocks, stockIsTracked, find20Grouping, randomStock } from '../lib/stocks';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName: '',
            stock: {},
            data: {fake: ''}
        };


    };

    getStockName =  async (name) => {
        if (!stockIsTracked(name)) {
            return this.setState({
                stockName: 'Error'
            });
        }
        find20Grouping(name);


        //Will be a resolver from database, this is temporary for layouting
        /*
        stock: {
            name: 'Name',
            symbol: 'Symbol',
            opening: 0,
            current: 0,
            updatedAt: ,


        }

        */
       let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=demo`
        const response = await fetch(`${url}`);

        let teetnewjirnwejrnew = "test";
        const myJSON = await response.json();

        console.log(myJSON);
        if (myJSON['Global Quote']) {
            this.setState({
                stockName: name,
                data: myJSON['Global Quote']
            });
            return;
        };

        this.setState({
            stockName: 'Error',
            data: myJSON
        });
    }


    render() {
        let errorOutput = "";
        if(this.state.stockName === "Error") {
            errorOutput = <p>Symbol {this.state.stockName} was not found. You can request it by sending a request here: INSERT BUTTON</p>
        } 
        return (
            <SearchStyles data-test="search">
                <div className="search">
                    <div className="search-area">
                        <SearchBox getStockName={this.getStockName} />
                    </div>
                    <div className="results">
                        <p>{this.state.stockName}</p>
                        <ul>
                        {Object.keys(this.state.data).map((keyName, i) => (
                            <li className="temp" key={i}>
                                <span className="temp">key: {i} Name: {this.state.data[keyName]}</span>
                            </li>
                        ))}
                        </ul>
                        
                    </div>
                </div>

            </SearchStyles>
        );
    }
}

export default Search;