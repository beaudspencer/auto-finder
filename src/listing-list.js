import React from 'react'
import {List, ListItem, Button, withStyles, Typography} from '@material-ui/core'
import ArrowRight from '@material-ui/icons/ArrowRightRounded'
import ArrowLeft from '@material-ui/icons/ArrowLeftRounded'
import Listing from './listing'

const styles = {
  listItem: {
    width: '92%',
    maxWidth: '40rem',
    margin: '0 auto'
  },
  container: {
    textAlign: 'center'
  }
}

const ListingsTitle = withStyles({
  root: {
    margin: '0 auto',
    width: '92%',
    textAlign: 'center',
    marginTop: '1rem'
  }
})(Typography)

const NextButton = withStyles({
  root: {
    float: 'right',
    marginBottom: '2rem',
    marginRight: '8%',
    display: 'inline-block'
  }
})(Button)

const PrevButton = withStyles({
  root: {
    float: 'left',
    marginBottom: '2rem',
    marginLeft: '8%',
    display: 'inline-block'
  }
})(Button)

const CurrentPage = withStyles({
  root: {
    position: 'absolute',
    left: '50%',
    marginTop: '0.5rem',
    marginLeft: '-16px',
    width: 'fit-content'
  }
})(Typography)

export default class ListingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    window.scrollTo(0, 0)
    const id = event.target.closest('button').id
    if (id === 'prev' && this.state.page > 0) {
      this.setState({
        page: this.state.page - 1
      })
    }
    else if (id === 'next' && this.state.page < this.props.listings.length) {
      this.setState({
        page: this.state.page + 1
      })
    }
  }
  render() {
    if (this.props.listings.length < 1) {
      return (<ListingsTitle
        variant="title"
        component="h2"
        color="inherit"
      >
        {`No Results Found for ${this.props.car.make} ${this.props.car.model}`}
      </ListingsTitle>)
    }
    return (
      <React.Fragment>
        <ListingsTitle
          variant="title"
          component="h2"
          color="inherit"
        >
          {
            `Showing Listings For ${this.props.car.make} ${this.props.car.model}`
          }
        </ListingsTitle>
        <List>
          {this.props.listings[this.state.page].map(listing => {
            return (
              <div key={listing.pid} style={styles.listItem}>
                <ListItem>
                  <Listing
                    listing={listing}
                    pullDetails={this.props.pullDetails}
                  />
                </ListItem>
              </div>
            )
          })}
        </List>
        <div style={styles.container}>
          {this.state.page > 0 &&
          <PrevButton
            id="prev"
            onClick={this.handleClick}
            variant="contained"
            color="primary"
          >
            <ArrowLeft/>
          </PrevButton>}
          {this.state.page + 1 < this.props.listings.length &&
          <NextButton
            id="next"
            onClick={this.handleClick}
            variant="contained"
            color="primary"
          >
            <ArrowRight/>
          </NextButton>}
        </div>
        <CurrentPage
          variant="body1"
          component="h6"
          color="inherit"
        >
          {this.state.page + 1}
        </CurrentPage>
      </React.Fragment>
    )
  }
}
