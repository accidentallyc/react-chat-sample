firebase.initializeApp({
  apiKey: 'AIzaSyC6yOu9qcYTsGaLdu5epPDKSfuiC0lK1QQ',
  authDomain: 'react-chat-7f952.firebaseapp.com',
  projectId: 'react-chat-7f952'
});

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();

// Disable deprecated features
firestore.settings({
  timestampsInSnapshots: true
});

export { firestore }