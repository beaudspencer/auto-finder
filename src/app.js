import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Cssbaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'
import Uploader from './uploader'
import Load from './load'
import CarCard from './car-card'
import ListingList from './listing-list'
import ListingDetails from './listing-details'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  },
  background: {
    default: '#E0E0E0'
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'car',
      car: null,
      listings: null,
      listing: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.pullListings = this.pullListings.bind(this)
    this.pullDetails = this.pullDetails.bind(this)
  }
  pullDetails(url, price) {
    fetch(`/details?url=${url}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(details => {
        Object.assign(details, {price: price})
        this.setState({
          view: 'listing',
          listing: details
        })
      })
  }
  pullListings(car) {
    const searchTerm = car.make + ' ' + car.model
    fetch(`/listings?search=${searchTerm}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(listings => {
        this.setState({
          listings: this.paginate(listings),
          view: 'listings'
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
    this.setState({view: 'load'})
    fetch('/', {
      method: 'POST',
      body: requestData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          view: 'car',
          car: data
        })
      })
  }
  renderPage() {
    if (this.state.view === 'uploader') {
      return (
        <Uploader
          handleSubmit={this.handleSubmit}
        />
      )
    }
    else if (this.state.view === 'load') {
      return <Load/>
    }
    else if (this.state.view === 'car') {
      return <CarCard
        car={this.state.car}
        search={this.pullListings}
      />
    }
    else if (this.state.view === 'listing') {
      return <ListingDetails
        details={this.state.listing}
      />
    }
    else if (this.state.view === 'listings') {
      return <ListingList
        car={this.state.car}
        listings={this.state.listings}
        pullDetails={this.pullDetails}
      />
    }
  }
  render() {
    return (
      <Cssbaseline>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <AppBar
              color="primary"
              position="sticky"
            >
              <ToolBar>
                <Typography
                  variant="title"
                  component="h6"
                  color="inherit"
                >
                  Auto-Finder
                </Typography>
              </ToolBar>
            </AppBar>
            {this.renderPage()}
          </React.Fragment>
        </MuiThemeProvider>
      </Cssbaseline>
    )
  }
}
