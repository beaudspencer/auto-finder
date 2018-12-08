import React from 'react'
import Uploader from './uploader'
import Recents from './recents'

export default class UploadContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setLoad = this.setLoad.bind(this)
  }
  setLoad() {
    this.setState({
      loading: true
    })
  }
  handleSubmit(data) {
    this.props.handleSubmit(data)
  }
  render() {
    return (
      <React.Fragment>
        <Uploader
          setLoad={this.setLoad}
          handleSubmit={this.handleSubmit}
        />
        {
          !this.state.loading && <Recents
            recents={this.props.recents}
          />
        }
      </React.Fragment>
    )
  }
}
