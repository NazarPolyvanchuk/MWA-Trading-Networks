import { SET_REPORTS, REPORT_FETCHED, REPORT_DELETED, ADD_REPORT } from '../actions/report/actions';

export default function reports(state = [], action = {}) {
  switch(action.type) {
    case SET_REPORTS:
      return action.reports || [];

    case REPORT_FETCHED:
      const index = state.findIndex(item => item._id === action.report._id);

      if (index > -1) {
        return state.map(item => {
          if (item._id === action.report._id) return action.report;
          return item;
        });
      } else {
        return [
          ...state,
          action.report
        ];
      }

    case REPORT_DELETED:
      return state.filter(item => item._id !== action.reportId);

    case ADD_REPORT:
      return [
        ...state,
        action.report
      ];

 

    default: return state;
  }
}
