import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CargosList from './CargosList';
import { fetchCargos, deleteCargo, updateCargo } from '../redux/actions/cargo/actions';
import { fetchCategories } from '../redux/actions/category/actions';

class CargosPage extends React.Component {
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
          <NavLink className="item" activeClassName="active" exact to="/dashboard">
            <i className="home icon"></i>
            Моніторинг та аналіз
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/cargos">
            <i className="block layout icon"></i>
            Товари
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/employees">
            <i className="smile icon"></i>
            Працівники
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/reports">
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
          <Link to="/cargo/new" className="ui basic button green">Додати новий товар</Link>
          <Link to="/categories" className="ui basic button green">Додати нову категорію</Link>
          <div className="category-block">
            <label className="category-label">Категорія:</label>
            <select onChange={this.handleChangeCategory} value={this.state.selectedCategory}>
              <option value="">Всі</option>
              {this.props.categories.map(item => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
          <CargosList
            cargos={this.props.cargos}
            deleteCargo={this.props.deleteCargo} 
            updateCargo={this.props.updateCargo} 
          />
        </div>
      </div>
    );
  }
}
CargosPage.propTypes = {
  cargos: PropTypes.array.isRequired,
  fetchCargos: PropTypes.func.isRequired,
  deleteCargo: PropTypes.func.isRequired
}
function mapsStateToProps(state) {
  return {
    cargos: state.cargos,
    categories: state.categories
  }
}

export default connect(mapsStateToProps, { fetchCategories, fetchCargos, deleteCargo, updateCargo })(CargosPage);
