import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles,
  ButtonBase,
  CircularProgress
} from '@material-ui/core'

const RecentsCard = withStyles({
  root: {
    position: 'relative',
    display: 'inline-block',
    margin: '0 auto',
    width: '50%',
    maxWidth: '300px'
  }
})(Card)

const Instr = withStyles({
  root: {
    position: 'relative',
    bottom: '0.75rem'
  }
})(Typography)

const SearchLoading = withStyles({
  root: {
    position: 'absolute',
    left: '5rem',
    top: '3rem',
    zIndex: '2'
  }
})(CircularProgress)

export default class RecentCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.search = this.search.bind(this)
  }
  search() {
    const { search, car } = this.props
    search(car)
    this.setState({
      loading: true
    })
  }
  render() {
    const { car } = this.props
    return (
      <RecentsCard>
        {
          this.state.loading && <SearchLoading
            color="secondary"
          />
        }
        <ButtonBase
          onClick={this.search}
          focusRipple
        >
          <CardMedia
            component="img"
            image={car.imageURL}
            title={car.model}
          />
        </ButtonBase>
        <CardContent>
          <Instr
            variant="caption"
            component="p"
          >
            (Click Image To Search)
          </Instr>
          <Typography
            component="h6"
            variant="h6"
          >
            {
              car.make
            }
            <br/>
            {
              car.model
            }
          </Typography>
        </CardContent>
      </RecentsCard>
    )
  }
}
