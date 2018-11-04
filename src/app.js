import React from 'react'
import Cssbaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'
import Uploader from './uploader'
import CarCard from './car-card'
import Navi from './navi'
import ListingList from './listing-list'
import ListingDetailsContainer from './listing-details-container'
import hash from './hash'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  },
  background: {
    default: '#E0E0E0'
  },
  typography: {
    useNextVariants: true
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: {
        path: hash.parse(location.hash).path,
        params: hash.parse(location.hash).params
      },
      car: JSON.parse(localStorage.getItem('car')),
      faveListings: JSON.parse(localStorage.getItem('faveListings')),
      listings: JSON.parse(localStorage.getItem('listings')),
      listing: JSON.parse(localStorage.getItem('listing'))
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.pullListings = this.pullListings.bind(this)
    this.setListing = this.setListing.bind(this)
    this.favoriteListing = this.favoriteListing.bind(this)
  }
  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        view: hash.parse(location.hash)
      })
    })
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('car', JSON.stringify(this.state.car))
      localStorage.setItem('faveListings', JSON.stringify(this.state.faveListings))
      localStorage.setItem('listing', JSON.stringify(this.state.listing))
      localStorage.setItem('listings', JSON.stringify(this.state.listings))
    })
  }
  favoriteListing(listing) {
    const favorited = this.state.faveListings
      ? this.state.faveListings.flat().slice()
      : []
    favorited.push(listing)
    this.setState({
      faveListings: this.paginate(favorited)
    })
  }
  setListing(listing) {
    this.setState({
      listing: listing
    })
  }
  pullListings(car) {
    const searchTerm = car.make + ' ' + car.model
    navigator.geolocation.getCurrentPosition(pos => {
      const googleCoords = `${pos.coords.latitude},${pos.coords.longitude}`
      fetch(`/listings?search=${searchTerm}&latlng=${googleCoords}`, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(listings => {
          location.hash = location.hash = hash.stringify({
            path: 'listings',
            params: {
              page: 0
            }
          })
          this.setState({
            listings: this.paginate(listings)
          })
        })
    })
  }
  paginate(array) {
    const paginatedListings = []
    for (let c = 0; c < array.length; c += 10) {
      const page = array.flat().slice(c, c + 10)
      paginatedListings.push(page)
    }
    return paginatedListings
  }
  handleSubmit(requestData) {
    fetch('/', {
      method: 'POST',
      body: requestData
    })
      .then(res => res.json())
      .then(data => {
        location.hash = 'car'
        this.setState({
          car: data
        })
      })
  }
  renderPage() {
    if (this.state.view.path === 'uploader') {
      return (
        <Uploader
          handleSubmit={this.handleSubmit}
        />
      )
    }
    else if (this.state.view.path === 'car') {
      return <CarCard
        car={this.state.car}
        search={this.pullListings}
      />
    }
    else if (this.state.view.path === 'listing') {
      return <ListingDetailsContainer
        setListing={this.setListing}
      />
    }
    else if (this.state.view.path === 'listings') {
      return <ListingList
        car={this.state.car}
        faveListings={this.state.faveListings}
        favoriteListing={this.favoriteListing}
        listings={this.state.listings}
        page={parseInt(this.state.view.params.page, 10)}
      />
    }
    else if (this.state.view.path === 'favlistings') {
      return <ListingList
        page={parseInt(this.state.view.params.page, 10)}
        listings={this.state.faveListings}
        favorites={true}
      />
    }
  }
  render() {
    return (
      <Cssbaseline>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <Navi/>
            {this.renderPage()}
          </React.Fragment>
        </MuiThemeProvider>
      </Cssbaseline>
    )
  }
}
