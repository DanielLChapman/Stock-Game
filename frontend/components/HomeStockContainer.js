import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';

class HomeStockContainer extends Component {
    static propTypes = {
        randomProfile: PropTypes.object.isRequired,
    };
    //LEAVING AS IS, MOVING ONTO STOCK PURCHASING FOR INDIVIDUALS

    render() {
        return (
            <div>
                <p>Hi</p>
            </div>
        );
    }
}

export default HomeStockContainer;