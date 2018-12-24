import _ from 'lodash';
import store from "../store/AppStore";

import React, { Component } from "react";
import { connect } from 'react-redux';

import './FirstTimeUserModal.scss';

class FirstTimeUserModal extends Component {

  constructor() {
    super();
    this.state = { nickname:''};
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    store.dispatch({
      type:'CREATE_USER',
      nickname: this.state.nickname
    });
  }

  handleOnChange(event){
    this.setState({
      nickname: event.target.value
    })
  }

  render() {
    const className = ["flex"];

    if( this.props.isHidden ) {
      className.push('hide');
    }

    return (
      <div id="first-time-user-modal" className={className.join(' ')}>
        <div className="modal-container flex">
          <label className="flex">Nickname</label>
          <input onChange={this.handleOnChange} type="text" />
          <button onClick={this.handleOnClick}>Submit</button>
        </div>
      </div>
    );
  }
}

 function mapState(state){
    return {
      isHidden: state.currentUser
    }
 }
export default connect(mapState)(FirstTimeUserModal)