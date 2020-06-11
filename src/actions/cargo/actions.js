export const SET_CARGOS = 'SET_CARGOS';
export const ADD_CARGO = 'ADD_CARGO';
export const ADD_CARGO_CATEGORY = "ADD_CARGO_CATEGORY";
export const CARGO_CATEGORY_DELETED = "CARGO_CATEGORY_DELETED";
export const CARGO_FETCHED = 'CARGO_FETCHED';
export const CARGO_UPDATED = 'CARGO_UPDATED';
export const CARGO_DELETED = 'CARGO_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function fetchCargos() {
  return dispatch => {
    fetch('/api/cargos')
      .then(res => res.json())
      .then(data => dispatch(setCargos(data.cargos)));
  }
}

export function fetchCargo(id) {
  return dispatch => {
    fetch(`/api/cargos/${id}`)
      .then(res => res.json())
      .then(data => dispatch(cargoFetched(data.cargo)));
  }
}

export function setCargos(cargos) {
  return {
    type: SET_CARGOS,
    cargos
  }
}

export function addCargo(cargo) {
  return {
    type: ADD_CARGO,
    cargo
  }
}

export function addCargoCategory(category) {
  return {
    type: ADD_CARGO_CATEGORY,
    category
  }
}

export function cargoFetched(cargo) {
  return {
    type: CARGO_FETCHED,
    cargo
  }
}

export function cargoUpdated(cargo) {
  return {
    type: CARGO_UPDATED,
    cargo
  }
}

export function cargoDeleted(cargoId) {
  return {
    type: CARGO_DELETED,
    cargoId
  }
}

export function cargoCategoryDeleted(categoryId) {
  return {
    type: CARGO_CATEGORY_DELETED,
    categoryId
  }
}

export function saveCargo(data) {
  return dispatch => {
    return fetch('/api/cargos', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(addCargo(data.cargo)));
  }
}

export function saveCargoCategory(data) {
  return dispatch => {
    return fetch('/api/cargos', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(addCargoCategory(data.cargoCategory)));
  }
}

export function updateCargo(data) {
  return dispatch => {
    return fetch(`/api/cargos/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(cargoUpdated(data.cargo)));
  }
}

export function deleteCargo(id) {
  return dispatch => {
    return fetch(`/api/cargos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(cargoDeleted(id)));
  }
}

export function sellCargo(data) {
  return dispatch => {
    return fetch(`/api/sell-cargos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(cargoUpdated(data.amount)));
  }
}
