import React from 'react'
import {
  Typography,
  withStyles
} from '@material-ui/core'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import RecentCard from './recent-card'

const styles = {
  buttons: {
    width: '92%',
    maxWidth: '435px',
    margin: '1rem auto',
    textAlign: 'center'
  }
}

const NoRecents = withStyles({
  root: {
    width: 'fit-content',
    margin: '0 auto'
  }
})(Typography)

export default class Recents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
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
        <div>
          <RecentCard
            car={recents[current]}
          />
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
