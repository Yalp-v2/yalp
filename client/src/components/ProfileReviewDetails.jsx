import React from 'react';

class ProfileReviewDetails extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
		      {this.props.reviews.map((review, index) => <div key={index}><b> {review.business_name}</b> - {review.text} </div> )}
		      </ul>
      </div>
			)
	}
}

export default ProfileReviewDetails;