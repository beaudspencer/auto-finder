import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

export default function Listing(props) {
  return (
    <Card>
      <CardContent>
        <Typography>{props.listing.title}</Typography>
        <Typography>{props.listing.price}</Typography>
        <Typography>{props.listing.url}</Typography>
      </CardContent>
    </Card>
  )
}
