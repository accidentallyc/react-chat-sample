import _ from 'lodash';
import store from "../store/MessageStore";


import React, { Component } from "react";
import { connect } from 'react-redux'

class TextInput extends Component {

  constructor() {
    super();
    this.submitMessage = this.submitMessage.bind(this);
  }

  renderMessage({ value,id }) {
    return <div key={id}>
      <hr />
      {value}
    </div>
  }

  renderMessages() {
    const messages = this.props.messages;
    return messages.map(this.renderMessage);
  }

  submitMessage (event) {
    event.preventDefault();
    const textarea = event.target.elements["message"];
    store.dispatch({
      type:'ADD',
      message: {
        value: textarea.value
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitMessage}>
          <p>
            <textarea name="message" cols={45} rows={5} />
          </p>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
 function mapState(){
    return {}
 }
export default connect(mapState)(TextInput)