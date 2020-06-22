import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="main-page-header">СИСТЕМА МОНІТОРИНГУ ТА АНАЛІЗУ РОБОТИ ТОРГОВОЇ МЕРЕЖІ</div>
        <div className="ui segment">
        <div className="ui center items">
          <div className="item">
            <div className="image">
              <img className="custom" src="https://image.flaticon.com/icons/png/512/786/786794.png" alt="" />
            </div>
            <div className="content">
              <a className="header">Адміністратор</a>
              <div className="meta">
                <span>Можливості:</span>
              </div>
              <div className="description">
                <ul className="ui list">
                  <li>Додавати товар</li>
                  <li>Додавати працівників</li>
                  <li>Додавати категорії товару</li>
                  <li>Додавати підрозділи працівників</li>
                  <li>Доступ до моніторингу та аналізу роботи торгової мережі</li>
                </ul>
              </div>
              <div className="extra">
                <Link to={"/dashboard"} className="ui basic button green">Вибрати</Link>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="image">
              <img className="custom" src="https://image.flaticon.com/icons/png/512/786/786753.png" alt="" />
            </div>
            <div className="content">
              <a className="header">Продавець</a>
              <div className="meta">
                <span>Можливості:</span>
              </div>
              <div className="description">
                <ul className="ui list">
                  <li>Переглядати товар</li>
                  <li>Формувати звіт проданого товару</li>
                </ul>
              </div>
              <div className="extra">
                <Link to={"/sell-cargos"} className="ui basic button green">Вибрати</Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  cargos: PropTypes.array.isRequired,
}

function mapsStateToProps(state) {
  return {
    cargos: state.cargos
  }
}

export default connect(mapsStateToProps)(MainPage);
