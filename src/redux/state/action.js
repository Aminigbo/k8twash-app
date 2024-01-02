import {
  INITIALIZED,
  SCHEDULES,
  USER
} from "../state/types";


export const initAuth = () => {
  return {
    type: INITIALIZED,

  };
};

export const Schedules = (payload) => {
  return {
    type: SCHEDULES,
    payload

  };
};

export const User = (payload) => {
  return {
    type: USER,
    payload

  };
}; 