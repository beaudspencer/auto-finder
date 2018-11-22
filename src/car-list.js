import React from 'react'
import {
  List,
  ListItem,
  Typography,
  withStyles,
  Button
} from '@material-ui/core'
import {ArrowBack, ArrowForward} from '@material-ui/icons'
import hash from './hash'
import CarCard from './car-card'

const styles = {
  container: {
    textAlign: 'center'
  }
}

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
    marginBottom: '1rem',
    marginLeft: '-16px',
    width: 'fit-content'
  }
})(Typography)

const Header = withStyles({
  root: {
    margin: '1rem auto',
    width: 'fit-content'
  }
})(Typography)

export default class CarList extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    window.scrollTo(0, 0)
    const id = event.target.closest('button').id
    if (id === 'prev' && this.props.page > 0) {
      location.hash = hash.stringify({
        path: hash.parse(location.hash).path,
        params: {
          page: this.props.page - 1
        }
      })
    }
    else if (id === 'next' && this.props.page < this.props.listings.length) {
      location.hash = hash.stringify({
        path: hash.parse(location.hash).path,
        params: {
          page: this.props.page + 1
        }
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        <Header
          variant="h5"
          component="h2"
        >
          Favorite Cars
        </Header>
        <List>
          {
            this.props.cars[this.props.page].map(car => {
              return (
                <ListItem
                  key={car.make.concat(car.model, car.model_year)}
                >
                  <CarCard
                    search={this.props.pullListings}
                    car={car}
                    unfavorite={this.props.unfavorite}
                  />
                </ListItem>
              )
            })
          }
        </List>
        <div style={styles.container}>
          {this.props.page > 0 &&
              <PrevButton
                id="prev"
                onClick={this.handleClick}
              >
                <ArrowBack/>
              </PrevButton>}
          {this.props.page + 1 < this.props.cars.length &&
              <NextButton
                id="next"
                onClick={this.handleClick}
              >
                <ArrowForward/>
              </NextButton>}
          <CurrentPage
            variant="body1"
            component="h6"
            color="inherit"
          >
            {this.props.page + 1}
          </CurrentPage>
        </div>
      </React.Fragment>
    )
  }
}
