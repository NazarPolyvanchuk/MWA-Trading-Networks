import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchReport } from '../../redux/actions/report/actions';

import SellerReportItem from './SellerReportItem';

class SellerReportDetailItem extends React.Component {

  constructor(props) {
    super(props);
    const { match: { params: { _id: reportId } } } = props;
    fetchReport(reportId);
  }

  render() {
    const emptyMessage = (
      <p>На даний момент товару немає!</p>
    );

    const cargos = [];
  
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
          <div className="info">Дата: </div>
          <div className="info">Продавець: </div>
          <div className="info">Підрозділ: </div>
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
              {/* {cargos.map(cargo => (
                <tr>
                    <td data-label="Фото">
                        <div className="image">
                            <img src={cargo.cover} alt="Cargo Cover" />
                        </div>
                    </td>
                    <td data-label="Назва товару">{cargo.title}</td>      
                    <td data-label="Ціна товару">{`${cargo.sellPrice} ГРН / шт`}</td>
                    <td data-label="Категорія товару">{cargo.category.name}</td>
                    <td data-label="Продано шт.">{`${cargo.amount} шт`}</td>
                </tr>
              ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reports }) => ({
  reports,
});

const mapDispatchToProps = dispatch => ({
  getReport: id => dispatch(fetchReport(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerReportDetailItem);
