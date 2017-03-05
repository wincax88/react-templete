import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import styles from './Login.css';
import store from "../../store"

import { loginServer, logout } from "../../actions/networkingAction"
import { Form , FormGroup, FormControl, ControlLabel, Button, Col, Grid, Image} from 'react-bootstrap';
import { Link, Router } from 'react-router'
import {ShowErrorMessage} from '../../utility/Utility'
import {browserHistory} from 'react-router';
var Spinner = require('react-spinkit');
import constants from "../../actions/networkingConstants"

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Login extends React.Component {
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      phone: props.user.user.phone,
      passwd: props.user.user.passwd,
      fetching : false,
      showModal : false,
    };
  }

  componentDidMount() {
    /*
    const { user } = this.props;
    if (user.user.phone && user.user.phone.length > 0) {
      this.setState({phone:user.user.phone});
    }
    if (user.user.passwd && user.user.passwd.length > 0) {
      this.setState({passwd:user.user.passwd});
    }*/
  }
  componentDidUpdate (prevProps) {
    const { user } = this.props;
    if (user.isLogin) {
      console.log('user.isLogin');
      // redirect to main windows
      browserHistory.push('/')
    }
    else if (user.user.error) {
      ShowErrorMessage(user.user.error);
      user.user.error = null;
    }
  }

  _login() {
    const phone = this.state.phone;
    const password = this.state.passwd;

    if (!phone || phone.length < 2) {
      // show error message
      ShowErrorMessage("请输入2个字符以上的用户名");
    return;
    }
    if (!password || password.length < 6) {
      // show error message
      ShowErrorMessage("请输入6位及以上的密码");
      return;
    }
    this.setState({fetching:true});
    const { user } = this.props;
    user.fetching = true;
    this.props.dispatch(loginServer(phone, password));
  }

  _resetPassword() {
    browserHistory.push('/resetPassword');
  }

  _handlePhoneChange(evt) {
    this.setState({phone:evt.target.value});
  }

  _handlePasswordChange(evt) {
    this.setState({passwd:evt.target.value});
  }

  _onModalColse() {
    this.setState({showModal : false})
  }

  render() {
    const { user } = this.props;

    const header = (
      <div className={styles.header}>
        <p className={styles.title}>咨询管理平台</p>
      </div>
    )
    const phone_input = (
      <input type="text" placeholder="请输入用户名" value={this.state.phone} className={styles.input} onChange={this._handlePhoneChange.bind(this)}/>
    )
    const password_input = (
      <input type="password" placeholder="请输入密码" value={this.state.passwd} className={styles.input} onChange={this._handlePasswordChange.bind(this)}/>
    )
    const login_button = (
      <button type="button" className={styles.button_blue} onClick={this._login.bind(this)}>登录</button>
    )
    const password_button = (
      <button type="button" className={styles.button_white} onClick={this._resetPassword.bind(this)}>忘记密码？请重置</button>
    )
    const loading = this.state.fetching && user.fetching ? (
      <div className={styles.spinner}>
        <Spinner spinnerName="three-bounce" />
      </div>
    ) : (
      <div>
      </div>
    )

    let content_height = this.props.height < 768 ?  768 - 30 : this.props.height - 30;
    let content_width = this.props.width < 1024 ? 1024 - 10 : this.props.width - 10;
    const footer_style = {'top':content_height};
    const footer = (
      <div className={styles.footer} style={footer_style}>
        上海理优教育科技有限公司
      </div>
    )

    return (
      <div className={styles.container}>
        {header}
        <Grid>
          <div className={styles.dialog}>
            {phone_input}
            {password_input}
            {login_button}
            {loading}
          </div>
        </Grid>
        {footer}
      </div>
    )
  }
}
