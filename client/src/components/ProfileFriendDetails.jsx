import React from 'react';

class ProfileFriendDetails extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
		      {this.props.friends.map((friend, index) => <li key={index}> {friend.name} </li> )}
		      </ul>
      </div>
			)
	}
}

export default ProfileFriendDetails;