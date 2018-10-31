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
      car: null,
      faveListings: [],
      listings: null,
      listing: null,
      listingPrice: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.pullListings = this.pullListings.bind(this)
    this.setListing = this.setListing.bind(this)
  }
  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        view: hash.parse(location.hash)
      })
    })
  }
  setListing(listing) {
    this.setState({
      listing: listing
    })
  }
  pullListings(car) {
    const searchTerm = car.make + ' ' + car.model
    fetch(`/listings?search=${searchTerm}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(listings => {
        location.hash = 'listings'
        this.setState({
          listings: this.paginate(listings)
        })
      })
  }
  paginate(array) {
    const paginatedListings = []
    for (let c = 0; c < array.length; c += 10) {
      const page = array.slice(c, c + 10)
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
        listings={this.state.listings}
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
