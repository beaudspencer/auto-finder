import React from 'react'
import {Card, CardContent, Typography, withStyles, Button} from '@material-ui/core'
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
    right: '2.5rem',
    bottom: '15%'
  }
})(Button)

export default class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.pullDetails = this.pullDetails.bind(this)
  }
  pullDetails() {
    location.hash = hash.stringify({
      path: 'listing',
      params: {
        url: this.props.listing.url
      }
    })
  }
  render() {
    return (
      <FullCard>
        <CardContent>
          <Typography
            variant="title"
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
            View Details
          </DetailButton>
        </CardContent>
      </FullCard>
    )
  }
}
