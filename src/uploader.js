import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'

const styles = {
  container: {
    marginTop: '5rem'
  },
  button: {
    margin: '0 auto',
    marginBottom: '1rem'
  },
  content: {
    width: 'fit-content',
    margin: '0 auto'
  },
  canvas: {
    display: 'none'
  }
}

const CaptureCard = withStyles({
  root: {
    width: '66%',
    maxWidth: '28rem',
    margin: '60px auto'
  }
})(Card)

export default class Uploader extends React.Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.canvas = React.createRef()
    this.handleCapture = this.handleCapture.bind(this)
  }
  startCapture() {
    const constraints = {
      video: true
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.video.current.srcObject = stream
      })
  }
  handleCapture() {
    const canvas = this.canvas.current
    const player = this.video.current
    const context = canvas.getContext('2d')
    context.drawImage(player, 0, 0, canvas.width, canvas.height)
    player.srcObject.getVideoTracks().forEach(track => track.stop())
    canvas.toBlob(blob => {
      const requestData = new FormData()
      requestData.append('image', blob)
      this.props.handleSubmit(requestData)
    })
  }
  componentDidMount() {
    this.startCapture()
  }
  render() {
    return (
      <div style={styles.container}>
        <Typography
          color="textPrimary"
          component="h4"
          variant="title"
          align="center"
          gutterBottom
        >
            Upload a photo of a car to get started
        </Typography>
        <CaptureCard>
          <CardContent>
            <div style={styles.content}>
              <video
                ref={this.video}
                id="player"
                autoPlay
                width="100%"
              ></video>
            </div>
            <div style={styles.canvas}>
              <canvas
                ref={this.canvas}
                id="canvas"
                width="4000"
                height="3000"
              ></canvas>
            </div>
          </CardContent>
          <CardActions>
            <div style={styles.button}>
              <Button
                onClick={this.handleCapture}
                variant="contained"
                color="primary"
              >
                capture!
              </Button>
            </div>
          </CardActions>
        </CaptureCard>
      </div>
    )
  }
}
