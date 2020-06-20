import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReportsList from './ReportsList';

class ReportsPageAdmin extends React.Component {
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
            <h1 className="ui header">Список звітів</h1>
            <ReportsList />
          </div>
        </div>
    )}
}

export default ReportsPageAdmin;