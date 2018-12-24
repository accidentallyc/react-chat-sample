import _ from 'lodash';


import React, { Component } from "react";
import { connect } from 'react-redux';

class MessageListItem extends Component {

  constructor() {
    super();
  }

  
  render() {
    const sender = this.props.sender;
    const currentUser = this.props.currentUser;
    if( !(sender && currentUser) ) {
      return <div className="message-list-item empty"></div>
    } else {
      const itemClass = ["message-list-item"];
      if( currentUser.id == sender.id ) {
        itemClass.push("current-user");
      }

      return (
        <div 
          className={itemClass.join(' ')}
          title={`${sender.nickname}#${sender.id}`}
          >
          <span className="name">
            {sender.nickname}
            <small>#{sender.id.substr(0,3)}</small>
          </span>
          <span className="content">{this.props.value}</span>
        </div>
      );
    }
  }
}



export function mapState(state) {
  return {
    currentUser: state.currentUser
  };
};
export default connect(mapState)(MessageListItem)