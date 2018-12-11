import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import HamburgerMenu from '@material-ui/icons/Menu'

const styles = {
  root: {
    width: '92%',
    maxWidth: '38rem',
    margin: '0 auto'
  }
}

export default class CamerasMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose(event) {
    this.setState({ anchorEl: null })
    this.props.changeCam(event.target.id)
  }
  render() {
    const { anchorEl } = this.state

    return (
      <div style={styles.root}>
        <Button
          aria-owns={anchorEl ? 'FilterBy' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <HamburgerMenu/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
            this.props.cameras.map(option => {
              return (
                <MenuItem
                  key={option}
                  id={option}
                >
                  {option}
                </MenuItem>
              )
            })
          }
        </Menu>
      </div>
    )
  }
}
