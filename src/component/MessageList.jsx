import _ from 'lodash';


import React, { Component } from "react";
import { connect } from 'react-redux';

import './MessageList.scss';
import MessageListItem from './MessageListItem.jsx';
import ReactDOM from 'react-dom';

class MessageList extends Component {

  constructor() {
    super();
  }

  componentDidUpdate() {
    const dom = ReactDOM.findDOMNode(this);
    const height = dom.clientHeight;
    if( dom.scrollTop > height) {
      dom.scrollTop = height + 999;
    }
  }

  renderMessages() {
    const messages = this.props.messages;
    return messages.map(({ value,id, sender:ref }) => {
      const sender = this.props.user[ref.id];
      return <MessageListItem
        key={id}
        value={value} 
        sender={sender} 
        />
    });
  }

  render() {
    return (
      <div id="message-list">
        { this.renderMessages() }
      </div>
    );
  }
}



export function mapState(state) {
  return {
    messages : state.messages,
    user: state.user
  };
};
export default connect(mapState)(MessageList)