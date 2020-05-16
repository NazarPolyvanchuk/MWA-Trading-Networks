import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import EmployeesList from './EmployeesList';
import { connect } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../actions/employee/actions';
import EmployeeFormPage from './EmployeeFormPage';

class EmployeesPage extends React.Component {
  componentDidMount() {
    this.props.fetchEmployees();
  }

  render() {
    return (
      <div className="ui container">
          <div className="ui secondary pointing menu">
            <NavLink className="item" activeClassName="active" exact to="/dashboard">
              <i className="home icon"></i>
              Dashboard
            </NavLink>
            <NavLink className="item" activeClassName="active" exact to="/cargos">
              <i className="block layout icon"></i>
              Cargos
            </NavLink>
            <NavLink className="item" activeClassName="active" exact to="/employees">
              <i className="smile icon"></i>
              Employees
            </NavLink>
            <div className="right menu">
              <NavLink className="ui item" activeClassName="active" exact to="/">
                <i className="calendar icon"></i>
                Logout
              </NavLink>
            </div>
          </div>
          <div className="ui segment">
            <h1 className="ui header">Employees List</h1>
            <Link to="/employee/new" className="ui basic button green">Add New Employee</Link>
            <EmployeesList employees={this.props.employees} deleteEmployee={this.props.deleteEmployee}/>
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
    employees: state.employees
  }
}

export default connect(mapsStateToProps, { fetchEmployees, deleteEmployee })(EmployeesPage);
