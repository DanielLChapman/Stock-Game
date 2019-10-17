import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import HomeStocksContainer from './HomeStockContainer';
import styled from 'styled-components';

const ALL_RANDOM_PROFILES_QUERY = gql`
    query ALL_RANDOM_PROFILES_QUERY {
        randomProfiles {
            id
            money
            stocks {
                id
                quantity
                purchasedAt
                stock {
                    name
                    id
                    symbol
                    opening
                    price
                }
            }
        }
    }
`;

const ProfilesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class HomeStocksContainers extends Component {
    render() {
        return (
            <div>
                <Query query={ALL_RANDOM_PROFILES_QUERY}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                            <ProfilesList >{data.randomProfiles.map(item => <HomeStocksContainer randomProfile={item} />)}</ProfilesList>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default HomeStocksContainers;