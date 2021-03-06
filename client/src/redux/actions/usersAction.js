// jshint esversion:6

export const ADD_USER = 'ADD_USER';
export const USER_ERROR_MESSAGE = 'USER_ERROR_MESSAGE';
export const ADD_USER_TO_STATE = 'ADD_USER_TO_STATE';
export const LOG_OUT_FROM_STATE= 'LOG_OUT_FROM_STATE';
export const USER_ITINERARY = 'USER_ITINERARY';

export function addUser(first_name, last_name, email, password, security_question, security_answer) {
  return {
    type: ADD_USER,
    first_name,
    last_name,
    email,
    password,
    security_question,
    security_answer
  };
}

export function userErrorMsg(userErrorMessage) {
  return {
    type: USER_ERROR_MESSAGE,
    userErrorMessage
  };
}

export function addUserToState(id, email, loggedIn){
  return {
    type: ADD_USER_TO_STATE,
    id,
    email,
    loggedIn
  };
}

export function logOutFromState(){
  return {
    type: LOG_OUT_FROM_STATE
  };
}

export function userItinerary(itineraryId, car, flight, hotel, createdAt){
  return {
    type: USER_ITINERARY,
    itineraryId,
    car,
    flight,
    hotel,
    createdAt
  };
}