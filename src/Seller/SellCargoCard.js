import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SellCargoCard extends React.Component {

    state = {
        amount: this.props.cargo ? this.props.cargo.amount : 'Товару немає в наявності',
        errors: {},
        loading: false
      }

  componentWillReceiveProps(nextProps) {
      this.setState({
          amount: nextProps.cargo.amount,
        });
  }
  handleChange = (e) => {
      this.setState({ [e.target.name] : e.target.value });
  }
  render() { 
    const { cargo, sellCargo} = this.props;
    return (
     <tr>
      <td data-label="Фото">
        <div className="image">
           <img src={cargo.cover} alt="Cargo Cover" />
        </div>
      </td>
      <td data-label="Назва товару">{cargo.title}</td>      
      <td data-label="Ціна товару">{`${cargo.price} ГРН / шт`}</td>
      <td data-label="Кількість товару">{`${cargo.amount} шт`}</td>
      <td data-label="Категорія">{cargo.category}</td>
      <td data-label="Дії">
        <div className="ui two buttons">
            <form className="ui form">
            <div className="field add-sell-field">
              <label htmlFor="amount">Кількість</label>
              <input
                name="amount"
                type='number'
                value={this.state.amount}
                onChange={this.handleChange}
                id="amount"
              />
              <span>{this.state.errors.amount}</span>
            </div>
            <div className="ui basic button green" onClick={() => sellCargo(cargo._id, cargo.amount)}>Продати</div>
            </form>
        </div>
      </td>
    </tr>
    );
    }
  }

// SellCargoCard.propTypes = {
//   cargo: PropTypes.object.isRequired,
//   deleteCargo: PropTypes.func.isRequired
// }

export default SellCargoCard;