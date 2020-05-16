import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import CargosList from './CargosList';
import { connect } from 'react-redux';
import { fetchCargos, deleteCargo, updateCargo } from '../actions/cargo/actions';

class CargosPage extends React.Component {
  componentDidMount() {
    this.props.fetchCargos();
  }

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
          <h1 className="ui header">Cargo List</h1>
          <Link to="/cargo/new" className="ui basic button green">Add New Cargo</Link>
          <CargosList cargos={this.props.cargos} deleteCargo={this.props.deleteCargo} updateCargo={this.props.updateCargo} />
        </div>
      </div>
    );
  }
}

CargosPage.propTypes = {
  cargos: PropTypes.array.isRequired,
  fetchCargos: PropTypes.func.isRequired,
  deleteCargo: PropTypes.func.isRequired
}

function mapsStateToProps(state) {
  return {
    cargos: state.cargos
  }
}

export default connect(mapsStateToProps, { fetchCargos, deleteCargo })(CargosPage);
