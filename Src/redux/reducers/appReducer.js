import { ActionType } from '../actions';
const initialState = {
  currentLocation: {},
  userType: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.CURRENT_LOCATION: {
      return {
        ...state,
        currentLocation: payload,
      };
    }
    case ActionType.USER_TYPE: {
      return {
        ...state,
        userType: payload,
      }
    }
    default:
      return state;
  }
};
