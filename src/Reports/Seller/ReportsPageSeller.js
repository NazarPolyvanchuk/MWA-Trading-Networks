import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SellerReportsList from './SellerReportsList';
import { fetchEmployees } from '../../redux/actions/employee/actions';

class ReportsPageSeller extends React.Component {

  render() {
      const { employees } = this.props;
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
            <h1 className="ui header">Список звітів</h1>
            <Link to="/new/reports" className="ui basic button green">Створити звіт</Link>
            <SellerReportsList />
          </div>
        </div>
    )}
}

function mapsStateToProps(state) {
  return {
    employees: state.employees
  }
}

export default connect(mapsStateToProps, { fetchEmployees })(ReportsPageSeller);;