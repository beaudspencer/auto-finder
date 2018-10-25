import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Uploader from './uploader'
import Load from './load'
import CarCard from './car-card'
import Cssbaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'

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
  text: {
    color: '#ffffff'
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'uploader',
      car: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(requestData) {
    this.setState({page: 'load'})
    fetch('/', {
      method: 'POST',
      body: requestData
    })
      .then(res => res.json())
      .then(data => {
        const car = {
          info: data[0][0],
          link: data[1]
        }
        this.setState({
          page: 'car',
          car: car
        })
      })
  }
  render() {
    return (
      <Cssbaseline>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <AppBar
              color="primary"
              position="relative"
            >
              <ToolBar>
                <Typography
                  variant="h4"
                  style={styles.text}
                >
                  Auto-Finder
                </Typography>
              </ToolBar>
            </AppBar>
            {this.state.page === 'uploader' &&
            <Uploader handleSubmit={this.handleSubmit}/>
            }
            {this.state.page === 'load' &&
            <Load/>
            }
            {this.state.page === 'car' &&
            <CarCard car={this.state.car}/>
            }
          </React.Fragment>
        </MuiThemeProvider>
      </Cssbaseline>
    )
  }
}
