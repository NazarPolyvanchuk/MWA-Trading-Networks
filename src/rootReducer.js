import { combineReducers } from 'redux';
import cargos from './reducers/cargos';
import employees from './reducers/employees';
import categories from './reducers/categories';

export default combineReducers({
  cargos,
  employees,
  categories,
})
