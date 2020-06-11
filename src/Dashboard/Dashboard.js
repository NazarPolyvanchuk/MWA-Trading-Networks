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
            <div className="right menu">
              <NavLink className="ui item" activeClassName="active" exact to="/">
                <i className="calendar icon"></i>
                Вийти
              </NavLink>
            </div>
          </div>
          <div className="ui segment">
            <h1 className="ui header">Моніторинг та аналіз</h1>
            <div className="ui content">
              <div className="ui four cards">
                <div className="ui card">
                  <div className="content">
                    <div className="header">Продано товарів</div>
                    <div className="meta">
                      <span>протягом місяця</span>
                    </div>
                    <p>68</p>
                  </div>
                </div>
                <div className="ui card">
                  <div className="content">
                    <div className="header">Закуплено товарів</div>
                    <div className="meta">
                      <span>протягом місяця</span>
                    </div>
                    <p>35</p>
                  </div>
                </div>
                <div className="ui card">
                  <div className="content">
                    <div className="header">Витрачено коштів</div>
                    <div className="meta">
                      <span>протягом місяця</span>
                    </div>
                    <p>56000 ГРН</p>
                  </div>
                </div>
                <div className="ui card">
                  <div className="content">
                    <div className="header">Виручка</div>
                    <div className="meta">
                      <span>протягом місяця</span>
                    </div>
                    <p>89000 ГРН</p>
                  </div>
                </div>
              </div>
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
