import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  withStyles,
  IconButton
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/InfoOutlined'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import hash from './hash'

const Link = withStyles({
  root: {
    width: 'fit-content'
  }
})(Typography)

const FullCard = withStyles({
  root: {
    width: '100%'
  }
})(Card)

const MoneyText = withStyles({
  root: {
    color: 'green'
  }
})(Typography)

const DetailButton = withStyles({
  root: {
    position: 'absolute',
    right: '2rem',
    bottom: '1.2rem'
  }
})(IconButton)

const StarIconButton = withStyles({
  root: {
    position: 'absolute',
    bottom: '1.2rem',
    right: '4.5rem'
  }
})(IconButton)

export default class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorited: this.props.favorited
    }
    this.pullDetails = this.pullDetails.bind(this)
    this.favoriteListing = this.favoriteListing.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  pullDetails() {
    location.hash = hash.stringify({
      path: 'listing',
      params: {
        url: this.props.listing.url
      }
    })
  }
  handleClick() {
    if (this.state.favorited) {
      this.unfavoriteListing()
    }
    else {
      this.favoriteListing()
    }
  }
  favoriteListing() {
    this.setState({
      favorited: true
    })
    this.props.favoriteListing(this.props.listing)
  }
  unfavoriteListing() {
    this.setState({
      favorited: false
    })
    this.props.unfavorite(this.props.listing)
  }
  render() {
    return (
      <FullCard>
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
          >
            {this.props.listing.title}
          </Typography>
          <MoneyText
            variant="subtitle1"
            component="h4"
            gutterBottom
          >
            {this.props.listing.price
              ? this.props.listing.price
              : 'No Price Listed!'}
          </MoneyText>
          <Typography
            variant="subtitle1"
            component="p"
            gutterBottom
          >
            {this.props.listing.location
              ? `Location: ${this.props.listing.location}`
              : 'No location listed'
            }
          </Typography>
          <Link
            variant="subtitle2"
            component="p"
            color="primary"
          >
            <a
              href={this.props.listing.url}
              target="_blank"
              rel ="noopener noreferrer"
            >
              Original Listing
            </a>
          </Link>
          <DetailButton
            onClick={this.pullDetails}
          >
            <InfoIcon />
          </DetailButton>
          <StarIconButton
            onClick={this.handleClick}
          >
            {
              this.state.favorited
                ? <StarIcon color="secondary"/>
                : <StarBorderIcon color="secondary"/>
            }
          </StarIconButton>
        </CardContent>
      </FullCard>
    )
  }
}
