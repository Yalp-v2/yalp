import React from 'react';
import ReactDOM from 'react-dom';
import BusinessEntry from './BusinessEntry.jsx';
import { Link } from 'react-router-dom';

class BusinessList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      booleanFilters: {
        open: false, 
        favorited: false
      }
    }
  }
  componentWillMount() {
    document.body.style.background = "url('wood.jpg')";
    document.body.style.backgroundSize = "100%";
    document.body.style.backgroundRepeat = "repeat-y";
  }

  displayBusinessListings(filters) {

  }

  getFavoritedBusinesses() {

  }

  getOpenBusinesses() {
    const { favorites } = this.props;
    return this.props.businesses.data.map(business => 
      business.opening_hours.open_now ?
      <Link key={business.id} to={`/business/${business.id}`} onClick={(e) => this.props.updateBusiness(e, business)} style={{ textDecoration: 'none' }}>    
      <BusinessEntry business={business}
                     key={business.id}
                     favorite={favorites[business.id] ? true : false} />
      </Link> 
      : null
    )
  }

  getBusinessEntries() {
    const { favorites } = this.props;
    return this.props.businesses.data.map(business => 
      <Link key={business.id} to={`/business/${business.id}`} onClick={(e) => this.props.updateBusiness(e, business)} style={{ textDecoration: 'none' }}>
      <BusinessEntry business={business}
                     key={business.id}
                     favorite={favorites[business.id] ? true : false} />
      </Link> 
    )
  }

  render() {
    return (
      <div>
      <div className="filterOptionsBar">

        <button id="filterPrice" className="filterButton"> Price </button>
        <button id="filterOpen" className="filterButton" onClick={ () => {
          console.log("hello!")
        }
        }> Is Open </button>
        <button id="filterNearby" className="filterButton"> Nearby </button>
        <button id="filterFavorited" className="filterButton"> Favorited </button>
      </div>
        {this.state.booleanFilters.open ? this.getOpenBusinesses() : this.getBusinessEntries()}
      </div>
    )
  }
}

export default BusinessList;