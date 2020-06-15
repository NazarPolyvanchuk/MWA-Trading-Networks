import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui center aligned header">СИСТЕМА МОНІТОРИНГУ ТА АНАЛІЗУ РОБОТИ ТОРГОВОЇ МЕРЕЖІ</div>
        <div className="ui center items">
          <div className="item">
            <div className="image">
              <img className="custom" src="https://cdn.pixabay.com/photo/2014/04/03/09/58/man-309490_960_720.png" alt="" />
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
              <img className="custom" src="https://cdn.pixabay.com/photo/2014/04/03/09/58/man-309490_960_720.png" />
            </div>
            <div className="content">
              <a className="header">Продавець</a>
              <div className="meta">
                <span>Можливості:</span>
              </div>
              <div className="description">
                <ul className="ui list">
                  <li>Продавати товар</li>
                </ul>
              </div>
              <div className="extra">
                <Link to={"/sell-cargos"} className="ui basic button green">Вибрати</Link>
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
