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


