import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

class CargoForm extends React.Component {
  state = {
    _id: this.props.Cargo ? this.props.Cargo._id : null,
    title: this.props.Cargo ? this.props.Cargo.title : '',
    cover: this.props.Cargo ? this.props.Cargo.cover : 'https://placehold.it/200?text=No+Image',
    price: this.props.Cargo ? this.props.Cargo.price : '0$',
    amount: this.props.Cargo ? this.props.Cargo.amount : 0,
    category: this.props.Cargo ? this.props.Cargo.category : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.Cargo._id,
      title: nextProps.Cargo.title,
      cover: nextProps.Cargo.cover,
      price: nextProps.Cargo.price,
      amount: nextProps.Cargo.amount,
      category: nextProps.Cargo.category
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
    if (this.state.title === '') errors.title = "Cant't be empty";
    if (this.state.cover === '') errors.cover = "Cant't be empty";
    if (this.state.price === '') errors.price = "Cant't be empty";
    if (this.state.amount === '') errors.amount = "Cant't be empty";
    if (this.state.category === '') errors.category = "Cant't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { _id, title, cover, price, amount, category } = this.state;
      this.setState({ loading: true });
      this.props.saveCargo({ _id, title, cover, price, amount, category })
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
          <NavLink className="item" activeClassName="active" exact to="/cargo/new">
            New Cargo
          </NavLink>
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
              { this.props.Cargo ? (
                <h1>Edit Cargo</h1>
              ) : (
                <h1>Add new Cargo</h1>
              )}
            </div>

            {!!this.state.errors.global &&
              <div className="ui negative message"><p>{this.state.errors.global}</p></div>
            }

            <div className={classnames('field add-item-field', { error: !!this.state.errors.title })}>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                id="title"
              />
              <span>{this.state.errors.title}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.cover })}>
              <label htmlFor="cover">Cover URL</label>
              <input
                name="cover"
                value={this.state.cover}
                onChange={this.handleChange}
                id="cover"
              />
              <span>{this.state.errors.cover}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.price })}>
              <label htmlFor="price">Price</label>
              <input
                name="price"
                type='number'
                value={this.state.price}
                onChange={this.handleChange}
                id="price"
              />
              <span>{this.state.errors.price}</span>
            </div>

            <div className={classnames('field add-item-field', { error: !!this.state.errors.amount })}>
              <label htmlFor="amount">Amount</label>
              <input
                name="amount"
                type='number'
                value={this.state.amount}
                onChange={this.handleChange}
                id="amount"
              />
              <span>{this.state.errors.amount}</span>
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

            <div className="field">
              {this.state.cover !== '' &&
                <img src={this.state.cover} alt="cover" className="ui small bordered image"/>
              }
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

export default CargoForm;
