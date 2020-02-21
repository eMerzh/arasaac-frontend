import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import messages from './messages'

/* eslint-disable jsx-a11y/anchor-has-content */

const UserMenu = ({ isTranslating, changeLocale, muiTheme, signout, role }) => (
  <span id='userMenu'>
    <IconMenu
      iconButtonElement={
        <IconButton>
          <MoreVertIcon color={muiTheme.appBar.textColor} />
        </IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem
        primaryText={<FormattedMessage {...messages.userProfile} />}
        containerElement={<Link to='/profile' />}
      />
      {/* <MenuItem
        primaryText={<FormattedMessage {...messages.userMaterial} />}
        containerElement={<Link to='/usermaterial' />}
      /> */}
      {(role === 'admin' || role === 'translator') && (
        !isTranslating ? (
          <MenuItem
            primaryText={<FormattedMessage {...messages.translateArasaac} />}
            onClick={changeLocale}
          />
        ) : (
            <MenuItem
              primaryText={<FormattedMessage {...messages.stopTranslateArasaac} />}
              onClick={changeLocale}
            />
          )
      )
      }
      <MenuItem
        primaryText={<FormattedMessage {...messages.signout} />}
        onClick={signout}
      />
    </IconMenu>
  </span>
)

UserMenu.propTypes = {
  isTranslating: PropTypes.bool.isRequired,
  changeLocale: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  role: PropTypes.string
}

export default muiThemeable()(UserMenu)
