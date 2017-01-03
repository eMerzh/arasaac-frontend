import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import Div from 'components/Div'
import messages from './messages'

const styles = {
  text: {
    textAlign: 'left',
    marginLeft: 5
  },
  signupButton: {
    width: '100%'
  },
  signin: {
    position: 'absolute',
    right: 0,
    bottom: 10
  }
}

const RegisterOptions = ({ onClick }) => (
  <div>
    <Div>
      <Link to='/register'>
        <RaisedButton
          style={styles.signupButton}
          onClick={onClick}
          label={<FormattedMessage {...messages.signup} />}
          primary={true}
          icon={<EmailIcon />}
        />
      </Link>
    </Div>
    <Div>
      <p>Registrándote, estás de acuerdo los términos y condiciones del servicio y la política de privacidad.</p>
    </Div>
    <Div>
      <p style={styles.text}>
        {<FormattedMessage {...messages.offerSignin} />}
      </p>
      <Link to='/signin'>
        <RaisedButton
          style={styles.signin}
          label={<FormattedMessage {...messages.signin} />}
          secondary={true}
        />
      </Link>
    </Div>

  </div>
)

RegisterOptions.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default RegisterOptions
