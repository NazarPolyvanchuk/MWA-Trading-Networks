import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/category/actions';

class CargoForm extends React.Component {

  state = {
    _id: this.props.cargo ? this.props.cargo._id : null,
    title: this.props.cargo ? this.props.cargo.title : '',
    cover: this.props.cargo ? this.props.cargo.cover : 'https://placehold.it/200?text=No+Image',
    price: this.props.cargo ? this.props.cargo.price : '',
    sellPrice: this.props.cargo ? this.props.cargo.sellPrice : '',
    amount: this.props.cargo ? this.props.cargo.amount : '',
    category: this.props.cargo ? this.props.cargo.category : '',
    errors: {},
    loading: false
  }

  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  componentWillReceiveProps(nextProps) {

    const { cargo } = nextProps;
    if (cargo) {
      this.setState({
        _id: cargo._id,
        title: cargo.title,
        cover: cargo.cover,
        price: cargo.price,
        sellPrice: cargo.sellPrice,
        amount: cargo.amount,
        category: cargo.category
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
    if (this.state.title === '') errors.title = "Будь ласка заповніть поле";
    if (this.state.cover === '') errors.cover = "Будь ласка заповніть поле";
    if (this.state.price === '') errors.price = "Будь ласка заповніть поле";
    if (this.state.sellPrice === '') errors.sellPrice = "Будь ласка заповніть поле";
    if (this.state.amount === '') errors.amount = "Будь ласка заповніть поле";
    if (this.state.category === '') errors.category = "Будь виберіть категорію";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { _id, title, cover, price, sellPrice, amount, category } = this.state;
      this.setState({ loading: true });
      this.props.saveCargo({ _id, title, cover, price, sellPrice, amount, category })
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
          <NavLink className="item" activeClassName="active" exact to="/cargo/new">
            Додавання нового товару
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
              { this.props.cargo ? (
                <h1>Редагування товару</h1>
              ) : (
                <h1>Додати новий товар</h1>
              )}
            </div>

            {!!this.state.errors.global &&
              <div className="ui negative message"><p>{this.state.errors.global}</p></div>
            }

            <div className={classnames('field add-item-field', { error: !!this.state.errors.title })}>
              <label htmlFor="title">Назва</label>
              <input
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                id="title"
              />
              <span>{this.state.errors.title}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.cover })}>
              <label htmlFor="cover">Адреса зображення</label>
              <input
                name="cover"
                value={this.state.cover}
                onChange={this.handleChange}
                id="cover"
              />
              <span>{this.state.errors.cover}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.price })}>
              <label htmlFor="price">Ціна закупки</label>
              <input
                name="price"
                type='number'
                value={this.state.price}
                onChange={this.handleChange}
                id="price"
              />
              <span>{this.state.errors.price}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.sellPrice })}>
              <label htmlFor="sellPrice">Ціна продажу</label>
              <input
                name="sellPrice"
                type='number'
                value={this.state.sellPrice}
                onChange={this.handleChange}
                id="sellPrice"
              />
              <span>{this.state.errors.sellPrice}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.amount })}>
              <label htmlFor="amount">Кількість</label>
              <input
                name="amount"
                type='number'
                value={this.state.amount}
                onChange={this.handleChange}
                id="amount"
              />
              <span>{this.state.errors.amount}</span>
            </div>

            <div className="field add-item-field">
              <label>Категорія</label>
              <select onChange={this.handleChangeCategory} value={JSON.stringify(this.state.category)}>
                {categories.map(item => (
                  <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="field">
              {this.state.cover !== '' &&
                <img src={this.state.cover} alt="cover" className="ui small bordered image"/>
              }
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

const cargoFormWrapper = connect(mapStateToProps, mapDispatchToProps);

export default cargoFormWrapper(CargoForm);
