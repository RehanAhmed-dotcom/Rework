import { ActionType } from '../actions';
const InitialCalState = {
  latlong: {},
};

export default (state = InitialCalState, { type, payload }) => {
  switch (type) {
    case ActionType.DESTINATION: {
      return {
        ...state,
        latlong: { ...payload },
      };
    }

    default:
      return state;
  }
};
