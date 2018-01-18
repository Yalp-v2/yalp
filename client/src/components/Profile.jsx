import React from 'react';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      friends: [],
      checkins: [],
      reviews: [],
      favorites: []
    };
    TimeAgo.locale(en);
  }

  createDate(createdAt) {
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(createdAt));
  }

  fetchProfile() {
    const { profileId } = this.props;
    axios.get(`/server/user/${profileId}`)
      .then(resp => {
        this.setState({ user: resp.data[0] });
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchFriends() {
    const { profileId } = this.props;
    axios.get(`/user/friends/${profileId}`)
      .then(resp => {
        this.setState({ friends: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  fetchCheckins() {
    const { profileId } = this.props;
    axios.get(`/user/checkins/${profileId}`)
      .then(resp => {
        this.setState({ checkins: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  fetchReviews() {
    const { profileId } = this.props;
    axios.get(`/user/reviews/${profileId}`)
      .then(resp => {
        this.setState({ reviews: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  fetchFavorites() {
    const { profileId } = this.props;
    axios.get(`/user/favorites/${profileId}`)
      .then(resp => {
        this.setState({ favorites: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  renderUserInfo() {
    const { user } = this.state;
    return user !== null ? [
      <div key={1}>{`Email: ${user.email}`}</div>,
      <div key={2}>{`Username: ${user.username}`}</div>,
      <div key={3}>{`Created At: ${this.createDate(user.createdAt)}`}</div>,
    ] : '';
  }

  renderFriends() {
    const { friends } = this.state;
    if (friends.length) {
      return friends.map(friend => {
        return (
          <div key={friend.id}>
            {friend.username + '  ' + this.createDate(friend.createdAt)}
          </div>
        );
      });
    }
    return '';
  }

  renderCheckins() {
    const { checkins } = this.state;
    if (checkins.length) {
      return checkins.map(checkin => {
        return (
          <div key={checkin.id}>
            <div>{checkin.name}</div>
            <div>{this.createDate(checkin.createdAt)}</div>
          </div>
        );
      });
    }
    return '';
  }

  renderReviews() {
    const { reviews } = this.state;
    if (reviews.length) {
      return reviews.map(review => {
        return (
          <div key={review.id}>
            <div>{review.name}</div>
            <div>{review.text}</div>
            <div>{this.createDate(review.createdAt)}</div>
          </div>
        );
      });
    }
    return '';
  }

  renderFavorites() {
    const { favorites } = this.state;
    if (favorites.length) {
      return favorites.map((favorite, index) => {
        return (
          <ul>
            <li><div key={favorite.id}>{favorites[index].business_name}</div></li>   
          </ul>
        );
      });
    }
    return '';
  }

  componentDidMount() {
    this.fetchProfile();
    this.fetchFriends();
    this.fetchCheckins();
    this.fetchReviews();
    this.fetchFavorites();
  }
  
  render() {
    return (
      <div className="profileContainer">
       
        <div>
          <h2> {this.state.user  ? this.state.user.name : null}</h2>
          <hr/>
          {this.renderUserInfo()}
        </div>
        <div>
          <div>Friends</div>
          {this.renderFriends()}
        </div>
        <div>
          <div>Check-ins</div>
          {this.renderCheckins()}
        </div>
        <div>
          <div>Reviews</div>
          {this.renderReviews()}
        </div>
        <div>
          <div>Favorites</div>
          {this.renderFavorites()}
        </div>
      </div>
    );
  }
}

export default Profile;