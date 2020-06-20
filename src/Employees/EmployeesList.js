import React from 'react';
import PropTypes from 'prop-types';
import EmployeeCard from './EmployeeCard';

class EmployeesList extends React.Component {
  render() {
    const { employees, deleteEmployee } = this.props;

    const emptyMessage = <p>На даний момент працівників немає!</p>;

    const employeesList = (
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
            {employees.map((employee) => (
              <EmployeeCard 
                employee={employee} 
                key={employee._id}
                eleteEmployee={deleteEmployee} 
              />
            ))}
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
}

EmployeesList.propTypes = {
  employees: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired
}

export default EmployeesList;