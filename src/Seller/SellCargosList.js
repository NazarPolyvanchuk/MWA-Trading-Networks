import React from 'react';
import PropTypes from 'prop-types';
import SellCargoCard from './SellCargoCard';

export default function SellCargosList({ cargos, categories, sellCargo }) {
  const emptyMessage = (
    <p>На даний момент товару немає!</p>
  );

  const cargosList = (
    <div>
      <div className="table-container">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Назва товару</th>
              <th>Ціна товару</th>
              <th>Кількість товару</th>
              <th>Категорія товару</th>
            </tr>
          </thead>
          <tbody>
          { cargos.map(cargo => <SellCargoCard cargo={cargo} key={cargo._id} sellCargo={sellCargo} />) }
          </tbody>
        </table>
      </div>
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
