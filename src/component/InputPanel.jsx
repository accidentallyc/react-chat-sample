import _ from 'lodash';
import store from "../store/AppStore";


import React, { Component } from "react";
import { connect } from 'react-redux';

import './InputPanel.scss';

const ENTER_KEY = 13;

class InputPanel extends Component {

  constructor() {
    super();
    this.submitMessage = this.submitMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    }
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
  }

  handleKeyPress (event) {
    // if enter is pressed we submit the form
    if( event.which == ENTER_KEY ) {
      event.preventDefault();
      event.stopPropagation();

      store.dispatch({
        type:'NEW',
        message: {
          value: this.state.value.trim()
        }
      }) ;

      this.setState({ value:'' });
    }
  }

  handleChange (event){
    const value = event.target.value;
    this.setState({ value });
  }

  render() {
    return (
      <div id="input-panel" onKeyPress={this.handleKeyPress}>
        <form onSubmit={this.submitMessage}>
          <p>
            <textarea 
                name="message" cols={45} rows={5} 
                value={this.state.value}
                onChange={this.handleChange}
              />
          </p>
        </form>
      </div>
    );
  }
}
 function mapState(){
    return {}
 }
export default connect(mapState)(InputPanel)