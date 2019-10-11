import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';

class HomeStockContainer extends Component {
    static propTypes = {
        randomProfile: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div>
                <p>Hi</p>
            </div>
        );
    }
}

export default HomeStockContainer;