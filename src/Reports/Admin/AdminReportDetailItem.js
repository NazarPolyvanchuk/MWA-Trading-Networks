import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { fetchReport } from '../../redux/actions/report/actions';

class SoldCargosList extends React.Component {

  componentDidMount() {
    const { fetchReport, match: { params: { _id: reportId } } } = this.props;
    fetchReport(reportId);
  }

  render() {
    const { report } = this.props;
    return (
      report && (<div className="ui container">
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
          <div className="item">Перегляд звіту</div>
          <div className="right menu">
            <NavLink className="ui item" activeClassName="active" exact to="/">
              <i className="calendar icon"></i>
              Вийти
            </NavLink>
          </div>
        </div>
        <div className="ui segment">
          <h1 className="ui header">Детальна інформацію по звіту</h1>
          <div className="info">Дата: {format(new Date(report.created_at), 'dd.MM.yyyy hh:mm')}</div>
          <div className="info">Продавець: {`${report.employee.name} ${report.employee.surname}`}</div>
          <div className="info">Підрозділ: {report.department.name}</div>
          <h3>Таблиця проданого товару</h3>
          <div className="table-container">
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>Назва товару</th>
                  <th>Ціна товару</th>
                  <th>Категорія товару</th>
                  <th>Продано шт.</th>
                </tr>
              </thead>
              <tbody>
              {report.products.map(cargo => (
                <tr>
                    <td data-label="Фото">
                        <div className="image">
                            <img src={cargo.cover} alt="Cargo Cover" />
                        </div>
                    </td>
                    <td data-label="Назва товару">{cargo.title}</td>      
                    <td data-label="Ціна товару">{`${cargo.sellPrice} ГРН / шт`}</td>
                    <td data-label="Категорія товару">{cargo.category.name}</td>
                    <td data-label="Продано шт.">{`${report.products.reduce((sum, item) => sum + Number(item.qty), 0)} шт`}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>)
    );
  }
}

const mapStateToProps = ({ reports: { currentItem } }) => {
  return {
    report: currentItem,
  };
};

const mapDispatchToProps = {
  fetchReport,
};

SoldCargosList.propTypes = {
  cargos: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(SoldCargosList);