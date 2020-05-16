import { SET_EMPLOYEES, EMPLOYEE_FETCHED, EMPLOYEE_UPDATED, EMPLOYEE_DELETED, ADD_EMPLOYEE } from '../actions/employee/actions';

export default function employees(state = [], action = {}) {
  switch(action.type) {
    case SET_EMPLOYEES:
      return action.employees;

    case EMPLOYEE_FETCHED:
      const index = state.findIndex(item => item._id === action.employee._id);

      if (index > -1) {
        return state.map(item => {
          if (item._id === action.employee._id) return action.employee;
          return item;
        });
      } else {
        return [
          ...state,
          action.employee
        ];
      }

    case EMPLOYEE_UPDATED:
      return state.map(item => {
        if (item._id === action.employee._id) return action.employee;
        return item;
      })

    case EMPLOYEE_DELETED:
      return state.filter(item => item._id !== action.employeeId);

    case ADD_EMPLOYEE:
      return [
        ...state,
        action.employee
      ];

    default: return state;
  }
}
