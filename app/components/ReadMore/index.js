import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import IconButton from 'material-ui/IconButton'

class ReadMore extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      expanded: false,
      truncated: false
    }
    this.handleTruncate = this.handleTruncate.bind(this)
    this.toggleLines = this.toggleLines.bind(this)
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated
      })
    }
  }

  toggleLines(event) {
    event.preventDefault()
    event.stopPropagation() 
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const { children, more, less, lines } = this.props

    const { expanded, truncated } = this.state

    return (
      <div style={{fontSize: '1rem'}}>
        <Truncate
          lines={!expanded && lines}
          ellipsis={
            <span>
              ...{' '}
              <IconButton>
                <Visibility onClick={this.toggleLines} color={'green'}/>
                </IconButton>
            </span>
          }
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated &&
        expanded && (
          <span>
            {' '}
            <IconButton>
              <VisibilityOff onClick={this.toggleLines} color={'green'}/>
            </IconButton>
          </span>
        )}
      </div>
    )
  }
}

ReadMore.defaultProps = {
  lines: 3,
  more: 'Read more',
  less: 'Show less'
}

ReadMore.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.node,
  lines: PropTypes.number
}

export default ReadMore
