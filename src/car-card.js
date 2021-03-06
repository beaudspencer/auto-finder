import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  div: {
    margin: '3rem auto',
    width: 'fit-content'
  },
  card: {
    position: 'relative',
    margin: '0 auto',
    width: '92%',
    maxWidth: '435px'
  },
  media: {
    objectFit: 'cover'
  },
  search: {
    position: 'absolute',
    right: '3rem',
    bottom: '1rem'
  }
}

const SearchButton = withStyles({
  root: {
    position: 'relative',
    right: '-1.5rem',
    bottom: '1rem'
  }
})(Button)

const SearchLoader = withStyles({
  root: {
    position: 'absolute',
    left: '1.32rem',
    bottom: '0.82rem'
  }
})(CircularProgress)

const FavButton = withStyles({
  root: {
    position: 'absolute',
    right: '0rem',
    top: '0rem'
  }
})(IconButton)

export default class CarCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorited: this.props.car ? this.props.car.favorited : false,
      loading: false
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleSearch() {
    this.props.search(this.props.car)
    this.setState({
      loading: true
    })
  }
  handleClick() {
    const favedCar = Object.assign({}, this.props.car)
    if (this.state.favorited) {
      favedCar.favorited = false
      this.props.unfavorite(favedCar)
    }
    else {
      favedCar.favorited = true
      this.props.favoriteCar(favedCar)
    }
    this.setState({
      favorited: !this.state.favorited
    })
  }
  render() {
    if (!this.props.car) {
      return (
        <div style={styles.div}>
          <Typography
            variant="h6"
            component="h2"
          >
            You have yet to find a car this session
          </Typography>
        </div>
      )
    }
    return (
      <React.Fragment>
        {this.props.car && <div style={styles.div}>
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
                variant="h6"
                component="h4"
              >
                {this.props.car.model}
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="h6"
                gutterBottom
              >
                {'Make: ' + this.props.car.make}
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="h6"
              >
                {'Year: ' + this.props.car.model_year}
              </Typography>
            </CardContent>
            <div style={styles.search}>
              <SearchButton
                onClick={this.handleSearch}
                variant="fab"
                color="primary"
              >
                <SearchIcon/>
              </SearchButton>
              {this.state.loading && <SearchLoader color="secondary" size={60}/>}
            </div>
            <FavButton
              onClick={this.handleClick}
            >
              {
                this.state.favorited
                  ? <StarIcon
                    color="secondary"
                  />
                  : <StarBorderIcon
                    color="secondary"
                  />
              }
            </FavButton>
          </Card>
        </div>}
      </React.Fragment>
    )
  }
}
