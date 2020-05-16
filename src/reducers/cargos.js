import { SET_CARGOS, CARGO_FETCHED, CARGO_UPDATED, CARGO_DELETED, ADD_CARGO } from '../actions/cargo/actions';

export default function cargos(state = [], action = {}) {
  switch(action.type) {
    case SET_CARGOS:
      return action.cargos;

    case CARGO_FETCHED:
      const index = state.findIndex(item => item._id === action.cargo._id);

      if (index > -1) {
        return state.map(item => {
          if (item._id === action.cargo._id) return action.cargo;
          return item;
        });
      } else {
        return [
          ...state,
          action.cargo
        ];
      }

    case CARGO_UPDATED:
      return state.map(item => {
        if (item._id === action.cargo._id) return action.cargo;
        return item;
      })

    case CARGO_DELETED:
      return state.filter(item => item._id !== action.cargoId);

    case ADD_CARGO:
      return [
        ...state,
        action.cargo
      ];

    default: return state;
  }
}
