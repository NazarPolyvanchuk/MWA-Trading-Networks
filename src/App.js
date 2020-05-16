import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import Dashboard from './Dashboard/Dashboard';
import CargosPage from './Cargos/CargosPage';
import CargoFormPage from './Cargos/CargoFormPage';
import EmployeesPage from './Employees/EmployeesPage';
import EmployeeForm from './Employees/EmployeeForm';
import EmployeeFormPage from './Employees/EmployeeFormPage';
import SellCargosPage from './Seller/SellCargoPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={MainPage} />
        <div className="ui container">
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/cargos' component={CargosPage} />
          <Route path='/cargo/:_id' component={CargoFormPage} />
          <Route path='/employees' component={EmployeesPage} />
          <Route path='/employee/:_id' component={EmployeeFormPage} />
          <Route path='/sell-cargos' component={SellCargosPage} />
        </div>
      </div>
    );
  }
}

export default App;
