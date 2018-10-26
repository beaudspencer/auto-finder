import React from 'react'
import {List, ListItem} from '@material-ui/core'
import Listing from './listing'

const styles = {
  listItem: {
    width: '92%',
    maxWidth: '40rem',
    margin: '0 auto'
  }
}

export default function ListingList(props) {
  return (
    <List>
      {props.listings.map(listing => {
        return (
          <div key={listing.pid} style={styles.listItem}>
            <ListItem>
              <Listing listing={listing}/>
            </ListItem>
          </div>
        )
      })}
    </List>
  )
}
