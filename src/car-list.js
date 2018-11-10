import React from 'react'
import {
  List,
  ListItem
} from '@material-ui/core'
import CarCard from './car-card'

export default class CarList extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch() {
  }
  render() {
    return (
      <List>
        {
          this.props.cars[this.props.page].map(car => {
            return (
              <ListItem
                key={car.make.concat(car.model, car.model_year)}
              >
                <CarCard
                  car={car}
                />
              </ListItem>
            )
          })
        }
      </List>
    )
  }
}
