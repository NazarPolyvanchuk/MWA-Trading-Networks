import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SellCargosList from './SellCargosList';
import { connect } from 'react-redux';
import { fetchCargos, sellCargo } from '../redux/actions/cargo/actions';
import { fetchCategories } from '../redux/actions/category/actions';

class SellCargosPage extends React.Component {

  state = {
    selectedCategory: '',
  };

  componentDidMount() {
    this.props.fetchCargos();
    this.props.fetchCategories();
  }

  handleChangeCategory = (event) => {
    const id = event.target.value;

    this.setState({
      selectedCategory: id,
    }, () => {
      this.props.fetchCargos(id);
    });
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <NavLink className="item" activeClassName="active" exact to="/sell-cargos">
            <i className="block layout icon"></i>
            Товари
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/seller-reports">
            <i className="file alternate icon"></i>
            Звіти
            </NavLink>
          <div className="right menu">
            <NavLink className="ui item" activeClassName="active" exact to="/">
              <i className="calendar icon"></i>
              Вийти
            </NavLink>
          </div>
        </div>
        <div className="ui segment">
          <h1 className="ui header">Список товарів</h1>
          <div className="category-block">
            <label className="category-label">Категорія:</label>
            <select onChange={this.handleChangeCategory} value={this.state.selectedCategory}>
              <option value="">Всі</option>
              {this.props.categories.map(item => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
          <SellCargosList 
            cargos={this.props.cargos}
            sellCargo={this.props.sellCargo} 
          />
        </div>
      </div>
    );
  }
}

SellCargosPage.propTypes = {
  cargos: PropTypes.array.isRequired,
  fetchCargos: PropTypes.func.isRequired,
  sellCargo: PropTypes.func.isRequired
}

function mapsStateToProps(state) {
  return {
    cargos: state.cargos,
    categories: state.categories
  }
}

export default connect(mapsStateToProps, { fetchCategories, fetchCargos, sellCargo })(SellCargosPage);
