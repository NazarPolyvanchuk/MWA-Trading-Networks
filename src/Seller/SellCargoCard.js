import React from 'react';

class SellCargoCard extends React.Component {
  render() { 
    const { cargo } = this.props;
    return (
     <tr>
      <td data-label="Фото">
        <div className="image">
           <img src={cargo.cover} alt="Cargo Cover" />
        </div>
      </td>
      <td data-label="Назва товару">{cargo.title}</td>      
      <td data-label="Ціна товару">{`${cargo.sellPrice} ГРН / шт`}</td>
      <td data-label="Кількість товару">{`${cargo.amount} шт`}</td>
      <td data-label="Категорія">{cargo.category.name}</td>
    </tr>
    );
    }
  }

// SellCargoCard.propTypes = {
//   cargo: PropTypes.object.isRequired,
//   deleteCargo: PropTypes.func.isRequired
// }

export default SellCargoCard;