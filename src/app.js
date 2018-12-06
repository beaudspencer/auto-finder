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
import Search from './search'
import CarList from './car-list'

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
      car: null,
      lastSearch: {
        make: null,
        model: null
      },
      faveListings: JSON.parse(localStorage.getItem('faveListings')),
      faveCars: JSON.parse(localStorage.getItem('faveCars')),
      listings: JSON.parse(localStorage.getItem('listings')),
      listing: JSON.parse(localStorage.getItem('listing')),
      recents: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.pullListings = this.pullListings.bind(this)
    this.setListing = this.setListing.bind(this)
    this.favoriteListing = this.favoriteListing.bind(this)
    this.favoriteCar = this.favoriteCar.bind(this)
    this.unfavoriteListing = this.unfavoriteListing.bind(this)
    this.unfavoriteCar = this.unfavoriteCar.bind(this)
  }
  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        view: hash.parse(location.hash)
      })
    })
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('car', JSON.stringify(this.state.car))
      localStorage.setItem('faveCars', JSON.stringify(this.state.faveCars))
      localStorage.setItem('faveListings', JSON.stringify(this.state.faveListings))
      localStorage.setItem('listing', JSON.stringify(this.state.listing))
      localStorage.setItem('listings', JSON.stringify(this.state.listings))
      localStorage.setItem('recents', JSON.stringify(this.state.recents))
    })
  }
  updateRecents(newRecent) {
    const recents = this.state.recents
      ? this.state.recents.slice()
      : []
    if (recents.length < 3) {
      recents.unshift(newRecent)
    }
    else if (recents.length === 3) {
      recents.pop()
      recents.unshift(newRecent)
    }
    this.setState({
      recents: recents
    })
  }
  favoriteCar(car) {
    const faveCars = this.state.faveCars
      ? this.state.faveCars.slice()
      : []
    faveCars.push(car)
    this.setState({
      faveCars: this.paginate(faveCars),
      car: car
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
  unfavoriteCar(unCar) {
    const index = this.state.faveCars.flat().findIndex(car => {
      return car.model === unCar.model
    })
    const before = this.state.faveCars.flat().slice(0, index)
    const after = this.state.faveCars.flat().slice((index + 1))
    const newFaves = [...before, ...after]
    this.setState({
      faveCars: this.paginate(newFaves)
    })
  }
  unfavoriteListing(unListing) {
    const index = this.state.faveListings.flat().findIndex(listing => {
      return listing.pid === unListing.pid
    })
    const before = this.state.faveListings.flat().slice(0, index)
    const after = this.state.faveListings.flat().slice((index + 1))
    const newFaves = [...before, ...after]
    this.setState({
      faveListings: this.paginate(newFaves)
    })
  }
  setListing(listing) {
    this.setState({
      listing: listing
    })
  }
  pullListings(car) {
    const searchTerm = car.make.concat(' ', car.model)
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
              page: 0,
              make: car.make,
              model: car.model
            }
          })
          this.setState({
            listings: this.paginate(listings),
            lastSearch: {
              make: car.make,
              model: car.model
            }
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
        const fullData = Object.assign({}, {favorited: false}, data)
        location.hash = 'car'
        this.setState({
          car: fullData
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
        favoriteCar={this.favoriteCar}
        unfavoriteCar={this.unfavoriteCar}
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
        unfavorite={this.unfavoriteListing}
      />
    }
    else if (this.state.view.path === 'directsearch') {
      return (
        <Search pullListings={this.pullListings}/>
      )
    }
    else if (this.state.view.path === 'favecars') {
      return (
        <CarList
          pullListings={this.pullListings}
          page={parseInt(this.state.view.params.page, 10)}
          cars={this.state.faveCars}
          unfavorite={this.unfavoriteCar}
        />
      )
    }
  }
  render() {
    return (
      <Cssbaseline>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <Navi
              lastSearch={this.state.lastSearch}
            />
            {this.renderPage()}
          </React.Fragment>
        </MuiThemeProvider>
      </Cssbaseline>
    )
  }
}
