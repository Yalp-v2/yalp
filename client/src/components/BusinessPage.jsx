import React from 'react';
import Search from './Search.jsx'
import BusinessInfo from './BusinessInfo.jsx';
import PhotoFeed from './PhotoFeed.jsx';
import Reviews from './Reviews.jsx';
import AddReview from './AddReview.jsx';
import FriendActivity from './FriendActivity.jsx';

class BusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendReviews: [],
      nonFriendReviews: []
    }
  }
  render() {
    return (
      <div className="businessPage">
        <Search getBusinesses={this.props.getBusinesses}/>
        <div onClick={e => {this.props.backToResults()}} className="backBtn">{"<"} Search Results</div><br />
        <BusinessInfo business={this.props.business} location={this.props.location}/>
        <div className="business-page-btns">
          <span>
            {
              this.props.checkedIn ?
              <button onClick={e => {this.props.checkIn(this.props.business)}} className="checkIn disabled">Checked In!</button> :
              <button onClick={e => {this.props.checkIn(this.props.business)}} className="checkIn">Check In</button>
            }
          </span>
          <span>
            {
              this.props.getFavoriteInfo(this.props.business.id) ?
              <button className="favoriteIn disabled">Favorited!</button> :
              <button className="favoriteIn" onClick={e => {this.props.favoriteIn(this.props.business)}}>Favorite</button>
            }
          </span>
        </div>
        <div className="addReview">
          <AddReview business={this.props.business} username={this.props.username} userId={this.props.userId} />
        </div>
        <div className="reviews">
          <Reviews business={this.props.business} username={this.props.username} userId={this.props.userId} />
        </div>
        <div className="friend-activity">
          <FriendActivity business={this.props.business} username={this.props.username} userId={this.props.userId}/>
        </div>
        <div className="photoFeed">
          <PhotoFeed photos={this.props.photos} />
        </div>
      </div>
    )
  }
}

export default BusinessPage;
