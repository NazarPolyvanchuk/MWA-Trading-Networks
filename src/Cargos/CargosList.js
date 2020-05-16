import React from 'react';
import PropTypes from 'prop-types';
import CargoCard from './CargoCard';

export default function CargosList({ cargos, deleteCargo }) {
  const emptyMessage = (
    <p>There are no cargos yet in your collection.</p>
  );

  const cargosList = (
    <div>
      <select class="ui dropdown">
        <option value="">Category</option>
        <option value={cargos.category === 'Food'}>Food</option>
        <option value={cargos.category === 'Fruits and Vegetables'}>Fruits and Vegetables</option>
        <option value={cargos.category === 'Water'}>Water</option>
        <option value={cargos.category === 'Alcohol'}>Alcohol</option>
        <option value={cargos.category === 'Other'}>Other</option>
      </select> 
      <div className="ui four cards">
        {  cargos.map(cargo => <CargoCard cargo={cargo} key={cargo._id} deleteCargo={deleteCargo} />) }
      </div>
    </div>
  );

  return (
    <div>
      { cargos.length === 0 ? emptyMessage : cargosList }
    </div>
  );
}

CargosList.propTypes = {
  cargos: PropTypes.array.isRequired,
  deleteCargo: PropTypes.func.isRequired
}
