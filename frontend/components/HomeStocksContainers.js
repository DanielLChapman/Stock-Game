import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import HomeStocksContainer from './HomeStockContainer';

const ALL_RANDOM_PROFILES_QUERY = gql`
    query ALL_RANDOM_PROFILES_QUERY {
        randomProfiles {
            id
            money
            stock {
                id
                name
                symbol
                opening
                current
            }
        }
    }
`;

class HomeStocksContainers extends Component {
    render() {
        return (
            <div>
                <Query query={ALL_RANDOM_PROFILES_QUERY}>
                    {(payload) => {
                        console.log(payload);
                        return <HomeStocksContainer />
                    }}
                </Query>
            </div>
        );
    }
}

export default HomeStocksContainers;