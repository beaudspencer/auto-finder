import React from 'react'
import {
  Typography,
  withStyles
} from '@material-ui/core'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import RadioButtonunChecked from '@material-ui/icons/RadioButtonUnchecked'

const styles = {
  progress: {
    display: 'inline-block',
    width: 'calc(100% / 3)'
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
    if (!this.props.recents || this.props.recents.length) {
      return (
        <NoRecents
          variant="h4"
        >
        No Recent Searches
        </NoRecents>
      )
    }
    return (
      <div>
        <div>
        </div>
        <div>
          {
            this.props.recents.map((car, index) => {
              if (index === this.state.current) {
                return (
                  <div
                    key={index}
                    style={styles.progress}
                  >
                    <RadioButtonChecked/>
                  </div>
                )
              }
              return (
                <div
                  key={index}
                  style={styles.progress}
                >
                  <RadioButtonunChecked/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
