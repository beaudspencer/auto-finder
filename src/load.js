import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const styles = {
  div: {
    marginTop: '5rem'
  },
  load: {
    'textAlign': 'center',
    margin: '4rem'
  }
}

export default function Load(props) {
  return (
    <div style={styles.div}>
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
        Fetching your results now!
      </Typography>
    </div>
  )
}
