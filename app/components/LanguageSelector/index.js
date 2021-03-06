/**
 *
 * LanguageSelector
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import languages from 'data/languages'
import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'

const LanguageSelector = ({
  onChange,
  intl,
  value,
  shortOption,
  showToolTip,
  labelColor,
  muiTheme
}) => {
  const { formatMessage } = intl
  const handleChange = (event, index, value) => {
    onChange(value)
  }
  const isRtl = muiTheme.direction === 'rtl'

  return (
    // maxWidth so fixed good in mobile
    <SelectField
      style={isRtl ? { textAlign: 'right', width: '370px', maxWidth: '95%' } : { textAlign: 'left', width: '370px', maxWidth: '95%' }}
      maxHeight={400}
      value={value}
      labelStyle={labelColor ? { color: labelColor } : {}}
      onChange={handleChange}
      iconStyle={isRtl ? { right: '', left: 0 } : {}}
      floatingLabelText={showToolTip && 'Choose your language'}
    >
      {languages.map((language) =>
        shortOption ? (
          <MenuItem
            key={language.code}
            value={language.code}
            primaryText={formatMessage(messages[language.code])}
          />
        ) : (
            <MenuItem
              key={language.code}
              value={language.code}
              primaryText={`${language.text} - ${formatMessage(
                messages[language.code]
              )}`}
            />
          )
      )}
    </SelectField>
  )
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  shortOption: PropTypes.bool,
  showToolTip: PropTypes.bool,
  labelColor: PropTypes.string,
  muiTheme: PropTypes.object.isRequired,
}

export default injectIntl(muiThemeable()(LanguageSelector))
