/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { CirclePicker } from 'react-color'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import P from 'components/P'
import { THIN, MEDIUM, THICK } from './constants'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'


const white = '#ffffff'
const grey = '#9e9e9e'
const black = '#000000'

const blueGrey = '#607d8b'

const yellow = '#ffeb3b'
const amber = '#ffc107'
const orange = '#ff9800'

const deepOrange = '#ff5722'
const red = '#f44336'
const pink = '#e91e63'

const brown = '#795548'

const lime = '#cddc39'
const lightGreen = '#8bc34a'
const green = '#4caf50'

const teal = '#009688'

const lightBlue = '#03a9f4'
const blue = '#2196f3'
const purple = '#9c27b0'
const deepPurple = '#673ab7'
const cyan = '#00bcd4'


const colors = [white, yellow, lime, amber, lightBlue, grey, blueGrey, black, orange, deepOrange, red, pink, brown, lightGreen, green, cyan, teal, blue, purple, deepPurple]


class FrameOptions extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onChooseColor: PropTypes.func.isRequired,
    onChooseWidth: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
  }

  // bgColor means isInputChecked
  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  handleFrameWidthChange = (event, index, frameWidth) =>
    this.props.onChooseWidth(frameWidth)

  handleColorChange = ({ hex }) => this.props.onChooseColor(hex)

  render() {
    const { intl, color, active, showOptions, width } = this.props
    const { formatMessage } = intl
    const marginBottom = showOptions ? '300px' : 'auto'
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.frame)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <div style={styles.optionBox}>
            <P>{formatMessage(messages.chooseColor)}</P>
            <CirclePicker
              color={color}
              colors={colors}
              onChangeComplete={this.handleColorChange}
              width={300}
            />
            <P marginBottom='0px' >{formatMessage(messages.frameWidth)}</P>
            <SelectField
              value={width}
              onChange={this.handleFrameWidthChange}
            >
              <MenuItem value={null} primaryText='' />
              <MenuItem
                value={THIN}
                primaryText={formatMessage(messages.thin)}
              />
              <MenuItem
                value={MEDIUM}
                primaryText={formatMessage(messages.medium)}
              />
              <MenuItem
                value={THICK}
                primaryText={formatMessage(messages.thick)}
              />
            </SelectField>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectIntl(FrameOptions)
