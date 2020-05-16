export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const EMPLOYEE_FETCHED = 'EMPLOYEE_FETCHED';
export const EMPLOYEE_UPDATED = 'EMPLOYEE_UPDATED';
export const EMPLOYEE_DELETED = 'EMPLOYEE_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function fetchEmployees() {
  return dispatch => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => dispatch(setEmployees(data.employees)));
  }
}

export function fetchEmployee(id) {
  return dispatch => {
    fetch(`/api/employees/${id}`)
      .then(res => res.json())
      .then(data => dispatch(employeeFetched(data.employee)));
  }
}

export function setEmployees(employees) {
  return {
    type: SET_EMPLOYEES,
    employees
  }
}

export function addEmployee(employee) {
  return {
    type: ADD_EMPLOYEE,
    employee
  }
}

export function employeeFetched(employee) {
  return {
    type: EMPLOYEE_FETCHED,
    employee
  }
}

export function employeeUpdated(employee) {
  return {
    type: EMPLOYEE_UPDATED,
    employee
  }
}

export function employeeDeleted(employeeId) {
  return {
    type: EMPLOYEE_DELETED,
    employeeId
  }
}

export function saveEmployee(data) {
  return dispatch => {
    return fetch('/api/employees', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(addEmployee(data.employee)));
  }
}

export function updateEmployee(data) {
  return dispatch => {
    return fetch(`/api/employees/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(employeeUpdated(data.employee)));
  }
}

export function deleteEmployee(id) {
  return dispatch => {
    return fetch(`/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(employeeDeleted(id)));
  }
}
