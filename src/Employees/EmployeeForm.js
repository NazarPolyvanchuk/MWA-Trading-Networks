import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/category/actions';

class EmployeeForm extends React.Component {
  state = {
    _id: this.props.employee ? this.props.employee._id : null,
    name: this.props.employee ? this.props.employee.name : '',
    surname: this.props.employee ? this.props.employee.surname : '',
    email: this.props.employee ? this.props.employee.email : '',
    category: this.props.employee ? this.props.employee.category : '',
    sallary: this.props.employee ? this.props.employee.sallary : 0,
    errors: {},
    loading: false
  }

  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  componentWillReceiveProps(nextProps) {

    const { employee } = nextProps;
    if (employee) {
      this.setState({
        _id: employee._id,
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        category: employee.category,
        sallary: employee.sallary,
      });
    }
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

  handleChangeCategory = (event) => {
    this.setState({
      category: JSON.parse(event.target.value),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = {}
    if (this.state.name === '') errors.name = "Будь ласка заповніть поле";
    if (this.state.surname === '') errors.surname = "Будь ласка заповніть поле";
    if (this.state.email === '') errors.email = "Будь ласка заповніть поле";
    if (this.state.category === '') errors.category = "Будь ласка виберіть підрозділ";
    if (this.state.sallary === '') errors.sallary = "Будь ласка заповніть поле";
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
    const { categories } = this.props;

    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <NavLink className="item" activeClassName="active" exact to="/dashboard">
            <i className="home icon"></i>
            Головна сторінка
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/cargos">
            <i className="block layout icon"></i>
            Товари
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/employees">
            <i className="smile icon"></i>
            Працівники
          </NavLink>
          <div className="item" activeClassName="active">
            Додавання працівника
          </div>
          <div className="right menu">
            <NavLink className="ui item" activeClassName="active" exact to="/">
              <i className="calendar icon"></i>
              Вийти
            </NavLink>
          </div>
        </div>
        <div className="ui segment">
          <form className={classnames("ui form", { loading: this.state.loading })} onSubmit={this.handleSubmit}>
            <div>
              { this.props.employee ? (
                <h1>Редагувати працівника</h1>
              ) : (
                <h1>Додати нового працівника</h1>
              )}
            </div>

            {!!this.state.errors.global &&
                <div className="ui negative message"><p>{this.state.errors.global}</p></div>
            }

            <div className={classnames('field add-item-field', { error: !!this.state.errors.name })}>
              <label htmlFor="name">Ім'я</label>
              <input
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                id="name"
              />
              <span>{this.state.errors.name}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.surname })}>
              <label htmlFor="surname">Прізвище</label>
              <input
                name="surname"
                value={this.state.surname}
                onChange={this.handleChange}
                id="surname"
              />
              <span>{this.state.errors.surname}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.email })}>
              <label htmlFor="email">Електронна пошта</label>
              <input
                name="email"
                type='email'
                value={this.state.email}
                onChange={this.handleChange}
                id="email"
              />
              <span>{this.state.errors.email}</span>
            </div>

            <div className="field add-item-field">
              <label>Підрозділ</label>
              <select onChange={this.handleChangeCategory} value={JSON.stringify(this.state.category)}>
                {categories.map(item => (
                  <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
                ))}
              </select>
            </div>


            <div className={classnames('field add-item-field', { error: !!this.state.errors.sallary })}>
              <label htmlFor="sallary">Заробітня плата</label>
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
              <button className="ui primary button">Зберегти</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = {
  fetchCategories,
};

const employeeFormWrapper = connect(mapStateToProps, mapDispatchToProps);

export default employeeFormWrapper(EmployeeForm);
