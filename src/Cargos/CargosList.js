import React from 'react';
import PropTypes from 'prop-types';
import CargoCard from './CargoCard';

export default function CargosList({ cargos, categories, deleteCargo }) {
  const emptyMessage = (
    <p>На даний момент товару немає!</p>
  );

  const handleChangeCategory = (event) => {
    this.setState({
      category: JSON.parse(event.target.value),
    });
  }
  const cargosList = (
    <div>
      <div className="category-block">
        <label className="category-label">Категорія:</label>
        <select onChange={handleChangeCategory} value={JSON.stringify(cargos.category)}>
          {categories.map(item => (
            <option key={item._id} value={JSON.stringify(item)}>{item.name}</option>
          ))}
        </select>
      </div>
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
  categories: PropTypes.array.isRequired,
  deleteCargo: PropTypes.func.isRequired
}
