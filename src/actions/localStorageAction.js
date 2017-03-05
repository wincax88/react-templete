import constants from "./localStorageConstants";
import localforage from "localforage";

export function getUsersInfo() {
  return function(dispatch) {
    const store = localforage.createInstance({
      name: constants.ACCOUNT_STORE_NAME
    });

    let account;

    store.getItem('account').then(function(value) {
      // This code runs once the value has been loaded from the offline store.
      account = value;
      dispatch({type: constants.GET_USER_INFO_SUCCESS, payload: {userid:account[0], passwd:account[1], auto_login:account[2]}});
    }).catch(function(err) {
      // This code runs if there were any errors
      dispatch({type: constants.GET_USER_INFO_FAILED, payload: {error:err}});
    });
  };
}

export function storeUsersInfo(userid, passwd, auto_login) {
  return function(dispatch) {
    var store = localforage.createInstance({
      name: constants.ACCOUNT_STORE_NAME
    });
    store.setItem('account', [userid, passwd, auto_login]).then(function (value) {

    }).catch(function(err) {
      // This code runs if there were any errors
      //console.error(err);
    });
  };
}
