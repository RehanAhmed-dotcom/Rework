//=======================================================Action Types Constants
const USER_AUTHORIZE = 'USER_SIGN_IN',
  USERLOGGED = 'USERLOGGED',
  UPDATE = 'UPDATE',
  LOGOUT = 'LOGOUT',
  FCM = 'FCM',
  DESTINATION = 'DESTINATION',
  CURRENT_LOCATION = 'CURRENT_LOCATION',
  USER_TYPE = 'USER_TYPE',
  DISTANCE = 'DISTANCE';
//========================================================Dispatchers

const logged = payload => dispatch => {
  dispatch({type: USERLOGGED, payload});
};
const update = payload => dispatch => {
  dispatch({type: UPDATE, payload});
};
const destination = payload => dispatch => {
  dispatch({type: DESTINATION, payload});
};
const logoutuser = payload => dispatch => {
  dispatch({type: LOGOUT, payload});
};
const fcm = payload => dispatch => dispatch({type: FCM, payload});

const setCurrentLocation = payload => dispatch => {
  dispatch({type: CURRENT_LOCATION, payload});
};
const setUserType = payload => dispatch => {
  dispatch({type: USER_TYPE, payload});
};
const dist = payload => dispatch => {
  dispatch({type: DISTANCE, payload});
};
//========================================================Exporter
const ActionType = {
  USERLOGGED,
  DISTANCE,
  UPDATE,
  LOGOUT,
  FCM,
  DESTINATION,
  CURRENT_LOCATION,
  USER_TYPE,
};
export {
  ActionType,
  logged,
  update,
  logoutuser,
  fcm,
  destination,
  setCurrentLocation,
  dist,
  setUserType,
};
