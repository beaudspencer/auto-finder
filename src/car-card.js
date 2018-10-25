import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
  div: {
    margin: '3rem auto',
    width: 'fit-content'
  },
  card: {
    maxWidth: '435px'
  },
  media: {
    objectFit: 'cover'
  }
}

export default function CarCard(props) {
  return (
    <div style={styles.div}>
      <Card style={styles.card}>
        <CardMedia
          style={styles.media}
          component="img"
          alt="Car"
          image={props.car.imageURL}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
          >
            {props.car.model}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h6"
            gutterBottom
          >
            {'Make: ' + props.car.make}
          </Typography>
          <Typography
            color="textSecondary"
            variant="h6"
          >
            {'Year: ' + props.car.model_year}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
