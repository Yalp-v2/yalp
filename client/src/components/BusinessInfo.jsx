import React from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import Parser from 'html-react-parser';

// Parser to turn HTML string into JSX
const DealHighlights = (props) => (
  props.highlights ? Parser(props.highlights) : null
);
const DealPitch = (props) => (
  props.pitch ? Parser(props.pitch) : null
);

export default class BusinessInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      business: this.props.business,
      open: false,
      deal: false,
      merchantLat: this.props.business.geometry.location.lat,
      merchantLng: this.props.business.geometry.location.lng
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.searchForDeals = this.searchForDeals.bind(this);
  }

  componentWillMount() {
    this.searchForDeals();
  }

  onOpenModal() {
    this.setState({ open: true });
  };

  onCloseModal() {
    this.setState({ open: false });
  };

  searchForDeals() {
    let context = this;
    axios
    .get('/server/merchantdeal', {
      params: {
        merchantName: this.state.business.name,
        lat: this.state.merchantLat,
        lng: this.state.merchantLng
      }
    })
    .then(results => {
      results.data !== "No deal!" ? context.setState({ deal: results.data[0] }) : context.setState({ deal: false })
    })
    .catch(err => {
      console.log('merchant deal err at client level', err);
      context.setState({ deal: false });
    });
  }

  render() {
    return (
      <div>
        <div className="businessInfo">
          <div className="businessTitle">{this.state.business.name}</div>
          <div className="rating">

          </div>
          <div>{this.props.business.formatted_address}</div>
          <div>{this.props.business.formatted_phone_number}</div>
          <a href={this.props.business.website} >{this.state.business.website}</a>
        </div>
        <div>
          {this.state.deal ?
            <button onClick={this.onOpenModal}>Deals available!</button> :
            null}
          <div><Modal open={this.state.open} onClose={this.onCloseModal} little>
            <h2>{this.state.deal.deal_title}</h2>
            {this.state.deal ? 
              <div><DealPitch pitch={this.state.deal.pitch} />
                <DealHighlights highlights={this.state.deal.highlights} /></div> :
              null}
            <button onClick={() => window.open(`${this.state.deal.deal_url}`, '_blank')}>See More</button>
          </Modal></div>
        </div>
      </div>
    )
  }
}