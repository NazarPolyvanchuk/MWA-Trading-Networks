import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveCargo, fetchCargo, updateCargo } from '../actions/cargo/actions';
import CargoForm from './CargoForm';

class CargoFormPage extends React.Component {
  state = {
    redirect: false,
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params._id) {
      this.props.fetchCargo(match.params._id);
    }
  }

  saveCargo = ({ _id, title, cover, price, sellPrice, amount, category }) => {
    if (_id) {
      return this.props.updateCargo({ _id, title, cover, price, sellPrice, amount, category })
        .then(
          () => { this.setState({ redirect: true })},
        );
    } else {
      return this.props.saveCargo({ title, cover, price, sellPrice, amount, category })
        .then(
          () => { this.setState({ redirect: true })},
        );
    }
  }

  render() {
    return (
      <div>
        { this.state.redirect ? (
          <Redirect to="/cargos" />
        ) : (
          <CargoForm
            cargo={this.props.cargo}
            saveCargo={this.saveCargo}
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
      cargo: state.cargos.find(item => item._id === match.params._id)
    }
  }

  return { cargo: null };
}

export default connect(mapStateToProps, { saveCargo, fetchCargo, updateCargo })(CargoFormPage);
