import React from 'react';

class ProfileInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
		      {this.props.favorites.map(favorite => <li> {favorite.business_name} </li> )}
		      </ul>
      </div>
			)
	}
}

export default ProfileInfo;