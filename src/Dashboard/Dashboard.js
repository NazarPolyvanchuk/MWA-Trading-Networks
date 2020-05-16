import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AreaChart from '../views/Area Chart';
import ColumnChart from '../views/Column Chart';
import PieChart from '../views/Pie Chart';

class Dashboard extends React.Component {
//   componentDidMount() {
//   }

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
            <h1 className="ui header">Dashboard</h1>
            <div className="ui content">
              <AreaChart />
              <ColumnChart />
              <PieChart />
            </div>
          </div>
      </div>
    );
  }
}

// EmployeesPage.propTypes = {
  
// }

export default Dashboard;
