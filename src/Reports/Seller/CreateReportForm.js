import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { MultiSelect } from "primereact/multiselect";

import { fetchCategories } from "../../redux/actions/category/actions";
import { fetchEmployees } from "../../redux/actions/employee/actions";
import { fetchCargos } from "../../redux/actions/cargo/actions";
import { saveReport } from "../../redux/actions/report/actions";

class CreateReportForm extends React.Component {
  state = {
    employee: "",
    department: "",
    selectedCargos: [],
    errors: {},
    loading: false,
  };

  componentDidMount() {
    const { fetchCategories, fetchEmployees, fetchCargos } = this.props;
    fetchCategories();
    fetchEmployees();
    fetchCargos();
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
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleChangeDepartment = (event) => {
    this.setState({
      department: JSON.parse(event.target.value),
    });
  };

  handleChangeEmployee = (event) => {
    this.setState({
      employee: JSON.parse(event.target.value),
    });
  };

  handleChangeCargo = (event) => {
    this.setState({
      cargo: JSON.parse(event.target.value),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { employee, department, selectedCargos } = this.state;
    const { saveReport } = this.props;

    saveReport({ employee, department, selectedCargos });

    // if (isValid) {
    //   const { _id, name, surname, email, category, sallary } = this.state;
    //   this.setState({ loading: true });
    //   this.props.saveEmployee({ _id, name, surname, email, category, sallary })
    //     .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));
    // }
  };

  changeCargoQuantity = (event, cargo) => {
    const selectedCargos = [ ...this.state.selectedCargos ];
    const index = selectedCargos.findIndex(item => item._id === cargo._id);
    
    if (index > -1) {
      let foundCargo = selectedCargos[index];
      foundCargo.qty = event.target.value;
      selectedCargos[index] = foundCargo;
      this.setState({ selectedCargos });
    }
  }

  render() {
    const { categories, employees, cargos } = this.props;

    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <NavLink className="item" exact to="/sell-cargos">
            <i className="block layout icon"></i>
            Товари
          </NavLink>
          <NavLink className="item" exact to="/seller-reports">
            <i className="file alternate icon"></i>
            Звіти
          </NavLink>
          <div className="item">Додавання звіту</div>
          <div className="right menu">
            <NavLink className="ui item" exact to="/">
              <i className="calendar icon"></i>
              Вийти
            </NavLink>
          </div>
        </div>
        <div className="ui segment">
          <form
            className={classnames("ui form", { loading: this.state.loading })}
            onSubmit={this.handleSubmit}
          >
            <div>
              <h1>Додати новий звіт</h1>
            </div>

            {!!this.state.errors.global && (
              <div className="ui negative message">
                <p>{this.state.errors.global}</p>
              </div>
            )}

            <div className="field add-item-field">
              <label>Ім'я та Прізвище</label>
              <select
                onChange={this.handleChangeEmployee}
                value={JSON.stringify(this.state.employee)}
              >
                <option value="">Виберіть</option>
                {employees.map((item) => (
                  <option key={item._id} value={JSON.stringify(item)}>
                    {item.name} {item.surname}
                  </option>
                ))}
              </select>
            </div>

            <div className="field add-item-field">
              <label>Підрозділ</label>
              <select
                onChange={this.handleChangeDepartment}
                value={JSON.stringify(this.state.category)}
              >
                <option value="">Виберіть</option>
                {categories.map((item) => (
                  <option key={item._id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field add-item-field">
              <label>Товари</label>
              <MultiSelect
                optionLabel="label"
                optionValue="value"
                maxSelectedLabels={0}
                value={this.state.selectedCargos}
                options={cargos.map((item) => ({
                  label: item.title,
                  value: item,
                }))}
                style={{ width: '450px' }}
                onChange={(e) => this.setState({ selectedCargos: e.value })}
                filter={true}
                filterPlaceholder="Пошук"
                placeholder="Виберіть товари"
              />
            </div>

            {/* <ReactSelectBox options={cargos.map(item => ({ value: item, label: item.title }))} /> */}

            {/* <div className="field add-item-field">
              <label>Товари</label>
              <select
                onChange={this.handleChangeCargo}
                value={JSON.stringify(this.state.cargo)}
                name="Товари" 
                multiple="" 
                className="ui fluid dropdown"
              >
                {cargos.map((item) => (
                  <option key={item._id} value={JSON.stringify(item)}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div> */}

            <div>
              <div className="table-container">
                <table className="ui celled table">
                  <thead>
                    <tr>
                      <th>Фото</th>
                      <th>Назва товару</th>
                      <th>Ціна товару</th>
                      <th>Кількість товару</th>
                      <th>Категорія товару</th>
                      <th>Продати шт.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.selectedCargos.map((cargo) => (
                      <tr key={cargo._id}>
                        <td data-label="Фото">
                          <div className="image">
                            <img src={cargo.cover} alt="Cargo Cover" />
                          </div>
                        </td>
                        <td data-label="Назва товару">{cargo.title}</td>
                        <td data-label="Ціна товару">{`${cargo.price} ГРН / шт`}</td>
                        <td data-label="Кількість товару">{`${cargo.amount} шт`}</td>
                        <td data-label="Категорія товару">{cargo.category.name}</td>
                        <td data-label="Продати шт.">
                          <div className="ui">
                            <div className="">
                              <label htmlFor="amount">Введіть кількість</label>
                              <input
                                name="amount"
                                type="number"
                                id="amount"
                                onChange={event => this.changeCargoQuantity(event, cargo)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!this.state.selectedCargos.length && (
                      <tr style={{ textAlign: 'center' }}>
                        <td colSpan="6">Не вибрано жодного товару</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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

const mapStateToProps = (state) => ({
  categories: state.categories,
  employees: state.employees,
  cargos: state.cargos,
});

const mapDispatchToProps = {
  fetchEmployees,
  fetchCargos,
  fetchCategories,
  saveReport,
};

const reportFormWrapper = connect(mapStateToProps, mapDispatchToProps);

export default reportFormWrapper(CreateReportForm);
