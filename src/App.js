import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import MainPage from './AuthPage/MainPage';
import Dashboard from './Dashboard/Dashboard';

import CargosPage from './Cargos/CargosPage';
import CargoFormPage from './Cargos/CargoFormPage';
import CargoCategoryForm from './Cargos/Categories/CargoCategoryForm';

import EmployeesPage from './Employees/EmployeesPage';
import EmployeeFormPage from './Employees/EmployeeFormPage';

import SellCargosPage from './Seller/SellCargoPage'

import CreateReportForm from './Reports/Seller/CreateReportForm';
import AdminReportDetailItem from './Reports/Admin/AdminReportDetailItem';
import SellerReportDetailItem from './Reports/Seller/SellerReportDetailItem';
import ReportsPageAdmin from './Reports/Admin/ReportsPageAdmin';
import ReportsPageSeller from './Reports/Seller/ReportsPageSeller';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={MainPage} />
        <div className="ui container">
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/cargos' component={CargosPage} />
          <Route path='/cargo/:_id' component={CargoFormPage} />
          <Route path='/categories' component={CargoCategoryForm} />
          <Route path='/employees' component={EmployeesPage} />
          <Route path='/employee/:_id' component={EmployeeFormPage} />
          <Route path='/reports' component={ReportsPageAdmin} />
          <Route path='/seller-reports' component={ReportsPageSeller} />
          <Route path='/new/reports' component={CreateReportForm} />
          <Route path='/report/:_id' component={AdminReportDetailItem} />
          <Route path='/seller-report/:_id' component={SellerReportDetailItem} />
          <Route path='/sell-cargos' component={SellCargosPage} />
        </div>
      </div>
    );
  }
}

export default App;
