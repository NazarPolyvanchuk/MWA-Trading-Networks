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
        <div className="info">Ціна закупки: {`${cargo.price} ГРН`}</div>
        <div className="info">Ціна продажу: {`${cargo.sellPrice} ГРН`}</div>
        <div className="info">Кількість: {`${cargo.amount} шт`}</div>
        <div className="info">Категорія: {cargo.category.name}</div>
      </div>

      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/cargo/${cargo._id}`} className="ui basic button green">Редагувати</Link>
          <div className="ui basic button red" onClick={() => deleteCargo(cargo._id)}>Видалити</div>
        </div>
      </div>
    </div>
  );
}

CargoCard.propTypes = {
  cargo: PropTypes.object.isRequired,
  deleteCargo: PropTypes.func.isRequired
}
