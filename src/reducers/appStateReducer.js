import constants from "../actions/networkingConstants.js";
export default function reducer(state={
    main_window : {
      // menu index on main window
      cur_link: 'MainTask',
      isMounted: false,
    },
  }, action) {

    switch (action.type) {
      case constants.SET_MAIN_WINDOW_STATE_SUCCESS: {
        return {
          ...state,
          main_window:Object.assign({}, state.main_window, action.payload),
        }
      }
    }
    return state;
}
