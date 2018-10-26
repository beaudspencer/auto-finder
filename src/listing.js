import React from 'react'
import {Card, CardContent, Typography, withStyles} from '@material-ui/core'

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

export default function Listing(props) {
  return (
    <FullCard>
      <CardContent>
        <Typography
          variant="title"
          component="h2"
          gutterBottom
        >
          {props.listing.title}
        </Typography>
        <MoneyText
          variant="subtitle1"
          component="h4"
          gutterBottom
        >
          {props.listing.price ? props.listing.price : 'No Price Listed!'}
        </MoneyText>
        <Typography
          variant="body1"
          component="h6"
        >
          <a
            href={props.listing.url}
            target="_blank"
            rel ="noopener noreferrer"
          >
            Original Listing
          </a>
        </Typography>
      </CardContent>
    </FullCard>
  )
}
