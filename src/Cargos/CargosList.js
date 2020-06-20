import React from "react";
import PropTypes from "prop-types";
import CargoCard from "./CargoCard";

class CargosList extends React.Component {
  render() {
    const { cargos, deleteCargo } = this.props;

    const emptyMessage = <p>На даний момент товару немає!</p>;

    const cargosList = (
      <div>
        <div className="ui four cards">
          {cargos.map((cargo) => (
            <CargoCard
              cargo={cargo}
              key={cargo._id}
              deleteCargo={deleteCargo}
            />
          ))}
        </div>
      </div>
    );

    return <div>{cargos.length === 0 ? emptyMessage : cargosList}</div>;
  }
}

CargosList.propTypes = {
  cargos: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  deleteCargo: PropTypes.func.isRequired,
};

export default CargosList;
