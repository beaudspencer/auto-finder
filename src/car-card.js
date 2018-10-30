import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
  div: {
    margin: '3rem auto',
    width: 'fit-content'
  },
  card: {
    margin: '0 auto',
    width: '92%',
    maxWidth: '435px'
  },
  media: {
    objectFit: 'cover'
  }
}

const SearchButton = withStyles({
  root: {
    position: 'relative',
    right: '0.5rem'
  }
})(Button)

export default class CarCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch() {
    this.props.search(this.props.car)
    this.setState({
      loading: true
    })
  }
  render() {
    return (
      <div style={styles.div}>
        <Card style={styles.card}>
          <CardMedia
            style={styles.media}
            component="img"
            alt="Car"
            image={this.props.car.imageURL}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="title"
              component="h4"
            >
              {this.props.car.model}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subheading"
              component="h6"
              gutterBottom
            >
              {'Make: ' + this.props.car.make}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subheading"
              component="h6"
            >
              {'Year: ' + this.props.car.model_year}
            </Typography>
          </CardContent>
          <CardActions>
            <SearchButton onClick={this.handleSearch}>
              {this.state.loading ? 'searching...' : 'Find Listings'}
            </SearchButton>
            {this.state.loading && <CircularProgress color="secondary" size={30}/>}
          </CardActions>
        </Card>
      </div>
    )
  }
}
