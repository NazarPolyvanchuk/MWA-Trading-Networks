import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import classnames from 'classnames';

import { saveCategory } from '../../redux/actions/category/actions';

class CargoCategoryForm extends React.Component {
  state = {
    _id: this.props.category ? this.props.category._id : null,
    name: this.props.category ? this.props.category.name : '',
    errors: {},
    loading: false,
    redirect: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.category._id,
      name: nextProps.category.name,
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
    if (this.state.name === '') errors.name = "Будь ласка заповніть поле";
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { _id, name } = this.state;
      this.setState({ loading: true });
      this.props.saveCategory({ _id, name }).then(() => { this.setState({ redirect: true, loading: false })});
        // .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }), <Redirect to="/cargos" /> ));
    }
  }

  render() {
    return (
      <div>
        { this.state.redirect ? (
          <Redirect to="/cargos" />
        ) : (
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
            <NavLink className="item" activeClassName="active" exact to="/reports">
              <i className="file alternate icon"></i>
              Звіти
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

              <div className={classnames('field add-item-field', { error: !!this.state.errors.name })}>
                <label htmlFor="name">Назва категорії</label>
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  id="name"
                />
                <span>{this.state.errors.name}</span>
              </div>

              <div className="field">
                <button className="ui primary button">Зберегти</button>
              </div>
            </form>
          </div>
        </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;

  if (match.params._id) {
    return {
      category: state.categories.find(item => item._id === match.params._id)
    }
  }

  return { category: null };
}

export default connect(mapStateToProps, { saveCategory })(CargoCategoryForm);
