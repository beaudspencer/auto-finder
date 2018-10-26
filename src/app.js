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
      page: 0,
      view: 'car',
      car: {
        body_style: 'Sedan',
        confidence: '0.68',
        imageURL: 'https://auto-finder.s3.us-west-1.amazonaws.com/9a6cd249-20ce-4f30-9906-01db4990739a',
        make: 'Mercedes-Benz',
        model: 'E-Class',
        model_year: '1996'
      },
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
          listings: this.paginate(listings),
          page: 'listings'
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
    if (this.state.view === 'uploader') {
      return (
        <Uploader handleSubmit={this.handleSubmit}/>
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
    else if (this.state.view === 'listings') {
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
