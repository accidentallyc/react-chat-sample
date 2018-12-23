import { createStore } from 'redux';
import _ from 'lodash';
import { firestore } from "../service/Firebase";


function reducerCallback(state = { messages:[], ids:{} }, action) {
  const actionCallback = reducerFunctions[ action.type ];
  const newState = actionCallback ? actionCallback(state,action) : state;
  return newState;
}

const reducerFunctions = {};
reducerFunctions.CREATE_MESSAGE = (state, action) => {
  const { message } = action;
  firestore
    .collection("message")
    .add({
      time: new Date,
      value: message.value
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  return state;
};

reducerFunctions.APPEND_MESSAGE = (state, action) => {
  return {
    ...state,
    messages: _.concat(state.messages, action.message)
  }
};

export default createStore(reducerCallback);