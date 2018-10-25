import React from 'react'
import {List, ListItem} from '@material-ui/core'
import Listing from './listing'

export default function ListingList(props) {
  return (
    <List>
      {props.listings.map(listing => {
        return (
          <ListItem key={listing.pid}>
            <Listing listing={listing}/>
          </ListItem>
        )
      })}
    </List>
  )
}
