import { combineReducers } from 'redux';

import cargos from './redux/reducers/cargos';
import employees from './redux/reducers/employees';
import categories from './redux/reducers/categories';
import reports from './redux/reducers/reports';
import dashboard from './redux/reducers/dashboard';

export default combineReducers({
  cargos,
  employees,
  categories,
  reports,
  dashboard,
});
