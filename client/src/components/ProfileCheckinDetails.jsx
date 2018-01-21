import React from 'react';

class ProfileCheckinDetails extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
		      {this.props.checkins.map((checkin, index) => <li key={index}> {checkin.business_name} </li> )}
		      </ul>
      </div>
			)
	}
}

export default ProfileCheckinDetails;