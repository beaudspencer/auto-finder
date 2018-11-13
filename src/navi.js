import React from 'react'
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import hash from './hash'

const styles = {
  drawer: {
    width: '12rem'
  }
}

export default class Navi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  toggleDrawer() {
    this.setState({
      open: !this.state.open
    })
  }
  handleClick(event) {
    const id = event.target.closest('[id]').id
    if (id === 'favlistings' || id === 'favecars') {
      location.hash = hash.stringify({
        path: id,
        params: {
          page: 0
        }
      })
    }
    else if (this.props.lastSearch.make && id === 'listings') {
      location.hash = hash.stringify({
        path: id,
        params: {
          page: 0,
          make: this.props.lastSearch.make,
          model: this.props.lastSearch.model
        }
      })
    }
    else if (id === 'listings') {
      location.hash = hash.stringify({
        path: id,
        params: {
          page: 0
        }
      })
    }
    else {
      location.hash = id
    }
  }
  render() {
    return (
      <AppBar
        color="primary"
        position="sticky"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={this.toggleDrawer}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="h6"
            color="inherit"
          >
            Auto-Finder
          </Typography>
          <Drawer
            open={this.state.open}
            onClose={this.toggleDrawer}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <List style={styles.drawer}>
                <ListItem
                  button
                  onClick={this.handleClick}
                  id="uploader"
                >
                  <ListItemText>
                    Uploader
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  onClick={this.handleClick}
                  id="directsearch"
                >
                  <ListItemText>
                    Direct Search
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  onClick={this.handleClick}
                  id="car"
                >
                  <ListItemText>
                    Car
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  onClick={this.handleClick}
                  id="favecars"
                >
                  <ListItemText>
                    Favorite Cars
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  onClick={this.handleClick}
                  id="listings"
                >
                  <ListItemText>
                    Listings
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  onClick={this.handleClick}
                  id="favlistings"
                >
                  <ListItemText>
                    Favorite Listings
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    )
  }
}
