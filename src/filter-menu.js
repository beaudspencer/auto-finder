import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default class FilterMenu extends React.Component {
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
    this.filterBy(event.target.id)
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'FilterBy' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem id="pic" onClick={this.handleClose}>Has Picture</MenuItem>
        </Menu>
      </div>
    )
  }
}
