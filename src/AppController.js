import _ from 'lodash';
import React from "react";
import ReactDOM from "react-dom";

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
  .onSnapshot((querySnapshot) => {
    store.dispatch({ type:'RESET' });

    querySnapshot.forEach((doc) => {
      store.dispatch({
        type:'APPEND',
        message: {
          ...doc.data(),
          id: doc.id
        }
      })
    })
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