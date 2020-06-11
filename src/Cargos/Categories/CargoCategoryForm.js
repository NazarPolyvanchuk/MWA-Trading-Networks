import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

class CargoCategoryForm extends React.Component {
  state = {
    _id: this.props.cargoCategory ? this.props.cargoCategory._id : null,
    categoryName: this.props.cargoCategory ? this.props.cargoCategory.categoryName : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.cargoCategory._id,
      categoryName: nextProps.cargoCategory.categoryName,
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
    if (this.state.categoryName === '') errors.categoryName = "Будь ласка заповніть поле";
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { _id, categoryName } = this.state;
      this.setState({ loading: true });
      this.props.saveCargoCategory({ _id, categoryName })
        .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));
    }
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <NavLink className="item" activeClassName="active" exact to="/dashboard">
            <i className="home icon"></i>
            Моніторинг та аналіз
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/cargos">
            <i className="block layout icon"></i>
            Товари
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/employees">
            <i className="smile icon"></i>
            Працівники
          </NavLink>
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
              <h1>Додати нову категорію товару</h1>
            </div>

            {!!this.state.errors.global &&
              <div className="ui negative message"><p>{this.state.errors.global}</p></div>
            }

            <div className={classnames('field add-item-field', { error: !!this.state.errors.categoryName })}>
              <label htmlFor="categoryName">Назва</label>
              <input
                name="categoryName"
                value={this.state.categoryName}
                onChange={this.handleChange}
                id="categoryName"
              />
              <span>{this.state.errors.categoryName}</span>
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

export default CargoCategoryForm;
