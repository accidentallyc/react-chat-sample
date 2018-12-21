import _ from 'lodash';


import React, { Component } from "react";
import { connect } from 'react-redux'

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
      <div>
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