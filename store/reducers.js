import { fromJS } from 'immutable';
import * as constants from "./constants";

const initialState = fromJS({
  data: [],
  status: '',
  loader: false,
  selectedItem: []
});

export default function store(state = initialState, action) {
    switch (action.type) {
      case constants.SET_DATA:
        return state.set('data', fromJS(action.data));
      case constants.SET_STATUS:
        return state.set('status', fromJS(action.status));
      case constants.SET_LOADER:
        return state.set('loader', fromJS(action.loader));
      case constants.SET_SELECTED_ITEM:
        return state.set('selectedItem', fromJS(action.selectedItem));
      default:
        return state;
    }
  }
