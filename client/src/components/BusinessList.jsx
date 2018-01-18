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
        price: false,
        rating: false,
        is_open: false,
        nearby: false,
        favorited: false
      }
    }

    this.sortByPrice = this.sortByPrice.bind(this)
    this.sortByRating = this.sortByRating.bind(this)
    this.sortByFavorited = this.sortByFavorited.bind(this)
    this.sortByOpen = this.sortByOpen.bind(this);
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
    const favorites = this.props.favorites;
    let favoritedEntries = entriesToSort.filter(entry => {
      if (favorites[entry.id]){
       return entry
      }
    })
    return favoritedEntries;
  }

    sortPriceAndRating(entriesToSort, priority = 'rating') {
    console.log(entriesToSort.length)
    entriesToSort = entriesToSort.filter(entry => entry.rating && entry.price_level);
    console.log(entriesToSort.length);
    var sorted = entriesToSort.sort((a, b) => {
      if (a.rating > b.rating) {
        return -1
      } else if (b.rating > a.rating) {
        return 1 
      } else if (b.rating == a.rating) {
        console.log('even ', a.name, b.name, ' sorting by price')
        if (a.price > b.price) {
          return -1;
        } else if (b.price_level > a.price_level) {
          return 1;
        }
      }
    })
    return sorted;
  }



  sortByOpen(entriesToSort) {
    let openEntries = entriesToSort.filter(entry => {
      if (entry.hasOwnProperty('opening_hours') && entry.opening_hours.open_now){
        return entry
      }
    });
    return openEntries
  }


  applyFilters() {
    let entries = this.props.businesses.data;
    let filters = {
      is_open: this.sortByOpen,
      price: this.sortByPrice,
      rating: this.sortPriceAndRating,
      favorited: this.sortByFavorited
    }

    for (var filter in filters) {
      if (this.state.activeFilters[filter]){
        var operation = filters[filter]
        entries = operation(entries) // need to fix prioritization issue
      }
    }
    return entries;
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

  clickHandler(filter) {
    let toggled = !this.state.activeFilters[filter];
    this.state.activeFilters[filter] = toggled;
    this.state.entries = this.applyFilters();
    let state = this.state;
    this.setState(state)
  }

    render() {
    return (
      <div>
      <div className="filterOptionsBar">
        <button id="filterPrice" className="filterButton" style={this.state.activeFilters.price ? {"backgroundColor": "green"} :  {"backgroundColor": "red"}}  onClick={ () => {
          this.clickHandler('price');
        }}> Price </button>
        <button id="filterOpen" className="filterButton" style={this.state.activeFilters.is_open ? {"backgroundColor": "green"} :  {"backgroundColor": "red"}} onClick={ () => {
          this.clickHandler('is_open');
        }}> Is Open </button>
        <button id="filterRating" className="filterButton" style={this.state.activeFilters.rating ? {"backgroundColor": "green"} :  {"backgroundColor": "red"}} onClick={ () =>{
          this.clickHandler('rating');
        }}> Rating </button>
        <button id="filterFavorited" className="filterButton" style={this.state.activeFilters.favorited ? {"backgroundColor": "green"} :  {"backgroundColor": "red"}} onClick={ () => {
           this.clickHandler('favorited');
         }}> Favorited </button>
      </div>
        {this.displayBusinessEntries()}
      </div>
    )
  }
}

export default BusinessList;