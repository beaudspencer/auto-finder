import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
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
              variant="h4"
            >
              {this.props.car.model}
            </Typography>
            <Typography
              color="textSecondary"
              variant="h6"
              gutterBottom
            >
              {'Make: ' + this.props.car.make}
            </Typography>
            <Typography
              color="textSecondary"
              variant="h6"
            >
              {'Year: ' + this.props.car.model_year}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.handleSearch}>
              {this.state.loading ? 'searching...' : 'Find Listings'}
            </Button>
            {this.state.loading && <CircularProgress color="secondary" size={30}/>}
          </CardActions>
        </Card>
      </div>
    )
  }
}
