import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import './app.scss';

import store from "./store/AppStore";
import MessageList from "./component/MessageList.jsx";
import InputPanel from "./component/InputPanel.jsx";
import FirstTimeUserModal from "./component/FirstTimeUserModal.jsx";


const root = document.getElementById("app-container");
ReactDOM.render(
  <Provider store={store}>
  	<div className="flex container-left"> 
    	<div id="users-panel"></div>
  	</div> 
  	<div className="flex-v container-right"> 
    	<MessageList />
    	<InputPanel />
  	</div>
    <FirstTimeUserModal/>  
  </Provider>, 
  root
);