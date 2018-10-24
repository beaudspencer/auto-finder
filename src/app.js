import React from 'react'
import Uploader from './uploader'
import Load from './load'
import CarCard from './car-card'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'uploader',
      car: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(requestData) {
    this.setState({page: 'load'})
    fetch('/', {
      method: 'POST',
      body: requestData
    })
      .then(res => res.json())
      .then(data => {
        const car = {
          info: data[0][0],
          link: data[1]
        }
        this.setState({
          page: 'car',
          car: car
        })
      })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.page === 'uploader' &&
        <Uploader handleSubmit={this.handleSubmit}/>
        }
        {this.state.page === 'load' &&
        <Load/>
        }
        {this.state.page === 'car' &&
        <CarCard car={this.state.car}/>
        }
      </React.Fragment>
    )
  }
}
