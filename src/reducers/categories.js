import { SET_CATEGORIES, ADD_CATEGORY, CATEGORY_FETCHED, CATEGORIES_UPDATED, CATEGORIES_DELETED } from '../actions/category/actions';

export default function categories(state = [], action = {}) {
  switch(action.type) {
    case SET_CATEGORIES:
      return action.categories;

    case CATEGORY_FETCHED:
      const index = state.findIndex(item => item._id === action.categories._id);

      if (index > -1) {
        return state.map(item => {
          if (item._id === action.categories._id) return action.categories;
          return item;
        });
      } else {
        return [
          ...state,
          action.categories
        ];
      }

    case CATEGORIES_UPDATED:
      return state.map(item => {
        if (item._id === action.categories._id) return action.categories;
        return item;
      })

    case CATEGORIES_DELETED:
      return state.filter(item => item._id !== action.categoryId);

    case ADD_CATEGORY:
      return [
        ...state,
        action.categories
      ];

    default: return state;
  }
}
