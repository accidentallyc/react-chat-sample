import _ from 'lodash';
import store from "../store/AppStore";
import './ThreadList.scss';

import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';

class ThreadList extends Component {

  constructor() {
    super();
  }

  render() {
  	const threadListItems = this.props.users.map((user) => {
  		const threadClass = ['thread-list-item'];
  		if(user.isActive) threadClass.push('is-active');

  		return (
  			<li 
  				key={user.id} 
  				className={threadClass.join(' ')} 
  				title={`${user.nickname}#${user.id}`}>
  					<i className='circle'>●</i>
		  			<b>{user.nickname}</b>
		  			<small>#{user.id.substr(0,3)}</small>

	  		</li>
  		 )
  	});
    return <ul id='thread-list'>{threadListItems}</ul>
  }
}
 function mapState(state){
 		const users = _.chain(state.user)
 			.values()
 			.map((user) => {
	 			const lastLogin = moment(user.lastLogin.toDate());
	 			const minElapsed = moment().diff(lastLogin,'minutes');
	 			user.isActive = minElapsed <= 5;
	 			return user;
 			})
	 		.sortBy(users, (user) => !user.isActive)
	 		.value();
    return { users }
 }
export default connect(mapState)(ThreadList)