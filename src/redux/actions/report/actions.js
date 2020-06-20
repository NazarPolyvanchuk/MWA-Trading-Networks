export const SET_REPORTS = 'SET_REPORTS';
export const ADD_REPORT = 'ADD_REPORT';
export const REPORT_FETCHED = 'REPORT_FETCHED';
export const REPORT_DELETED = 'REPORT_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function fetchReports() {
  return dispatch => {
    return fetch('/api/reports')
      .then(res => res.json())
      .then(data => dispatch(setReports(data.reports)));
  }
}

export function fetchReport(id) {
  return dispatch => {
    fetch(`/api/reports/${id}`)
      .then(res => res.json())
      .then(data => dispatch(reportFetched(data.report)));
  }
}

export function setReports(reports) {
  return {
    type: SET_REPORTS,
    reports
  }
}

export function addReport(report) {
  return {
    type: ADD_REPORT,
    report
  }
}

export function reportFetched(report) {
  return {
    type: REPORT_FETCHED,
    report
  }
}

export function reportDeleted(reportId) {
  return {
    type: REPORT_DELETED,
    reportId
  }
}

export function saveReport(data) {
  return dispatch => {
    return fetch('/api/reports', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    // .then(handleResponse)
    .then(data => dispatch(addReport(data.report)));
  }
}

export function deleteReport(id) {
  return dispatch => {
    return fetch(`/api/reports/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    // .then(handleResponse)
    .then(data => dispatch(reportDeleted(id)));
  }
}
