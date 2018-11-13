import React from 'react'
import {
  List,
  ListItem,
  Typography,
  withStyles
} from '@material-ui/core'
import CarCard from './car-card'

const Header = withStyles({
  root: {
    margin: '1rem auto',
    width: 'fit-content'
  }
})(Typography)

export default class CarList extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
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
                  />
                </ListItem>
              )
            })
          }
        </List>
      </React.Fragment>
    )
  }
}
