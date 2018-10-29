import React from 'react'
import {Card, CardHeader, CardActions, Button, CardContent, CardMedia, Typography, withStyles} from '@material-ui/core'
import {ArrowRight, ArrowLeft} from '@material-ui/icons'

const DetailsCard = withStyles({
  root: {
    width: '92%',
    maxWidth: '40rem',
    margin: '2rem auto'
  }
})(Card)

const CardImageWide = withStyles({
  media: {
    height: '20rem',
    width: 'auto',
    margin: '0 auto'
  }
})(CardMedia)

const CardImageSkinny = withStyles({
  media: {
    height: '30vh',
    width: 'auto',
    margin: '0 auto'
  }
})(CardMedia)

const CardButtons = withStyles({
  root: {
    width: '100%',
    display: 'inline-block'
  }
})(CardActions)

const Header = withStyles({
  root: {
    textAlign: 'center'
  }
})(CardHeader)

const Next = withStyles({
  root: {
    float: 'right'
  }
})(Button)

export default class ListingDetails extends React.Component {
  constructor(props) {
    super(props)
    this.mql = window.matchMedia('(max-width: 450px)')
    this.state = {
      view: 'skinny',
      currentImg: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleScreen = this.handleScreen.bind(this)
  }
  handleClick(event) {
    const {details} = this.props
    const id = event.target.closest('button').id
    if (id === 'forth' && this.state.currentImg < details.images.length - 1) {
      this.setState({
        currentImg: this.state.currentImg + 1
      })
    }
    else if (id === 'back' && this.state.currentImg > 0) {
      this.setState({
        currentImg: this.state.currentImg - 1
      })
    }
  }
  handleScreen(event) {
    if (event.matches) {
      this.setState({
        view: 'skinny'
      })
    }
    else {
      this.setState({
        view: 'wide'
      })
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mql.addListener(this.handleScreen)
  }
  componentWillUnmount() {
    this.mql.removeListener(this.handleScreen)
  }
  render() {
    const {details} = this.props
    const {currentImg} = this.state
    const {attributes} = details
    return (
      <React.Fragment>
        <DetailsCard>
          <Header
            title={details.title}
            subheader={'Posted: ' + details.postedAt}
          />
          {this.state.view === 'skinny' &&
            <CardImageSkinny
              component="img"
              title="Current-Car-Image"
              image={details.images[currentImg]}
            />
          }
          {this.state.view === 'wide' &&
            <CardImageWide
              component="img"
              title="Current-Car-Image"
              image={details.images[currentImg]}
            />
          }
          <CardButtons>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              id="back"
            >
              <ArrowLeft/>
            </Button>
            <Next
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              id="forth"
            >
              <ArrowRight/>
            </Next>
          </CardButtons>
          <CardContent>
            <Typography
              gutterBottom
            >{details.description}</Typography>
            <Typography gutterBottom>Attributes: </Typography>
            {Object.entries(attributes).map(attribute => {
              return (
                <Typography key={attribute[0]} gutterBottom>
                  {attribute[0] + ': ' + attribute[1]}
                </Typography>
              )
            })}
          </CardContent>
        </DetailsCard>
      </React.Fragment>
    )
  }
}
