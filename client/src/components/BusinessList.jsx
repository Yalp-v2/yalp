

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
      filterActive: false,
      entries: this.props.businesses.data,
      sortedEntries: undefined,
      filteredEntries: undefined,
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
    const favorites = this.props.favorites;
    let favoritedEntries = entriesToSort.filter(entry => {
      if (favorites[entry.id]){
       return entry
      }
    })
    return favoritedEntries;
  }

  sortPrioritizeRating(entriesToSort) {
    console.log('priority: rating')
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
    console.log('priority: price')
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
    let operation;
    let filters = {
      favorited: this.sortByFavorited,
      is_open: this.sortByOpen
    }

    for (let filter in filters) { 
      if (this.state.activeFilters[filter]) {
        operation = filters[filter]
        entries = operation(entries)
      }
    }
    return entries;
  }

  applySorting(entries) {
    let sortedEntries;
    if (this.state.prioritize){ 
      if (this.state.prioritize === 'rating') { 
        sortedEntries = this.sortPrioritizeRating(entries)
      } else if (this.state.prioritize === 'price'){
        sortedEntries = this.sortPrioritizePrice(entries);
      } 
    }

   return sortedEntries
  }

  // updateState(entries, type) {
  //   this.setState({entries: filteredEntries});
  // }

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
    let newPriority = this.state.prioritize === 'rating' ? 'price' : 'rating'; // even if undefined will set to rating (which is ideal default anyway)
    this.setState({prioritize: newPriority}) 

    let filtered = this.applyFilters(this.props.businesses.data)
    let sorted = this.applySorting(filtered)
  
    this.setState({sortedEntries: sorted})
    this.setState({entries: sorted});
  }

  clickHandler(filter) {
    let filteredEntries;
    let toggled = !this.state.activeFilters[filter];

    this.state.activeFilters[filter] = toggled; 
    this.state.filterActive = toggled;
  
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
