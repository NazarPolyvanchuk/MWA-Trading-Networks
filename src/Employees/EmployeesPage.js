import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import EmployeesList from './EmployeesList';
import { fetchEmployees, deleteEmployee, updateEmployee } from '../redux/actions/employee/actions';
import { fetchCategories } from '../redux/actions/category/actions';

class EmployeesPage extends React.Component {

  state = {
    selectedCategory: '',
  };

  componentDidMount() {
    this.props.fetchEmployees();
    this.props.fetchCategories();
  }

  handleChangeCategory = (event) => {
    const id = event.target.value;

    this.setState({
      selectedCategory: id,
    }, () => {
      this.props.fetchEmployees(id);
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
            <h1 className="ui header">Список працівників</h1>
            <Link to="/employee/new" className="ui basic button green">Додати нового працівника</Link>
            <Link to="/categories" className="ui basic button green">Додати новий підрозділ</Link>
            <div className="category-block">
              <label className="category-label">Підрозділ:</label>
              <select onChange={this.handleChangeCategory} value={this.state.selectedCategory}>
                <option value="">Всі</option>
                {this.props.categories.map(item => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>
            <EmployeesList 
              employees={this.props.employees}
              deleteEmployee={this.props.deleteEmployee}
              updateEmployee={this.props.updateEmployee} 
            />
          </div>
      </div>
    );
  }
}

EmployeesPage.propTypes = {
  employees: PropTypes.array.isRequired,
  fetchEmployees: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired
}

function mapsStateToProps(state) {
  return {
    employees: state.employees,
    categories: state.categories
  }
}

export default connect(mapsStateToProps, { fetchCategories, fetchEmployees, deleteEmployee, updateEmployee })(EmployeesPage);
