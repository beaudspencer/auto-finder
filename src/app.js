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
      page: 'uploader',
      car: null,
      listings: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.pullListings = this.pullListings.bind(this)
  }
  pullListings(car) {
    const searchTerm = car.make + ' ' + car.model
    fetch(`/listings?search=${searchTerm}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(listings => {
        this.setState({
          listings: listings,
          page: 'listings'
        })
      })
  }
  handleSubmit(requestData) {
    this.setState({page: 'load'})
    fetch('/', {
      method: 'POST',
      body: requestData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          page: 'car',
          car: data
        })
      })
  }
  renderPage() {
    if (this.state.page === 'uploader') {
      return (
        <Uploader handleSubmit={this.handleSubmit}/>
      )
    }
    else if (this.state.page === 'load') {
      return <Load/>
    }
    else if (this.state.page === 'car') {
      return <CarCard
        car={this.state.car}
        search={this.pullListings}
      />
    }
    else if (this.state.page === 'listings') {
      return <ListingList listings={this.state.listings}/>
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
                  variant="h4"
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
