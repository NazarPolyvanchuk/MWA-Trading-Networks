import React from 'react';
import PropTypes from 'prop-types';
import EmployeeCard from './EmployeeCard';

export default function EmployeesList({ employees, categories, deleteEmployee }) {
  const emptyMessage = (
    <p>На даний момент працівників немає!</p>
  );

  const handleChangeCategory = (event) => {
    this.setState({
      category: JSON.parse(event.target.value),
    });
  }
  const employeesList = (
    <div>
      <div className="category-block">
        <label className="category-label">Підрозділ:</label>
        <select onChange={handleChangeCategory} value={JSON.stringify(employees.category)}>
          {categories.map(item => (
            <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="table-container">
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Email</th>
            <th>Підрозділ</th>
            <th>Зарплата</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {  employees.map(employee => <EmployeeCard employee={employee} key={employee._id} deleteEmployee={deleteEmployee} />) }
        </tbody>
      </table>
      </div>
    </div>
  );

  return (
    <div>
      { employees.length === 0 ? emptyMessage : employeesList }
    </div>
  );
}

EmployeesList.propTypes = {
  employees: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired
}
