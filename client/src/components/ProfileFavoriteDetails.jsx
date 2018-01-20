import React from 'react';

class ProfileFavoriteDetails extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
		      {this.props.favorites.map((favorite, index) => <li key={index}> {favorite.business_name} </li> )}
		      </ul>
      </div>
			)
	}
}

export default ProfileFavoriteDetails;