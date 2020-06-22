import {
  SET_DASHBOARD,
  SET_INCOME_PLOT,
  SET_PRODUCTS_PLOT,
  SET_EMPLOYEES_PLOT,
} from '../actions/dashboard/actions';

const defaultState = {
  totalSold: 0,
  totalBought: 0,
  outcome: 0,
  income: 0,
  incomePlot: [],
  productsPlot: [],
  employeesPlot: [],
};

const dashboardReducer = (
  state = defaultState,
  action = {}
) => {
  switch(action.type) {
    case SET_DASHBOARD:
      return {
        ...state,
        ...action.payload,
      };

    case SET_INCOME_PLOT:
      return {
        ...state,
        incomePlot: action.payload.data,
      };

    case SET_PRODUCTS_PLOT:
      return {
        ...state,
        productsPlot: action.payload.data,
      };

    case SET_EMPLOYEES_PLOT:
      return {
        ...state,
        employeesPlot: action.payload.data,
      };

    default:
      return state;
  }
}

export default dashboardReducer;
