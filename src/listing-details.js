import React from 'react'
import {
  Card,
  CardActions,
  Button,
  CardMedia,
  Typography,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'
import {ArrowBack, ArrowForward, ExpandMore} from '@material-ui/icons'

const styles = {
  container: {
    width: '92%',
    maxWidth: '40rem',
    margin: '1rem auto'
  }
}

const DetailsCard = withStyles({
  root: {
    textAlign: 'center',
    margin: '1rem auto'
  }
})(Card)

const NoImagesText = withStyles({
  root: {
    margin: '1rem auto'
  }
})(Typography)

const ImageWide = withStyles({
  media: {
    height: '20rem',
    width: 'auto',
    margin: '1rem auto'
  }
})(CardMedia)

const ImageSkinny = withStyles({
  media: {
    height: '30vh',
    width: 'auto',
    margin: '1rem auto'
  }
})(CardMedia)

const ImageTracker = withStyles({
  root: {
    position: 'absolute',
    marginTop: '0.7rem',
    left: '50%',
    transform: 'translateX(-50%)'
  }
})(Typography)

const CardButtons = withStyles({
  root: {
    width: '100%',
    display: 'inline-block'
  }
})(CardActions)

const Next = withStyles({
  root: {
    float: 'right',
    marginRight: '1rem'
  }
})(Button)

const Prev = withStyles({
  root: {
    float: 'left',
    marginLeft: '1rem'
  }
})(Button)

const SpaceExpansion = withStyles({
  root: {
    margin: '1rem 0'
  }
})(ExpansionPanel)

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
    const postedTimeStamp = details.postedAt.slice(0, 10)
    let updatedTimeStamp = null
    if (details.updatedAt) {
      updatedTimeStamp = details.updatedAt.slice(0, 10)
    }
    return (
      <React.Fragment>
        <div style={styles.container}>
          <Typography
            variant="h6"
            component="h2"
            color="inherit"
          >
            {details.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="h4"
          >
            {'Posted: ' + postedTimeStamp}
          </Typography>
          <DetailsCard>
            {
              details.images &&
            <React.Fragment>
              {this.state.view === 'skinny' &&
                <ImageSkinny
                  component="img"
                  title="Current-Car-Image"
                  image={details.images[currentImg]}
                />
              }
              {this.state.view === 'wide' &&
                <ImageWide
                  component="img"
                  title="Current-Car-Image"
                  image={details.images[currentImg]}
                />
              }
            </React.Fragment>
            }
            {
              !details.images &&
              <NoImagesText
                variant="h6"
                component="div"
              >
                No Images!
              </NoImagesText>
            }
            {
              details.images &&
              <CardButtons>
                <Prev
                  onClick={this.handleClick}
                  id="back"
                >
                  <ArrowBack/>
                </Prev>
                <ImageTracker
                  component="div"
                >
                  {(currentImg + 1) + ' of ' + details.images.length}
                </ImageTracker>
                <Next
                  onClick={this.handleClick}
                  id="forth"
                >
                  <ArrowForward/>
                </Next>
              </CardButtons>
            }
          </DetailsCard>
          <SpaceExpansion defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
              <Typography
                variant="body1"
                gutterBottom
              >
              Description:
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography
                variant="body1"
                gutterBottom
              >
                {details.description}
              </Typography>
            </ExpansionPanelDetails>
          </SpaceExpansion>
          <SpaceExpansion>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
              <Typography
                gutterBottom
                variant="body1"
              >
                  Attributes:
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography
                variant="body2"
              >
                {Object.entries(attributes).map(attribute => {
                  return (
                    <React.Fragment key={attribute[0]}>
                      {attribute[0] + ': ' + attribute[1]}
                      <br/>
                    </React.Fragment>
                  )
                })}
              </Typography>
            </ExpansionPanelDetails>
          </SpaceExpansion>
          <a
            href={details.url}
            target="_blank"
            rel ="noopener noreferrer"
          >
            <Typography
              gutterBottom
              color="primary"
            >
                Original Listing
            </Typography>
          </a>
          <Typography
            gutterBottom
            color="textSecondary"
          >
            {'Last Updated: ' + updatedTimeStamp ? updatedTimeStamp : 'Not Updated'}
          </Typography>
        </div>
      </React.Fragment>
    )
  }
}
