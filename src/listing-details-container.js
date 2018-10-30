import React from 'react'
import hash from './hash'
import ListingDetails from './listing-details'
import Load from './load'

export default class ListingDetailsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'load',
      listing: null
    }
    this.url = hash.parse(location.hash).params.url
    this.getListingDetails = this.getListingDetails.bind(this)
  }
  getListingDetails() {
    fetch(`/details?url=${this.url}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(details => {
        Object.assign(details, {price: this.props.price})
        this.props.setListing(details)
        this.setState({
          listing: details,
          view: 'listing'
        })
      })
  }
  componentDidMount() {
    this.getListingDetails()
  }
  render() {
    return (
      <React.Fragment>
        {this.state.view === 'load' && <Load/>}
        {this.state.view === 'listing' && <ListingDetails details={this.state.listing}/>}
      </React.Fragment>
    )
  }
}
