import React from 'react'
import Uploader from './uploader'
import Load from './load'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'load'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    this.setState({page: 'load'})
    event.preventDefault()
    const requestData = new FormData(event.target.closest('form'))
    fetch('/', {
      method: 'POST',
      body: requestData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          page: 'uploader'
        })
        console.log(data)
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
      </React.Fragment>
    )
  }
}
