import React from 'react'
import Uploader from './uploader'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const requestData = new FormData(event.target.closest('form'))
    fetch('/', {
      method: 'POST',
      body: requestData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }
  render() {
    return (
      <Uploader handleSubmit={this.handleSubmit}/>
    )
  }
}
