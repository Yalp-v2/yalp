import React from 'react';
import axios from 'axios';

//props.businessId = business ID

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      text: '',
      reviewed: false
    }
    this.updateRating = this.updateRating.bind(this);
    this.updateReviewText = this.updateReviewText.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  updateRating(val, e) {
    console.log(this.lastSelectedRating)
    if (this.lastSelectedRating) {
      console.log('found last rating element', this.lastSelectedRating)
      this.lastSelectedRating.style.background = 'red';
    }
    this.lastSelectedRating = e.currentTarget;
     if (e.currentTarget.style.background === 'yellow') {
      e.currentTarget.style.background = 'red';
      for (let i = 0; i < e.currentTarget.children.length; i++) {
        e.currentTarget.children[i].background = 'red';
      }
     } else {
      e.currentTarget.style.background = 'yellow';
      for (let j = 0; j < e.currentTarget.children.length; j++) {
        e.currentTarget.children[j].background = 'yellow';
      }
     }
    this.setState({ rating: val })
  }
  updateReviewText(e) {
    this.setState({ text: e.target.value })
  }
  submitReview() {
    this.setState({ reviewed: true }) //rerender comp to thank you
    //add review to db (user, rating, text, business)
    //TODO: check text appropriateness before submitting
    if (this.state.text.length) {
      console.log('submitting review')
      axios.post('/review', {
        rating: this.state.rating,
        text: this.state.text,
        userID: this.props.userId,
        businessID: this.props.business.id,
        businessName: this.props.business.name
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  }

  render() {
    if (this.state.reviewed) {
      return (
        <div>Thanks for leaving a review!</div>
      )
    } else {
      return (
        <div>
          <div>Leave a Review</div>
          <button className="rate-btn" onClick={e => this.updateRating(5, e)}>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
          </button>
          <button className="rate-btn" onClick={e => this.updateRating(4, e)}>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
          </button>
          <button className="rate-btn" onClick={e => this.updateRating(3, e)}>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
          </button>
          <button className="rate-btn" onClick={e => this.updateRating(2, e)}>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
          </button>
          <button className="rate-btn" onClick={e => this.updateRating(1, e)}>
            <img className="ratingLogo" src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>
          </button>
          <textarea className="new-review-text" type="text" placeholder="What'd you think?" onChange={this.updateReviewText}></textarea>
          <button className="review-submit" onClick={this.submitReview}>Submit</button>
        </div>
      )
    }
  }
}


export default AddReview;
