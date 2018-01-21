import React from 'react';

class ProfileReviewDetails extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
		      {this.props.reviews.map((review, index) => <li key={index}> {review.text} </li> )}
		      </ul>
      </div>
			)
	}
}

export default ProfileReviewDetails;