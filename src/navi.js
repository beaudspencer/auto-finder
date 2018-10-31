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
  }
  toggleDrawer() {
    this.setState({
      open: !this.state.open
    })
  }
  handleClick(event) {
    const id = event.target.closest('[id]').id
    location.hash = id
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
                  id="car"
                >
                  <ListItemText>
                    Car
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
              </List>
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    )
  }
}
