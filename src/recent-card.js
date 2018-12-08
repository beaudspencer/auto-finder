import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core'

const RecentsCard = withStyles({
  root: {
    margin: '0 auto',
    width: '66%',
    maxWidth: '435px'
  }
})(Card)

export default function RecentCard(props) {
  const { car } = props
  return (
    <RecentsCard>
      <CardMedia
        component="img"
        image={car.imageURL}
        title={car.model}
      />
      <CardContent>
        <Typography
          component="h6"
          variant="h6"
        >
          {
            car.make
          }
          <br/>
          {
            car.model
          }
        </Typography>
      </CardContent>
    </RecentsCard>
  )
}
