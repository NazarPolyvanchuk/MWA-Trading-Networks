import React from 'react';
import PropTypes from 'prop-types';
import CargoCard from './CargoCard';
import CargosCategoryList from './Categories/CargosCategoryList';

export default function CargosList({ cargos, deleteCargo, cargosCategories, deleteCargoCategory }) {
  const emptyMessage = (
    <p>На даний момент товару немає!</p>
  );

  const cargosList = (
    <div>
      {/* <CargosCategoryList cargosCategories={cargosCategories} deleteCargoCategory={deleteCargoCategory} /> */}
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
