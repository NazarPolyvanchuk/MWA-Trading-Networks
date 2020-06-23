import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SellerReportsList from './SellerReportsList';
import { fetchReports } from '../../redux/actions/report/actions';

class ReportsPageSeller extends React.Component {

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
            <h1 className="ui header">Список звітів</h1>
            <Link to="/new/reports" className="ui basic button green">Створити звіт</Link>
            <SellerReportsList />
          </div>
        </div>
    )}
}

function mapsStateToProps(state) {
  return {
    reports: state.reports
  }
}

export default connect(mapsStateToProps, { fetchReports })(ReportsPageSeller);;