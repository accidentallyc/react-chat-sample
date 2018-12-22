import _ from 'lodash';
import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

// Services
import { Provider } from "react-redux";
import store from "./store/MessageStore";

// Components and Views
import './index.css';
import MessageList from "./component/MessageList.jsx";
import TextInput from "./component/TextInput.jsx";


// Setup Firebase
import { firestore } from "./service/Firebase";

firestore
	.collection("message")
	.orderBy('time')
  .onSnapshot((querySnapshot) => {
    const messages = store.getState().messages;
  	const lastInserted = _.last(messages);
    const lastInsertedId = _.get(lastInserted,'id');
    const lastInsertFound = false;

    for (let change of querySnapshot.docChanges()) {
      const { doc } = change;
      const message = {
        id: doc.id,
        ...doc.data(),
      }

      store.dispatch({ type:'APPEND', message });
    }

  });


const root = document.getElementById("app-container");
ReactDOM.render(
  <Provider store={store}>
    <MessageList />
    <br/>
    <TextInput />
  </Provider>, 
  root
);