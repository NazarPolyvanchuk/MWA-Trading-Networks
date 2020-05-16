import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SellCargoCard extends React.Component {
    state = {
        amountItem: 0,
        value: 0,
    }
    handleChange = (e) => {
        const {cargo} = this.props;
        const {value, amountItem} = this.state;
        this.setState({
            amountItem: cargo.amount - e.target.value,
        });
        console.log('value, amountItem', value, amountItem);
        console.log('cargo.count', cargo.amount);
    }
    render() {
        const {cargo, sellCargo} = this.props;
        const {amountItem, value} = this.state;
        return (
            <div className="ui card">
                <div className="image">
                    <img src={cargo.cover} alt="Cargo Cover" />
                </div>

                <div className="content">
                    <div className="header">{cargo.title}</div>
                    <div className="info">Price: {cargo.price}</div>
                    <div className="info">Amount: {cargo.amount}</div>
                    <div className="info">Category: {cargo.category}</div>
                </div>

                <div className="extra content">
                    <label htmlFor="amount">Amount</label>
                    <input
                        name="amount"
                        value={value}
                        onChange={this.handleChange}
                        id="amount"
                    />
                    <div className="ui basic button green" onClick={() => sellCargo(amountItem)}>Sell</div>
                </div>
            </div>
        );
    }
}

export default SellCargoCard;
