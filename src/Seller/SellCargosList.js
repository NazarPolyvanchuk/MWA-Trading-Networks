import React from 'react';
import PropTypes from 'prop-types';
import SellCargoCard from './SellCargoCard';

export default function SellCargosList({ cargos, sellCargo }) {
  const emptyMessage = (
    <p>There are no cargos yet in your collection.</p>
  );

  const cargosList = (
    <div className="ui four cards">
      {  cargos.map(cargo => <SellCargoCard cargo={cargo} key={cargo._id} sellCargo={sellCargo} />) }
    </div>
  );

  return (
    <div>
      { cargos.length === 0 ? emptyMessage : cargosList }
    </div>
  );
}

SellCargosList.propTypes = {
  cargos: PropTypes.array.isRequired,
  sellCargo: PropTypes.func.isRequired
}
