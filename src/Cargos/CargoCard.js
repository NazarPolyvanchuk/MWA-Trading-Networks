import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CargoCard({ cargo, deleteCargo }) {
  return (
    <div className="ui card">
      <div className="image">
        <img src={cargo.cover} alt="Cargo Cover" />
      </div>

      <div className="content">
        <div className="header">{cargo.title}</div>
        <div className="info">Price: {cargo.price}</div>
        <div className="info">Amount: {cargo.amount}</div>
        <div className="info">Category: {cargo.category}</div>
      </div>

      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/cargo/${cargo._id}`} className="ui basic button green">Edit</Link>
          <div className="ui basic button red" onClick={() => deleteCargo(cargo._id)}>Delete</div>
        </div>
      </div>
    </div>
  );
}

CargoCard.propTypes = {
  cargo: PropTypes.object.isRequired,
  deleteCargo: PropTypes.func.isRequired
}
