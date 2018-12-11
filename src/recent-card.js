import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles,
  ButtonBase
} from '@material-ui/core'

const RecentsCard = withStyles({
  root: {
    display: 'inline-block',
    margin: '0 auto',
    width: '50%',
    maxWidth: '300px'
  }
})(Card)

const Instr = withStyles({
  root: {
    position: 'relative',
    bottom: '0.75rem'
  }
})(Typography)

export default function RecentCard(props) {
  const { car } = props
  return (
    <RecentsCard>
      <ButtonBase
        focusRipple
      >
        <CardMedia
          component="img"
          image={car.imageURL}
          title={car.model}
        />
      </ButtonBase>
      <CardContent>
        <Instr
          variant="caption"
          component="p"
        >
          (Click Image To Search)
        </Instr>
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
