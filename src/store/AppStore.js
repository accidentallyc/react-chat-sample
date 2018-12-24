import { createStore } from 'redux';
import jsCookie from 'js-cookie';
import _ from 'lodash';

import { firestore } from "../service/Firebase";

function makeBlankState () {
  return { 
    messages:[], 
    user: {},
    currentUser: null,
  }
}

function reducerCallback(state = makeBlankState(), action) {
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
      value: message.value,
      sender: state.currentUser.ref
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

reducerFunctions.APPEND_USER = (state, { user }) => {
  const newState = _.cloneDeep(state);
  newState.user[user.id] = user;
  return newState;
};

reducerFunctions.INIT_USER = (state, action) => {
  return {
    ...state,
    currentUser: action.user
  }
}

reducerFunctions.CREATE_USER = (state, action) => {
  firestore
    .collection("user")
    .add({
      lastLogin: new Date,
      nickname: action.nickname
    })
    .then((docRef) => {
      // console.log("User written with ID: ", docRef.id);
      store.dispatch({
        type:'INIT_USER',
        user : {
          nickname: action.nickname,
          ref: docRef
        }
      });

      jsCookie.set("user",docRef.id)
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  return state;
}

const store = createStore(reducerCallback);
export default store;