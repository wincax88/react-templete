import constants from "./networkingConstants";
import leoLog from '../utility/log';

//import {sendPost, asyncSendPost} from 'util/net'
var Crypto = require("crypto-js");

export function sendPost(dispatch, url, onSuccess, onError) {
  return $.ajax({
    type: "post",
    async: false,
    url: url,
    dataType: "jsonp",
    //jsonp: "jsonpCallback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
    //timeout:5000,
    success: function(json) {
      if (json.ret == 0) {
        onSuccess(json);
      }
      else if (json.ret == 6003) {
        //onError(json.ret);
        dispatch({type: constants.LOGIN_TOKEN_TIMEOUT, payload: json.ret})
      }
      else {
        if (json.info.length <= 0 || json.info == ' ') {
          onError('网路错误(' + json.ret +')');
        }
        else {
          onError(json.info);
        }
      }
    },
    error: function(xhr) {
      onError('网路错误(' + xhr.status + ')')
    },
  })
}

// http://dev.admin.yb1v1.com/login/login?account=jim&password=a420384997c8a1a93d5a84046117c2aa
/*
>>>> phone	bytes	单一变量[1]	手机号
>>>> passwd	bytes	单一变量[1]	用户密码
*/
export function loginServer(userid, passwd) {
  return function(dispatch) {
    let md5password = passwd.length < 32 ? md5password = Crypto.MD5(passwd).toString() : passwd;
    const url = constants.HOST_ADMIN + 'login/login?account=' + 'jim'
    + '&password=' + 'a420384997c8a1a93d5a84046117c2aa';
    sendPost(dispatch, url, successCallBack, failCallBack);
    function successCallBack(json) {
      dispatch({type: constants.LOGIN_SUCCESS, payload:{userid:userid, passwd:md5password, permission:json.permission}})
    }
    function failCallBack(err) {
      dispatch({type: constants.LOGIN_FAILED, payload: err})
    }
  }
}
