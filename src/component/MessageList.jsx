import _ from 'lodash';


import React, { Component } from "react";
import { connect } from 'react-redux';

import './MessageList.scss';

class MessageList extends Component {

  constructor() {
    super();
  }

  renderMessage({ value,id }) {
    return <p key={id}> {value} </p>
  }

  renderMessages() {
    const messages = this.props.messages;
    return messages.map(this.renderMessage);
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
    messages : state.messages
  };
};
export default connect(mapState)(MessageList)