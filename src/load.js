import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const styles = {
  load: {
    'text-align': 'center',
    margin: '4rem'
  }
}

export default function Load(props) {
  return (
    <div>
      <Typography
        variant="h2"
        align="center"
      >
        Just a moment...
      </Typography>
      <div style={styles.load}>
        <CircularProgress color="secondary"/>
      </div>
      <Typography
        variant="h4"
        align="center"
      >
        fetching your results now!
      </Typography>
    </div>
  )
}
