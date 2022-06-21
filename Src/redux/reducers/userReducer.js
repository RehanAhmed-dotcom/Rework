import {ActionType} from '../actions';
const InitialCalState = {
  userData: {},
  isLoggedIn: false,
  fcmtoken: '',
  distance: 10,
};

export default (state = InitialCalState, {type, payload}) => {
  switch (type) {
    case ActionType.USERLOGGED: {
      return {
        ...state,
        isLoggedIn: true,
        userData: {...payload},
      };
    }
    case ActionType.UPDATE: {
      return {
        ...state,
        userData: {...payload},
      };
    }
    case ActionType.FCM: {
      return {
        ...state,
        fcmtoken: payload,
      };
    }
    case ActionType.DISTANCE: {
      return {
        ...state,
        distance: payload,
      };
    }
    case ActionType.LOGOUT: {
      return {
        ...state,
        isLoggedIn: payload,
      };
    }

    default:
      return state;
  }
};
