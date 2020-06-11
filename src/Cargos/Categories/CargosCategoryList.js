import React from 'react';
import PropTypes from 'prop-types';
import CargoCategoryItem from './CargoCategoryItem';

export default function CargosCategoryList({ cargosCategories, deleteCargoCategory }) {
  const emptyMessage = (
    <p>На даний момент категорій товару немає!</p>
  );

  const cargosCategoryList = (
    <select class="ui dropdown">
      <option value="">Категорія</option>
      { cargosCategories.map(category => <CargoCategoryItem category={category} key={category._id} deleteCargoCategory={deleteCargoCategory} />)}
    </select> 
  );

  return (
    <div>
      { cargosCategories.length === 0 ? emptyMessage : cargosCategoryList }
    </div>
  );
}

CargosCategoryList.propTypes = {
  cargosCategories: PropTypes.array.isRequired,
  deleteCargoCategory: PropTypes.func.isRequired
}
