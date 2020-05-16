import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import SellCargosList from './SellCargosList';
import { connect } from 'react-redux';
import { fetchCargos, sellCargo } from '../actions/cargo/actions';

class SellCargosPage extends React.Component {
  componentDidMount() {
    this.props.fetchCargos();
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <NavLink className="item" activeClassName="active" exact to="/cargos">
            <i className="block layout icon"></i>
            Cargos
          </NavLink>
          <div className="right menu">
            <NavLink className="ui item" activeClassName="active" exact to="/">
              <i className="calendar icon"></i>
              Logout
            </NavLink>
          </div>
        </div>
        <div className="ui segment">
          <h1 className="ui header">Cargo List for Sale</h1>
          <SellCargosList cargos={this.props.cargos} sellCargo={this.props.sellCargo} />
        </div>
      </div>
    );
  }
}

SellCargosPage.propTypes = {
  cargos: PropTypes.array.isRequired,
  fetchCargos: PropTypes.func.isRequired,
  sellCargo: PropTypes.func.isRequired
}

function mapsStateToProps(state) {
  return {
    cargos: state.cargos
  }
}

export default connect(mapsStateToProps, { fetchCargos, sellCargo })(SellCargosPage);
