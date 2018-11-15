import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Filter from '@material-ui/icons/FilterList'

const styles = {
  root: {
    width: '92%',
    maxWidth: '38rem',
    margin: '0 auto'
  }
}

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
    this.props.filterBy(event.target.id)
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
          <Filter />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem id="none" onClick={this.handleClose}>None</MenuItem>
          <MenuItem id="pic" onClick={this.handleClose}>Has Picture</MenuItem>
        </Menu>
      </div>
    )
  }
}
