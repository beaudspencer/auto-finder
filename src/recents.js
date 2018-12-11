import React from 'react'
import {
  Typography,
  withStyles,
  IconButton
} from '@material-ui/core'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import RecentCard from './recent-card'

const styles = {
  buttons: {
    width: '92%',
    maxWidth: '435px',
    margin: '1rem auto',
    textAlign: 'center'
  },
  recents: {
    textAlign: 'center',
    position: 'relative',
    maxWidth: '435px',
    margin: '0 auto'
  }
}

const NoRecents = withStyles({
  root: {
    width: 'fit-content',
    margin: '0 auto'
  }
})(Typography)

const Header = withStyles({
  root: {
    marginBottom: '1.5rem',
    textAlign: 'center'
  }
})(Typography)

const NexButton = withStyles({
  root: {
    position: 'absolute',
    bottom: '50%',
    right: '1%'
  }
})(IconButton)

const PrevButton = withStyles({
  root: {
    position: 'absolute',
    bottom: '50%',
    left: '1%'
  }
})(IconButton)

export default class Recents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    const id = event.target.closest('[id]').id
    if (id === 'next' && this.state.current < this.props.recents.length - 1) {
      this.setState({
        current: this.state.current + 1
      })
    }
    else if (id === 'prev' && this.state.current > 0 && this.state.props.length > 1) {
      this.setState({
        current: this.state.current - 1
      })
    }
  }
  render() {
    const { recents } = this.props
    const { current } = this.state
    if (!this.props.recents || this.props.recents.length < 1) {
      return (
        <NoRecents
          component="h4"
          variant="h6"
        >
        No Recent Searches
        </NoRecents>
      )
    }
    return (
      <div>
        <Header
          component="h4"
          variant="h6"
        >
          Recent Searches:
        </Header>
        <div
          style={styles.recents}
        >
          <PrevButton
            onClick={this.handleClick}
            id="prev"
          >
            <ArrowBack/>
          </PrevButton>
          <RecentCard
            search={this.props.search}
            car={recents[current]}
          />
          <NexButton
            onClick={this.handleClick}
            id="next"
          >
            <ArrowForward/>
          </NexButton>
        </div>
        <div
          style={styles.buttons}
        >
          {
            this.props.recents.map((car, index) => {
              if (index === this.state.current) {
                return (
                  <div
                    key={index}
                  >
                    <RadioButtonChecked/>
                  </div>
                )
              }
              return (
                <div
                  key={index}
                >
                  <RadioButtonUnchecked/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
