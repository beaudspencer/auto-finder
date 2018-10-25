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
    maxWidth: '300px'
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
          image={props.car.link}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
          >
            {props.car.info.model}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
          >
            {'Make: ' + props.car.info.make}
          </Typography>
          <Typography
            variant="h6"
          >
            {'Year: ' + props.car.info.model_year}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
