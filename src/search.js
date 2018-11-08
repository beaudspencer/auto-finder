import React from 'react'
import SearchIcon from '@material-ui/icons/Search'

import {
  TextField,
  Card,
  CardContent,
  CardHeader,
  withStyles,
  Button,
  CircularProgress
} from '@material-ui/core'

const styles = {
  inputs: {
    width: '92%'
  }
}

const BottomField = withStyles({
  root: {
    marginBottom: '4rem'
  }
})(TextField)

const SearchButton = withStyles({
  root: {
    position: 'absolute',
    left: '2rem',
    bottom: '1rem'
  }
})(Button)

const SearchCard = withStyles({
  root: {
    position: 'relative',
    width: '92%',
    maxWidth: '40rem',
    margin: '3rem auto'
  }
})(Card)

const SearchLoader = withStyles({
  root: {
    position: 'absolute',
    left: '1.85rem',
    bottom: '0.85rem',
    zIndex: '1'
  }
})(CircularProgress)

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      make: '',
      model: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange(event) {
    const {id, value} = event.target
    this.setState({
      [id]: value
    })
  }
  handleClick() {
    this.setState({
      loading: true
    })
    const {make, model} = this.state
    const newCar = Object.assign({}, {make, model})
    this.props.pullListings(newCar)
  }
  render() {
    return (
      <SearchCard>
        <CardHeader
          title="Direct Search"
          subheader="Look up a car directly by it's make and model"
        />
        <CardContent>
          <div
            style={styles.inputs}
          >
            <TextField
              onChange={this.handleChange}
              fullWidth
              id="make"
              label="Make"
              placeholder="e.g. Toyota"
              variant="outlined"
              margin="normal"
            />
          </div>
          <div
            style={styles.inputs}
          >
            <BottomField
              onChange={this.handleChange}
              fullWidth
              id="model"
              label="Model"
              placeholder="e.g. Supra"
              variant="outlined"
              margin="normal"
            />
          </div>
          {
            this.state.loading &&
            <SearchLoader
              color="secondary"
              size={60}
            />
          }
          <SearchButton
            variant="fab"
            color="primary"
            onClick={this.handleClick}
          >
            <SearchIcon/>
          </SearchButton>
        </CardContent>
      </SearchCard>
    )
  }
}
