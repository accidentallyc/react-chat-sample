import _ from 'lodash';
import moment from "moment";

// Services
import store from "./store/AppStore";

// Setup Firebase
import { firestore } from "./service/Firebase";
firestore
	.collection("message")
	.orderBy('time')
  .onSnapshot((querySnapshot) => {
    const messages = store.getState().messages;

    for (let {doc} of querySnapshot.docChanges()) {
      const message = {
        id: doc.id,
        ...doc.data(),
      }

      store.dispatch({ type:'APPEND_MESSAGE', message });
    }
  });

firestore
  .collection("user")
  .orderBy('lastLogin')
  .onSnapshot((querySnapshot) => {
    const messages = store.getState().messages;
    
    for (let change of querySnapshot.docChanges()) {
      const { doc } = change;
      const user = {
        id: doc.id,
        ...doc.data(),
      }

      store.dispatch({ type:'APPEND_USER', user });
    }
  });


//Set up session
import jsCookie from 'js-cookie';

const currentUserId = jsCookie.get('user');
if( currentUserId ) {
  firestore
    .collection("user")
    .doc(currentUserId)
    .get()
    .then((docRef) => {
      docRef.ref.update({ lastLogin: new Date })
      
      store.dispatch({
        type:'INIT_USER',
        user: docRef
      })
    })
    .catch(console.log)
}


window.cookie = jsCookie;