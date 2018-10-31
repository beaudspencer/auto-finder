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
import hash from './hash'

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
    this.pullDetails = this.pullDetails.bind(this)
    this.favoriteListing = this.favoriteListing.bind(this)
  }
  pullDetails() {
    location.hash = hash.stringify({
      path: 'listing',
      params: {
        url: this.props.listing.url
      }
    })
  }
  favoriteListing() {
    this.props.favoriteListing(this.props.listing)
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
            variant="body1"
            component="h6"
          >
            <a
              href={this.props.listing.url}
              target="_blank"
              rel ="noopener noreferrer"
            >
              <Typography
                variant="subtitle2"
                component="p"
                color="primary"
              >
                Original Listing
              </Typography>
            </a>
          </Typography>
          <DetailButton
            onClick={this.pullDetails}
          >
            <InfoIcon />
          </DetailButton>
          <StarIconButton
            onClick={this.favoriteListing}
          >
            <StarBorderIcon />
          </StarIconButton>
        </CardContent>
      </FullCard>
    )
  }
}
