import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
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
import ListingDetailsContainer from './listing-details-container'
import hash from './hash'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  },
  background: {
    default: '#E0E0E0'
  }
})

const styles = {
  appButtons: {
    position: 'absolute',
    right: '4%'
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: {
        path: hash.parse(location.hash).path,
        params: hash.parse(location.hash).params
      },
      car: {
        body_style: 'SUV',
        confidence: '1.00',
        make: 'Jeep',
        model: 'Wrangler',
        model_year: '2018',
        imageURL: 'https://cdn.motor1.com/images/mgl/kgewn/s3/2017-jeep-wrangler.jpg'
      },
      listings: null,
      listing: null
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
    location.hash = 'load'
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
  renderPage(price) {
    if (this.state.view.path === 'uploader') {
      return (
        <Uploader
          handleSubmit={this.handleSubmit}
        />
      )
    }
    else if (this.state.view.path === 'load') {
      return <Load/>
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
        price={price}
      />
    }
    else if (this.state.view.path === 'listings') {
      return <ListingList
        car={this.state.car}
        listings={this.state.listings}
        pullDetails={this.renderPage}
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
                <div
                  style={styles.appButtons}
                >
                  <Button
                    href="#uploader"
                    color="inherit"
                  >
                    Uploader
                  </Button>
                  <Button
                    href="#car"
                    color="inherit"
                  >
                    Car
                  </Button>
                  <Button
                    href="#listings"
                    color="inherit"
                  >
                    Listings
                  </Button>
                </div>
              </ToolBar>
            </AppBar>
            {this.renderPage()}
          </React.Fragment>
        </MuiThemeProvider>
      </Cssbaseline>
    )
  }
}
