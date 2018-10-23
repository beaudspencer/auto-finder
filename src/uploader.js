import React from 'react'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

const styles = {
  card: {
    width: '50%',
    margin: '60px auto'
  },
  content: {
    width: 'fit-content',
    margin: '0 auto'
  }
}

export default function Uploader(props) {
  return (
    <div>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
      >
          Auto-Finder
      </Typography>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
          Upload a Photo of a car to get Started
      </Typography>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <form>
            <Input type="file" name="image"/>
            <Button
              onClick={props.handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit!
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
