import React from 'react'
import {List, ListItem, Button, withStyles, Typography} from '@material-ui/core'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Listing from './listing'
import hash from './hash'
import FilterMenu from './filter-menu'

const styles = {
  listItem: {
    width: '92%',
    maxWidth: '40rem',
    margin: '0 auto'
  },
  container: {
    textAlign: 'center'
  }
}

const ListingsTitle = withStyles({
  root: {
    margin: '0 auto',
    width: '92%',
    textAlign: 'center',
    marginTop: '1rem'
  }
})(Typography)

const NextButton = withStyles({
  root: {
    float: 'right',
    marginBottom: '2rem',
    marginRight: '8%',
    display: 'inline-block'
  }
})(Button)

const PrevButton = withStyles({
  root: {
    float: 'left',
    marginBottom: '2rem',
    marginLeft: '8%',
    display: 'inline-block'
  }
})(Button)

const CurrentPage = withStyles({
  root: {
    position: 'absolute',
    left: '50%',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    marginLeft: '-16px',
    width: 'fit-content'
  }
})(Typography)

export default class ListingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterBy: null
    }
    this.query = hash.parse(location.hash).params
    this.handleClick = this.handleClick.bind(this)
    this.favoriteListing = this.favoriteListing.bind(this)
    this.filterBy = this.filterBy.bind(this)
    this.unfavorite = this.unfavorite.bind(this)
  }
  filterBy(filter) {
    this.setState({
      filterBy: filter
    })
  }
  favoriteListing(listing) {
    this.props.favoriteListing(listing)
  }
  unfavorite(listing) {
    this.props.unfavorite(listing)
  }
  handleClick(event) {
    window.scrollTo(0, 0)
    const id = event.target.closest('button').id
    if (id === 'prev' && this.props.page > 0) {
      location.hash = hash.stringify({
        path: hash.parse(location.hash).path,
        params: {
          page: this.props.page - 1
        }
      })
    }
    else if (id === 'next' && this.props.page < this.props.listings.length) {
      location.hash = hash.stringify({
        path: hash.parse(location.hash).path,
        params: {
          page: this.props.page + 1
        }
      })
    }
  }
  checkFavorite(favorites, listing) {
    for (let c = 0; c < favorites.flat().length || 0; c++) {
      if (favorites.flat()[c].pid === listing.pid) {
        return true
      }
    }
    return false
  }
  renderList() {
    if (this.props.listings.length < 1) {
      return <ListingsTitle
        variant="h6"
        component="h3"
        color="inherit"
      >
        No Listings Have Been Favorited
      </ListingsTitle>
    }
    return (this.props.listings[this.props.page].filter(listing => {
      if (this.state.filterBy === 'pic') {
        return listing.hasPic
      }
      else {
        return true
      }
    }).map(listing => {
      let favorited = this.props.faveListings
        ? this.checkFavorite(this.props.faveListings, listing)
        : false
      if (this.props.favorites) {
        favorited = true
      }
      return (
        <div key={listing.pid} style={styles.listItem}>
          <ListItem>
            <Listing
              listing={listing}
              favorited={favorited}
              favoriteListing={this.favoriteListing}
              unfavorite={this.unfavorite}
            />
          </ListItem>
        </div>
      )
    })
    )
  }
  renderHeading() {
    if (this.props.favorites) {
      return (
        <React.Fragment>
          <FilterMenu
            filterBy={this.filterBy}
          />
          <ListingsTitle
            variant="h6"
            component="h2"
            color="inherit"
          >
            Favorite Listings
          </ListingsTitle>
        </React.Fragment>
      )
    }
    if (!this.props.listings) {
      return (
        <ListingsTitle
          variant="h6"
          component="h2"
          color="inherit"
        >
          No listings have been searched for this session.
        </ListingsTitle>
      )
    }
    else if (this.props.listings.length < 1) {
      return (
        <ListingsTitle
          variant="h6"
          component="h2"
          color="inherit"
        >
          {`No Results Found for ${this.query.make} ${this.query.model}`}
        </ListingsTitle>)
    }
    else {
      return (
        <React.Fragment>
          <FilterMenu
            filterBy={this.filterBy}
          />
          <ListingsTitle
            variant="h6"
            component="h2"
            color="inherit"
          >
            {
              `Showing Listings For ${this.query.make} ${this.query.model}`
            }
          </ListingsTitle>
        </React.Fragment>
      )
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.renderHeading()}
        {
          this.props.listings &&
          <React.Fragment>
            <List>
              {
                this.renderList()
              }
            </List>
            <div style={styles.container}>
              {this.props.page > 0 &&
                <PrevButton
                  id="prev"
                  onClick={this.handleClick}
                >
                  <ArrowBack/>
                </PrevButton>}
              {this.props.page + 1 < this.props.listings.length &&
                <NextButton
                  id="next"
                  onClick={this.handleClick}
                >
                  <ArrowForward/>
                </NextButton>}
              <CurrentPage
                variant="body1"
                component="h6"
                color="inherit"
              >
                {this.props.page + 1}
              </CurrentPage>
            </div>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
