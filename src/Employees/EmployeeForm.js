import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

class EmployeeForm extends React.Component {
  state = {
    _id: this.props.Employee ? this.props.Employee._id : null,
    name: this.props.Employee ? this.props.Employee.name : '',
    surname: this.props.Employee ? this.props.Employee.surname : '',
    email: this.props.Employee ? this.props.Employee.email : '',
    category: this.props.Employee ? this.props.Employee.category : '',
    sallary: this.props.Employee ? this.props.Employee.sallary : 0,
    errors: {},
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.Employee._id,
      name: nextProps.Employee.name,
      surname: nextProps.Employee.surname,
      email: nextProps.Employee.email,
      category: nextProps.Employee.category,
      sallary: nextProps.Employee.sallary,
    });
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name]
      this.setState({
        [e.target.name] : e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name] : e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = {}
    if (this.state.name === '') errors.name = "Cant't be empty";
    if (this.state.surname === '') errors.surname = "Cant't be empty";
    if (this.state.email === '') errors.email = "Cant't be empty";
    if (this.state.category === '') errors.category = "Cant't be empty";
    if (this.state.sallary === '') errors.sallary = "Cant't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { _id, name, surname, email, category, sallary } = this.state;
      this.setState({ loading: true });
      this.props.saveEmployee({ _id, name, surname, email, category, sallary })
        .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));
    }
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
          <div className="item" activeClassName="active">
            New Employee
          </div>
          <div className="right menu">
            <NavLink className="ui item" activeClassName="active" exact to="/">
              <i className="calendar icon"></i>
              Logout
            </NavLink>
          </div>
        </div>
        <div className="ui segment">
          <form className={classnames("ui form", { loading: this.state.loading })} onSubmit={this.handleSubmit}>
            <div>
              { this.props.employee ? (
                <h1>Edit Employee</h1>
              ) : (
                <h1>Add new Employee</h1>
              )}
            </div>

            {!!this.state.errors.global &&
                <div className="ui negative message"><p>{this.state.errors.global}</p></div>
            }

            <div className={classnames('field add-item-field', { error: !!this.state.errors.name })}>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                id="name"
              />
              <span>{this.state.errors.name}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.surname })}>
              <label htmlFor="surname">Surname</label>
              <input
                name="surname"
                value={this.state.surname}
                onChange={this.handleChange}
                id="surname"
              />
              <span>{this.state.errors.surname}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.email })}>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type='email'
                value={this.state.email}
                onChange={this.handleChange}
                id="email"
              />
              <span>{this.state.errors.email}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.category })}>
              <label htmlFor="category">Category</label>
              <input
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
                id="category"
              />
              <span>{this.state.errors.category}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.sallary })}>
              <label htmlFor="sallary">Sallary</label>
              <input
                name="sallary"
                type='number'
                value={this.state.sallary}
                onChange={this.handleChange}
                id="sallary"
              />
              <span>{this.state.errors.sallary}</span>
            </div>

            <div className="field">
              <button className="ui primary button">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeeForm;
