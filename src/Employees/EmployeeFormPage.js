import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveEmployee, fetchEmployee, updateEmployee } from '../actions/employee/actions';
import EmployeeForm from './EmployeeForm';

class EmployeeFormPage extends React.Component {
  state = {
    redirect: false,
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params._id) {
      this.props.fetchEmployee(match.params._id);
    }
  }

  saveEmployee = ({ _id, name, surname, email, category, sallary }) => {
    if (_id) {
      return this.props.updateEmployee({ _id, name, surname, email, category, sallary })
        .then(
          () => { this.setState({ redirect: true })},
        );
    } else {
      return this.props.saveEmployee({ name, surname, email, category, sallary })
        .then(
          () => { this.setState({ redirect: true })},
        );
    }
  }

  render() {
    return (
      <div>
        { this.state.redirect ? (
          <Redirect to="/employees" />
        ) : (
          <EmployeeForm
            employee={this.props.Employee}
            saveEmployee={this.saveEmployee}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;

  if (match.params._id) {
    return {
      employee: state.employees.find(item => item._id === match.params._id)
    }
  }

  return { employee: null };
}

export default connect(mapStateToProps, { saveEmployee, fetchEmployee, updateEmployee })(EmployeeFormPage);
