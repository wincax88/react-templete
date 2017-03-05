import constantsLocal from "../actions/localStorageConstants";
import constants from "../actions/networkingConstants";

export default function reducer(state={
    user: {
      userid: null,
      passwd: '',
      permission : '',
      nick: null,
      auto_login: false,
      error: null,
    },
    isLogin:false,
    isLogout:false,
    fetching: false,
    fetched: false,
    error: 0,
  }, action) {

    switch (action.type) {

      case constants.LOGIN_SUCCESS: {
          return {
          ...state,
          fetching: false,
          fetched: true,
          isLogin: true,
          isLogout: false,
          user: Object.assign({}, state.user, action.payload),
        };
      }
      case constants.LOGIN_FAILED: {
          return {
          ...state,
          fetching: false,
          fetched: true,
          isLogin: false,
          user: Object.assign({}, state.user, {error:action.payload}),
        };
      }
      case constantsLocal.GET_USER_INFO_SUCCESS: {
          return {
          ...state,
          fetching: false,
          fetched: true,
          user: Object.assign({}, state.user, action.payload),
        };
      }
      case constantsLocal.GET_USER_INFO_FAILED: {
        return {
          ...state,
          fetching: false,
        };
      }
    }
    return state;
}
