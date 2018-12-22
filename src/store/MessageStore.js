import { createStore } from 'redux';
import _ from 'lodash';
import { firestore } from "../service/Firebase";


function counter(state = { messages:[], ids:{} }, action) {
  switch (action.type) {
    case 'RESET':
      return { messages:[],ids:{} };
    case 'APPEND':
      return {
      	messages: _.concat(state.messages, action.message),
      	ids: {}
      }
    case 'ADD':
      firestore.collection("message").add({
          time: new Date,
          value: action.message.value
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

      return state;
  }

  return state
}

export default createStore(counter);