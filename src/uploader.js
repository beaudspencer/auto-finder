import React from 'react'
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
  },
  canvas: {
    display: 'none'
  }
}

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
            <div style={styles.content}>
              <video
                ref={this.video}
                id="player"
                autoPlay
                width="384"
                height="384"
              ></video>
            </div>
            <div style={styles.canvas}>
              <canvas
                ref={this.canvas}
                id="canvas"
                width="256"
                height="256"
              ></canvas>
            </div>
            <div style={styles.content}>
              <Button
                onClick={this.handleCapture}
                variant="contained"
                color="primary"
              >
                capture!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
