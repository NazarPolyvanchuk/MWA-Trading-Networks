import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CargoCategoryItem({ category, deleteCargoCategory }) {
  return (
  <option>{category.categoryName}<div onClick={() => deleteCargoCategory(category._id)}>X</div></option>
  );
}

CargoCategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCargoCategory: PropTypes.func.isRequired
}
