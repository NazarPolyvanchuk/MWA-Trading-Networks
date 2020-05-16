import React from 'react';
import PropTypes from 'prop-types';
import EmployeeCard from './EmployeeCard';

export default function EmployeesList({ employees, deleteEmployee }) {
  const emptyMessage = (
    <p>There are no employees yet in your collection.</p>
  );

  const employeesList = (
    <div className="table-container">
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Department</th>
          <th>Sallary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {  employees.map(employee => <EmployeeCard employee={employee} key={employee._id} deleteEmployee={deleteEmployee} />) }
      </tbody>
    </table>
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
  deleteEmployee: PropTypes.func.isRequired
}
