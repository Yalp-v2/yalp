import React from 'react';
import ReactDOM from 'react-dom';
import BusinessEntry from './BusinessEntry.jsx';
import { Link } from 'react-router-dom';

class BusinessList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: this.props.businesses.data,
      activeFilters: {
        price: true,
        rating: false,
        is_open: false,
        nearby: false,
        favorited: false
      }
    }

    this.sortByPrice = this.sortByPrice.bind(this)
    this.sortByRating = this.sortByRating.bind(this)
  }
  componentWillMount() {
    document.body.style.background = "url('wood.jpg')";
    document.body.style.backgroundSize = "100%";
    document.body.style.backgroundRepeat = "repeat-y";
  }

  sortByPrice(entriesToSort) {
    let pricedEntries = entriesToSort.filter(entry => entry.price_level);
    let sortedPricedEntries = pricedEntries.sort((a, b) => {
      return b.price_level - a.price_level
    })
    return sortedPricedEntries
  }

  sortByRating(entriesToSort) {
    let ratedEntries = entriesToSort.sort((a, b) => {
      return b.rating - a.rating 
    })
    return ratedEntries;
  }

    sortByFavorited(entriesToSort) {
    const {favorites} = this.props;
    let favoritedEntries = entriesToSort.filter(entry => {
      if (favorites[entry.id]){
       return entry
      }
    })
    return favoritedEntries;
  }

  sortByOpen(entriesToSort) {
    let openEntries = entriesToSort.data.filter(entry => {
      if (entry.hasOwnProperty('opening_hours') && entry.opening_hours.open_now){
        return entry
      }
    });
    return openEntries
  }


  applyFilters(entriesToFilter) {
    let entries = entriesToFilter;
    console.log(entries);
    let filters = {
      price: this.sortByPrice,
      is_open: this.sortByOpen,
      rating: this.sortByRating,
      favorited: this.sortByFavorited
    }

    for (var filter in filters) {
      if (this.state.activeFilters[filter]){
        var operation = filters[filter]
        entries = operation(entries)
      }
    }
    this.updateState(entries);
  }

  updateState(filteredEntries) {
    this.setState({entries: filteredEntries});
  }

  displayBusinessEntries() {
    const { favorites } = this.props;
    return this.state.entries.map((business) => 
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

        <button id="filterPrice" className="filterButton" onClick={ () => {
          let toggled = !this.state.activeFilters.price;
          this.setState({
              activeFilters: {
                price: toggled,
                rating: this.activeFilters.rating,
                is_open: this.activeFilters.is_open,
                nearby: this.activeFilters.nearby,
                favorited: this.activeFilters.favorited
              }
          })
        }}> Price </button>
        <button id="filterOpen" className="filterButton" onClick={ () => {
          this.sortByOpen();
        }}> Is Open </button>
        <button id="filterRating" className="filterButton" onClick={ () =>{
          this.sortByRating();
        }}> Rating </button>
        <button id="filterNearby" className="filterButton"> Nearby </button>
        <button id="filterFavorited" className="filterButton" onClick={ () => {
           this.sortByFavorited();
         }}> Favorited </button>
      </div>
        {this.displayBusinessEntries()}
      </div>
    )
  }
}

export default BusinessList;