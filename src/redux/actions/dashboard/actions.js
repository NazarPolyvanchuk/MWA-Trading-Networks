export const SET_DASHBOARD = 'SET_DASHBOARD';
export const DASHBOARD_FETCHED = 'DASHBOARD_FETCHED';

export const SET_INCOME_PLOT = 'SET_INCOME';
export const INCOME_PLOT_FETCHED = 'INCOME_FETCHED';

export const SET_PRODUCTS_PLOT = 'SET_INCOME';
export const PRODUCTS_PLOT_FETCHED = 'INCOME_FETCHED';

export const SET_EMPLOYEES_PLOT = 'SET_INCOME';
export const EMPLOYEES_PLOT_FETCHED = 'INCOME_FETCHED';

export const fetchDashboard = () => dispatch => {
  fetch('/api/analytics')
      .then(res => res.json())
      .then(data => dispatch(setDashboard(data)));
};

export const setDashboard = payload => ({
    type: SET_DASHBOARD,
    payload,
});

export const fetchIncomePlot = () => dispatch => {
  fetch('/api/analytics/income')
      .then(res => res.json())
      .then(data => dispatch(setIncomePlot(data)));
};

export const setIncomePlot = payload => ({
  type: SET_INCOME_PLOT,
  payload,
});

export const fetchProductsPlot = () => dispatch => {
  fetch('/api/analytics/products')
      .then(res => res.json())
      .then(data => dispatch(setProductsPlot(data)));
};

export const setProductsPlot = payload => ({
  type: SET_PRODUCTS_PLOT,
  payload,
});

export const fetchEmployeesPlot = () => dispatch => {
  fetch('/api/analytics/employees')
      .then(res => res.json())
      .then(data => dispatch(setEmployeesPlot(data)));
};

export const setEmployeesPlot = payload => ({
  type: SET_EMPLOYEES_PLOT,
  payload,
});
