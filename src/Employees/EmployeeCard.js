import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function EmployeeCard({ employee, deleteEmployee }) {
  return (
    <tr>
      <td data-label="Name">{employee.name}</td>
      <td data-label="Surname">{employee.surname}</td>      
      <td data-label="Email">{employee.email}</td>
      <td data-label="Category">{employee.category.name}</td>
      <td data-label="Sallary">{`${employee.sallary} ГРН`}</td>
      <td data-label="Actions">
        <div className="ui two buttons">
          <Link to={`/employee/${employee._id}`} className="ui basic button green">Редагувати</Link>
          <div className="ui basic button red" onClick={() => deleteEmployee(employee._id)}>Видалити</div>
        </div>
      </td>
    </tr>
  );
}

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  deleteEmployee: PropTypes.func.isRequired
}
