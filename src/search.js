import React from 'react'
import SearchIcon from '@material-ui/icons/Search'

import {
  TextField,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  withStyles,
  Button
} from '@material-ui/core'

const styles = {
  inputs: {
    width: '92%'
  }
}

const SearchButton = withStyles({
  root: {
    transform: 'translate(25%)',
    marginBottom: '1rem'
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

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      make: '',
      model: ''
    }
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
              fullWidth
              label="Make"
              placeholder="e.g. Toyota"
              variant="outlined"
              margin="normal"
            />
          </div>
          <div
            style={styles.inputs}
          >
            <TextField
              fullWidth
              label="Model"
              placeholder="e.g. Supra"
              variant="outlined"
              margin="normal"
            />
          </div>
        </CardContent>
        <CardActions>
          <SearchButton
            variant="fab"
            color="primary"
          >
            <SearchIcon/>
          </SearchButton>
        </CardActions>
      </SearchCard>
    )
  }
}
