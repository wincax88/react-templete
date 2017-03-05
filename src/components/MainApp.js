import React, { PropTypes } from 'react'
import { connect } from "react-redux"
import store from '../store'
import { getUsersInfo , storeUsersInfo} from "../actions/localStorageAction"
import { loginServer } from "../actions/networkingAction"
import styles from './MainApp.css';
var Spinner = require('react-spinkit');
import MainWindow from './MainWindows/MainWindow'
import Login from './Login/Login'

@connect((store) => {
  return {
    user: store.user,
  };
})

export default class MainApp extends React.Component {
  constructor() {
    super();
    this.state = {
      fetching:true,
      width : 1024,
      height : 768,
      unmount: false,
      autoLoginCount : 0,
    };
  }

  componentDidMount() {
    // get user userid and password from store
    this.props.dispatch(getUsersInfo())

    // add resize event
    window.addEventListener("resize", this._updateLayout.bind(this));

    this._updateLayout();

  }

  componentWillReceiveProps(nextProps) {
    this.setState({fetching: false});

    const { user } = nextProps;

    if (user.isLogout) {
      this.props.dispatch(storeUsersInfo(user.user.userid, user.user.passwd, false))
    }
    else if (!user.isLogin && user.user.userid.length && user.user.passwd.length && user.user.auto_login && this.state.autoLoginCount <= 3) {
      this.state.autoLoginCount = this.state.autoLoginCount + 1;
      // do auto login
      this.props.dispatch(loginServer(user.user.userid, user.user.passwd))
    }
    else if (user.isLogin) {
      this.state.autoLoginCount = 0;
    }
  }

  componentDidUpdate() {
    const {user} = this.props;

    if (user.error == 6003 && this.state.autoLoginCount <= 3) { // maybe 6003
      user.error = 0;
      this.state.autoLoginCount = this.state.autoLoginCount + 1;
      // do auto login
      this.props.dispatch(loginServer(user.user.userid, user.user.passwd))
    }
  }

  componentWillUnmount() {
    this.state.unmount = true;
    // remove resize event
    window.removeEventListener("resize", this._updateLayout.bind(this));
  }

  _updateLayout() {
    if (this.state.unmount) {
      return;
    }
    let width = $(body).width();
    let height = $(body).height();
    // console.log('MainApp - width : ' + width + ' height : ' + height);
    this.setState({width:width, height:height})
  }

  render () {
    const { user } = this.props;
    let mainui = (
      <div className={styles.spinner}>
        <Spinner spinnerName="three-bounce" />
      </div>
    )
    if (user.isLogin) {
      mainui = <MainWindow
        width={this.state.width}
        height={this.state.height}/>;
    }
    else if (user.user.error) {
      mainui = <Login
        width={this.state.width}
        height={this.state.height}/>;
    }
    else if (user.isLogout) {
      mainui = <Login
        width={this.state.width}
        height={this.state.height}/>;
    }
    else {
      mainui = <Login
        width={this.state.width}
        height={this.state.height}/>;
    }

    if (this.state.fetching)
    {
      mainui = (
        <div className={styles.spinner}>
          <Spinner spinnerName="three-bounce" />
          <h5>自动登录中</h5>
        </div>
      )
    }

    return (
      <div className={styles.container}>
        {mainui}
      </div>
    )
  }
}
