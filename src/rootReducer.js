import { combineReducers } from 'redux';
import cargos from './reducers/cargos';
import employees from './reducers/employees';

export default combineReducers({
  cargos,
  employees
})
