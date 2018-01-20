import React from 'react';
import ReactDOM from 'react-dom';
import BusinessEntry from './BusinessEntry.jsx';
import { Link } from 'react-router-dom';
import Sortable from './FilterOptionsContainer.jsx';

class BusinessList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prioritize: 'rating',
      entries: this.props.businesses.data,
      activeFilters: {
        is_open: false,
        favorited: false
      }
    }

    this.sortByFavorited = this.sortByFavorited.bind(this);
    this.sortByOpen = this.sortByOpen.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  componentWillMount() {
    document.body.style.background = "url('wood.jpg')";
    document.body.style.backgroundSize = "100%";
    document.body.style.backgroundRepeat = "repeat-y";
  }

  sortByFavorited(entriesToSort) {
    const { favorites } = this.props;
    let favoritedEntries = entriesToSort.filter(entry => {
      if (favorites[entry.id]){
       return entry
      }
    })
    return favoritedEntries;
  }

  sortPrioritizeRating(entriesToSort) {
      let sorted = entriesToSort.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1
        } else if (b.rating > a.rating) {
          return 1 
        } else if (b.rating == a.rating) {
          if (a.price_level > b.price_level) {
            return -1;
          } else if (b.price_level > a.price_level) {
            return 1;
          }
        }
      })
    return sorted;
  }

  sortPrioritizePrice(entriesToSort) {
    let entriesWithPrices = entriesToSort.filter(entry => entry.price_level);
    let sorted = entriesWithPrices.sort((a, b) => {
      if (a.price_level > b.price_level) {
        return -1
      } else if (b.price_level > a.price_level) {
        return 1 
      } else if (b.price_level == a.price_level) {
        if (a.rating > b.rating) {
          return -1;
        } else if (b.rating > a.rating) {
          return 1;
        }
      }
    })
    return sorted 
  }

  sortByOpen(entriesToSort) {
    let openEntries = entriesToSort.filter(entry => {
      if (entry.hasOwnProperty('opening_hours') && entry.opening_hours.open_now){
        return entry
      }
    });
    return openEntries
  }

  applyFilters(entries) {
    let filters = {
      favorited: this.sortByFavorited,
      is_open: this.sortByOpen
    }
    for (let filter in filters) { 
      if (this.state.activeFilters[filter]) {
        let operation = filters[filter]
        entries = operation(entries)
      }
    }
    return entries;
  }

  applySorting(entries) {
    let sortedEntries = this.state.prioritize === 'rating' ? this.sortPrioritizeRating(entries) : this.sortPrioritizePrice(entries);
    return sortedEntries
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

  handleDrag() {
    let newPriority = this.state.prioritize === 'rating' ? 'price' : 'rating'; 
    this.setState({prioritize: newPriority}) 
    let filtered = this.applyFilters(this.props.businesses.data)
    let sorted = this.applySorting(filtered)
    this.setState({entries: sorted});
  }

  clickHandler(filter) {
    this.state.activeFilters[filter] = !this.state.activeFilters[filter];
    let newFilters = this.state.activeFilters 
    this.setState({activeFilters: newFilters})
    let sorted = this.applySorting(this.props.businesses.data);
    let filtered = this.applyFilters(sorted);
    this.setState({entries: filtered})
  }

    render() {
    return (
      <div>
      <div className="filterOptionsBar">
        <button id="filterOpen" className="filterButton" style={this.state.activeFilters.is_open ? {"backgroundColor": "green"} :  {"backgroundColor": "red"}} onClick={ () => {
          this.clickHandler('is_open');
        }}> Is Open </button>
        <button id="filterFavorited" className="filterButton" style={this.state.activeFilters.favorited ? {"backgroundColor": "green"} :  {"backgroundColor": "red"}} onClick={ () => {
           this.clickHandler('favorited');
         }}> Favorited </button>
      </div>
      <div className="sortingOptionsBar">
      <Sortable click={this.clickHandler} dragHandler={this.handleDrag} items={["Rating", "Price"]}/>
      </div>
        {this.displayBusinessEntries()}
      </div>
    )
  }
}

export default BusinessList;
