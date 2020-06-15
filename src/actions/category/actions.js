export const SET_CATEGORIES = 'SET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const CATEGORY_FETCHED = 'CATEGORY_FETCHED';
export const CATEGORIES_UPDATED = 'CATEGORIES_UPDATED';
export const CATEGORIES_DELETED = 'CATEGORIES_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function fetchCategories() {
  return dispatch => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => dispatch(setCategories(data.categories)));
  }
}

export const setCategories = categories => ({
    type: SET_CATEGORIES,
    categories,
});

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  }
}

export function categoryFetched(category) {
  return {
    type: CATEGORY_FETCHED,
    category,
  }
}

export function saveCategory(category) {
  return dispatch => {
    return fetch('/api/categories', {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => dispatch(addCategory(data.categories)));
  }
}
