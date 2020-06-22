import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchDashboard,
  fetchIncomePlot,
} from '../redux/actions/dashboard/actions';

import AreaChart from "./views/Area Chart";
import ColumnChart from "./views/Column Chart";
import PieChart from "./views/Pie Chart";

const DashboardCard = ({
  title,
  subtitle = 'за останній місяць',
  data,
  unit = 'шт',
  color = 'sold',
}) => (
  <div className="ui card">
    <div className="content">
      <div className="header">{title}</div>
      <div className="meta">
        <span>{subtitle}</span>
      </div>
      <p className={`data-count ${color}`}>{`${data} ${unit}`}</p>
    </div>
  </div>
);

class Dashboard extends React.Component {
  componentDidMount() {
    const { fetchDashboard, fetchIncomePlot } = this.props;
    fetchDashboard();
    fetchIncomePlot();
  }

  render() {

    const { totalSold, totalBought, income, outcome, incomePlot } = this.props;

    const incomePlotData = incomePlot.map(item => ({
      x: new Date(item.created_at),
      y: item.value,
    }));

    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <NavLink
            className="item"
            activeClassName="active"
            exact
            to="/dashboard"
          >
            <i className="home icon"></i>
            Моніторинг та аналіз
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/cargos">
            <i className="block layout icon"></i>
            Товари
          </NavLink>
          <NavLink
            className="item"
            activeClassName="active"
            exact
            to="/employees"
          >
            <i className="smile icon"></i>
            Працівники
          </NavLink>
          <NavLink
            className="item"
            activeClassName="active"
            exact
            to="/reports"
          >
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
          <h1 className="ui header">Моніторинг та аналіз</h1>
          <div className="ui content">
            <div className="ui four cards">
              <DashboardCard
                title="Продано товарів"
                subtitle="за останній місяць"
                data={totalSold}
              />

              <DashboardCard
                title="Закуплено товарів"
                subtitle="за останній місяць"
                data={totalBought}
                color="bought"
              />

              <DashboardCard
                title="Витрачено коштів"
                subtitle="за останній місяць"
                data={outcome}
                unit="грн"
                color="wasted"
              />

              <DashboardCard
                title="Прибуток"
                subtitle="за останній місяць"
                data={income}
                unit="грн"
                color="profit"
              />
            </div>
          </div>
          <div className="ui segment">
            <AreaChart data={incomePlotData} />
          </div>
          <div className="ui segment">
            <ColumnChart />
          </div>
          <div className="ui segment">
            <PieChart />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  dashboard: {
    totalSold,
    totalBought,
    income,
    outcome,
    incomePlot,
  },
}) => ({
  totalSold,
  totalBought,
  income,
  outcome,
  incomePlot,
});

const mapDispatchToProps = {
  fetchDashboard,
  fetchIncomePlot,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
