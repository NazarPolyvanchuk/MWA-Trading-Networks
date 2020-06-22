import { SET_REPORTS, REPORT_FETCHED, REPORT_DELETED, ADD_REPORT } from '../actions/report/actions';

const defaultState = {
  items: [],
  currentItem: null,
};

export default function reports(state = defaultState, action = {}) {
  switch(action.type) {
    case SET_REPORTS:
      return {
        ...state,
        items: action.payload || [],
      }

    case REPORT_FETCHED:
      return {
        ...state,
        currentItem: action.payload,
      };

    case REPORT_DELETED:
      return state.filter(item => item._id !== action.reportId);

    case ADD_REPORT:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      };

    default:
      return state;
  }
}
